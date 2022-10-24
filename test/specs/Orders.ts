import HomePage from '../pageobjects/home.page';
import LoginPage from  '../pageobjects/login.page';
import OrderHistoryPage from '../pageobjects/orderHistory.page';
import shoppingCartPage from '../pageobjects/shoppingCart.page';
import ShoppingCartPage from '../pageobjects/shoppingCart.page';

let orderReference = "0";

describe('Should successfully complete order while logged in', () => {
    before('should login with valid credentials', async () => {
        await LoginPage.open('index.php?controller=authentication');
        await LoginPage.login('meesmetsast087@gmail.com', 'SuperSecretPassword!');
    });

    it('should add a product to cart', async () => {
        await HomePage.proceedToChekout('index.php?id_product=7&controller=product');
    });

    it('should confirm cart order', async () => {
        await ShoppingCartPage.confirmCartOrder();
    });

    it('should confirm order confirmation text', async () => {
        await expect(await ShoppingCartPage.getOrderConfirmationText('Your order on My Store is complete.')).toBe(true);
    });
})

describe('Should confirm error message after not accepting Terms of service', () => {
    it('should add a product to cart', async () => {
        await HomePage.proceedToChekout('index.php?id_product=7&controller=product');
    });

    it('should confirm cart order', async () => {
        await ShoppingCartPage.confirmCartOrderWithoutTermsOfSerive();
    });

    it('should confirm Terms of service error text', async () => {
        await expect(await ShoppingCartPage.termsOfServiceError('You must agree to the terms of service before continuing.')).toBe(true);
    });
})

describe('Should check for order reference in "Order history" after successful order', () => {

    it('should add a product to cart', async () => {
        await HomePage.proceedToChekout('index.php?id_product=7&controller=product');
    });

    it('should confirm cart order', async () => {
        await ShoppingCartPage.confirmCartOrder();
    });

    it('should confirm order confirmation text', async () => {
        orderReference = await shoppingCartPage.getOrderReference();
        await expect(await ShoppingCartPage.getOrderConfirmationText('Your order on My Store is complete.')).toBe(true);
    });

    it('should confirm order is present in order history', async () => {
        await shoppingCartPage.open('index.php?controller=history');
        await expect(await OrderHistoryPage.checkOrderHistoryByRef(orderReference)).toBe(true);
    });
})
