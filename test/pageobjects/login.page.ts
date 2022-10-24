import Page from './page';

class LoginPage extends Page {
    get eMailInputField(): Promise<WebdriverIO.Element> { return $('#email'); }
    get passwordInputField(): Promise<WebdriverIO.Element> { return $('#passwd'); }
    get signInButton(): Promise<WebdriverIO.Element> { return $('#SubmitLogin'); }
    get errorBodyText(): Promise<WebdriverIO.Element> { return $('div[class="alert alert-danger"] li'); }
    get loginNameText(): Promise<WebdriverIO.Element> { return $('a[class="account"]'); }
    get signOutField(): Promise<WebdriverIO.Element> { return $('a[class="logout"]'); }
    get signInField(): Promise<WebdriverIO.Element> { return $('a[class="login"]'); }

    async login(eMail: string, password: string): Promise<boolean> {
        await console.info('Entering e-mail $ passrowr $ logging in');
        await this.setValueToElement(await this.eMailInputField, eMail);
        await this.setValueToElement(await this.passwordInputField, password);
        return await this.clickElement(await this.signInButton, 1000);
    }

    async getErrorBodyText(errorText: string): Promise<boolean> {
        const errorTextField: string = await this.getElementText(await this.errorBodyText);

        await console.info('Looking for error body text: ' + errorText);

        if (errorText === errorTextField) {
            await console.info('Error body containts text: ' + errorText);
            return true;
        }

        await console.info('Error body does not contain text: ' + errorText);
        return false;
    }

    async getLoginNameText(loginName: string): Promise<boolean> {
        const loginNameField: string = await this.getElementText(await this.loginNameText);

        await console.info('Looking for Login name text: ' + loginName);

        if (loginName === loginNameField) {
            await console.info('Login name containts text: ' + loginName);
            return true;
        }

        await console.info('Login name does not contain text: ' + loginName);
        return false;
    }

    async signOutHeader(): Promise<boolean> {
        await console.info('Looking for Sign Out button');
        return await this.clickElement(await this.signOutField);
    }

    async signInHeader(): Promise<boolean> {
        await console.info('Looking for Sign in button');
        return await this.clickElement(await this.signInField);
    }

    public open (path: string) {
        return super.open(path);
    }
}

export default new LoginPage();
