const { Builder, By, until } = require('selenium-webdriver');
const { describe, it, after, before } = require('mocha');
require('chromedriver');

let driver;

describe('Selenium Web Form Tests', function () {
    this.timeout(30000);

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    });

    after(async () => {
        await driver.quit();
    });

    it('should fill text input and password field, then verify values', async () => {
        const inputField = await driver.findElement(By.name('my-text'));
        await inputField.sendKeys('Test input');

        const passwordField = await driver.findElement(By.name('my-password'));
        await passwordField.sendKeys('SecurePassword');

        const inputValue = await inputField.getAttribute('value');
        const passwordValue = await passwordField.getAttribute('value');

        if (inputValue !== 'Test input' || passwordValue !== 'SecurePassword') {
            throw new Error('Text and password input test failed');
        }
    });

    it('should select radio and checkbox, then verify selection', async () => {
        const radioButton = await driver.findElement(By.id('my-radio-2'));
        await radioButton.click();

        const checkbox = await driver.findElement(By.id('my-check-2'));
        await checkbox.click();

        const isRadioSelected = await radioButton.isSelected();
        const isCheckboxSelected = await checkbox.isSelected();

        if (!isRadioSelected || !isCheckboxSelected) {
            throw new Error('Radio and checkbox selection test failed');
        }
    });

    it('should fill dropdown and submit form, then verify submission', async () => {
        const dropdown = await driver.findElement(By.name('my-select'));
        await dropdown.sendKeys('Two');

        const datePicker = await driver.findElement(By.name('my-date'));
        await datePicker.sendKeys('12/25/2025');

        const submitButton = await driver.findElement(By.css("button[type='submit']"));
        await submitButton.click();

        await driver.wait(until.urlContains('submitted-form.html'), 5000);
        const currentUrl = await driver.getCurrentUrl();

        if (!currentUrl.includes('submitted-form.html')) {
            throw new Error('Form submission test failed');
        }
    });
    
});