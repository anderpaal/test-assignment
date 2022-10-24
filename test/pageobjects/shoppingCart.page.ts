import Page from "./page";

let orderReference = "0";

class ShoppingCartPage extends Page {

    get checkoutBtnSummary(): Promise<WebdriverIO.Element> { return $('p[class="cart_navigation clearfix"] a[title="Proceed to checkout"]'); }
    get checkoutBtnAddress(): Promise<WebdriverIO.Element> { return $('button[name="processAddress"]'); }
    get checkoutBtnShipping(): Promise<WebdriverIO.Element> { return $('button[name="processCarrier"]'); }
    get termsOfServiceBtn(): Promise<WebdriverIO.Element> { return $('#uniform-cgv'); }
    get payByBankWireBtn(): Promise<WebdriverIO.Element> { return $('a[class="bankwire"]'); }
    get confirmOrderBtn(): Promise<WebdriverIO.Element> { return $('#cart_navigation button[type="submit"]'); }
    get orderConfirmationText(): Promise<WebdriverIO.Element> { return $('p[class="cheque-indent"]'); }
    get orderInformationText(): Promise<WebdriverIO.Element> { return $('div[class="box"]'); }
    get termsOfServiceErrorBody(): Promise<WebdriverIO.Element> { return $('p[class="fancybox-error"]'); }

    async clickOnSummaryCheckoutBtn(): Promise<boolean> {
        await console.info('Looking for button "Proceed to checkout" on Summary');
        return await this.clickElement(await this.checkoutBtnSummary);
    }

    async clickOnAddressCheckoutBtn(): Promise<boolean> {
        await console.info('Looking for button "Proceed to checkout" on Address');
        return await this.clickElement(await this.checkoutBtnAddress);
    }

    async clickOnShippingCheckoutBtn(): Promise<boolean> {
        await console.info('Looking for button "Proceed to checkout" on Shipping');
        return await this.clickElement(await this.checkoutBtnShipping);
    }

    async clickOnTermsOfService(): Promise<boolean> {
        await console.info('Looking for "Terms Of Service" checkbox');
        return await this.clickElement(await this.termsOfServiceBtn);
    }

    async clickOnPayByBankWireBtn(): Promise<boolean> {
        await console.info('Looking for "Pay By bank wire" button');
        return await this.clickElement(await this.payByBankWireBtn);
    }

    async clickOnConfirmOrderBtn(): Promise<boolean> {
        await console.info('Looking for "Confirm order" button');
        return await this.clickElement(await this.confirmOrderBtn);
    }

    async getOrderConfirmationText(elementText: string): Promise<boolean> {
        await console.info('Looking for confirmation text: ' + elementText);
        const confirmationText: string = await this.getElementText(await this.orderConfirmationText);
        
        if(elementText != confirmationText) {
            await console.info(`Element with text: "${elementText}" is absent`);
            return false;
        }

        await console.info(`Element with text: "${elementText}" is present`);
        return true;
    }

    async confirmCartOrder(): Promise<boolean> {
        await this.clickOnSummaryCheckoutBtn();
        await this.clickOnAddressCheckoutBtn();
        await this.clickOnTermsOfService();
        await this.clickOnShippingCheckoutBtn();
        await this.clickOnPayByBankWireBtn();
        return await this.clickOnConfirmOrderBtn();
    }

    async confirmCartOrderWithoutTermsOfSerive(): Promise<boolean> {
        await this.clickOnSummaryCheckoutBtn();
        await this.clickOnAddressCheckoutBtn();
        return await this.clickOnShippingCheckoutBtn();
    }

    async termsOfServiceError(errorMessage: string): Promise<boolean> {
        const errorText: string = await this.getElementText(await this.termsOfServiceErrorBody)
        await console.info('Looking for error: ' + errorMessage);

        if(errorText != errorMessage) {
            await console.info(`Element with text: "${errorMessage}" is absent`);
            return false;
        }

        await console.info(`Element with text: "${errorMessage}" is present`);
        return true
    }

    async getOrderReference(): Promise<string> {
        await console.info('Getting order reference');
        return orderReference = String(await (await this.getElementText(await this.orderInformationText)).match(/[A-Z]{9}/)); 
    }
}

export default new ShoppingCartPage();
