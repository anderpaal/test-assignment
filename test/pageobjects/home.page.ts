import Page from "./page";

class HomePage extends Page {
    get tShirtsButton(): Promise<WebdriverIO.Element> { return $('a href[title="T-shirts"]'); }
    get addToCartBtn(): Promise<WebdriverIO.Element> { return $('#add_to_cart'); }
    get proceedToCheckoutBtn(): Promise<WebdriverIO.Element> { return $('div[class=button-container] a[rel="nofollow"]'); }

    async clickOnAddToCart(navigateTo: string): Promise<boolean> {
        await console.info(`Adding item on URL: ${navigateTo} to cart`);
        await super.open(navigateTo);
        return await this.clickElement(await this.addToCartBtn, 2000);
    }

    async clickOnProceedToChekout(): Promise<boolean> {
        await console.info('Waiting for button to proceed to checkout');
        return await this.clickElement(await this.proceedToCheckoutBtn, 1000);
    }

    async proceedToChekout(navigateTo: string): Promise<boolean> {
        await this.clickOnAddToCart(navigateTo);
        return await this.clickOnProceedToChekout();
    }

}

export default new HomePage();
