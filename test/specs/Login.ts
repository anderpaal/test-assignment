import loginPage from "../pageobjects/login.page";
import LoginPage from "../pageobjects/login.page";

const loginName: string = 'meesmetsast087@gmail.com';
const password: string = 'SuperSecretPassword!';

describe('Should get wrong password error', () => {

    before('should open login page', async () => {
        await LoginPage.open('index.php?controller=authentication');
    });

    it('should get an error for entering wrong password', async () => {
        await LoginPage.login(loginName, password + '!');
        await expect(await LoginPage.getErrorBodyText('Authentication failed. Fail on purpose')).toBe(true);//Fails on purpose, change expected text = 'Authentication failed.'
    })
})

describe('Should successfully log in & log out', () => {
    it('should successfully log in with valid credentials', async () => {
        await LoginPage.login(loginName, password);
        await expect(await LoginPage.getLoginNameText('Test Klient')).toBe(true);     
    });

    it('should successfully log out', async () => {
        await loginPage.signOutHeader();
        await expect(await LoginPage.signInHeader()).toBe(true);
    });
})
