export default class Page {
    
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        return browser.url(`/${path}`);
    }

    async sleep(ms: number = 1250): Promise<void> {
        await console.info('Sleeping for ms: ' + ms);
        await browser.pause(ms);
    }

    async clickElement(element: WebdriverIO.Element, sleepTime?: number): Promise<boolean> {
        const isExisting = await element.isExisting();
        const isDisplayed = await element.waitForDisplayed();
        const elementText = await element.getText();

        if(isExisting && isDisplayed) {
            await element.click();
            if (sleepTime) await this.sleep(sleepTime);
            console.info('Clicking on text: ' + elementText)
        }

        return isExisting;
    }

    async setValueToElement(element: WebdriverIO.Element, value: string | number): Promise<boolean> {
        const isExisting: boolean = await element.isExisting();

        await console.info(`Element for setting value "${value}" exists: ${isExisting}`);
        if(isExisting) {
            await this.clickElement(element);
            console.info(`Setting value "${value}" to field with selector: "${element.selector}" `);
            await element.setValue(value);
        }
        return isExisting;
    }

    async getElementText(element: WebdriverIO.Element): Promise<string> {
        const elementText = await element.getText();
        console.info(`Element with selector ${element.selector} has text: ${elementText}`);
        return elementText;
    }
}
