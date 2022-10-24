import Page from './page';

class OrderHistory extends Page {
    get orderHistoryRef(): Promise<Array<WebdriverIO.Element>> { return $$('td[class="history_link bold footable-first-column"]'); }

    async checkOrderHistoryByRef(orderReference: string): Promise<boolean> {
        await console.info('Looking for orderReference: ' + orderReference);

        for(let element of await this.orderHistoryRef) {
            if(await element.isDisplayed && orderReference === await element.getText()) {
                await console.info('Order is present with ref: ' + orderReference);
                return true;
            }
        }

        await console.info(orderReference + ' is not present in order history');
        return false;
    }
}

export default new OrderHistory();