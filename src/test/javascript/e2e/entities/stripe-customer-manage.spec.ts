import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StripeCustomer e2e test', () => {

    let navBarPage: NavBarPage;
    let stripeCustomerDialogPage: StripeCustomerDialogPage;
    let stripeCustomerComponentsPage: StripeCustomerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StripeCustomers', () => {
        navBarPage.goToEntity('stripe-customer-manage');
        stripeCustomerComponentsPage = new StripeCustomerComponentsPage();
        expect(stripeCustomerComponentsPage.getTitle())
            .toMatch(/eLearningApp.stripeCustomer.home.title/);

    });

    it('should load create StripeCustomer dialog', () => {
        stripeCustomerComponentsPage.clickOnCreateButton();
        stripeCustomerDialogPage = new StripeCustomerDialogPage();
        expect(stripeCustomerDialogPage.getModalTitle())
            .toMatch(/eLearningApp.stripeCustomer.home.createOrEditLabel/);
        stripeCustomerDialogPage.close();
    });

    it('should create and save StripeCustomers', () => {
        stripeCustomerComponentsPage.clickOnCreateButton();
        stripeCustomerDialogPage.setNameInput('name');
        expect(stripeCustomerDialogPage.getNameInput()).toMatch('name');
        stripeCustomerDialogPage.setCreatedInput(12310020012301);
        expect(stripeCustomerDialogPage.getCreatedInput()).toMatch('2001-12-31T02:30');
        stripeCustomerDialogPage.setEmailInput('email');
        expect(stripeCustomerDialogPage.getEmailInput()).toMatch('email');
        stripeCustomerDialogPage.setCurrencyInput('currency');
        expect(stripeCustomerDialogPage.getCurrencyInput()).toMatch('currency');
        stripeCustomerDialogPage.setStripeCustomerIdInput('stripeCustomerId');
        expect(stripeCustomerDialogPage.getStripeCustomerIdInput()).toMatch('stripeCustomerId');
        stripeCustomerDialogPage.setStripeSubscriptionIdInput('stripeSubscriptionId');
        expect(stripeCustomerDialogPage.getStripeSubscriptionIdInput()).toMatch('stripeSubscriptionId');
        stripeCustomerDialogPage.setStripeStatusInput('stripeStatus');
        expect(stripeCustomerDialogPage.getStripeStatusInput()).toMatch('stripeStatus');
        stripeCustomerDialogPage.setPlanInput('plan');
        expect(stripeCustomerDialogPage.getPlanInput()).toMatch('plan');
        stripeCustomerDialogPage.setCcBrandInput('ccBrand');
        expect(stripeCustomerDialogPage.getCcBrandInput()).toMatch('ccBrand');
        stripeCustomerDialogPage.setCcLast4Input('5');
        expect(stripeCustomerDialogPage.getCcLast4Input()).toMatch('5');
        stripeCustomerDialogPage.setExpMonthInput('expMonth');
        expect(stripeCustomerDialogPage.getExpMonthInput()).toMatch('expMonth');
        stripeCustomerDialogPage.setExpYearInput('expYear');
        expect(stripeCustomerDialogPage.getExpYearInput()).toMatch('expYear');
        stripeCustomerDialogPage.getIsCancelledInput().isSelected().then((selected) => {
            if (selected) {
                stripeCustomerDialogPage.getIsCancelledInput().click();
                expect(stripeCustomerDialogPage.getIsCancelledInput().isSelected()).toBeFalsy();
            } else {
                stripeCustomerDialogPage.getIsCancelledInput().click();
                expect(stripeCustomerDialogPage.getIsCancelledInput().isSelected()).toBeTruthy();
            }
        });
        stripeCustomerDialogPage.setCardIdInput('cardId');
        expect(stripeCustomerDialogPage.getCardIdInput()).toMatch('cardId');
        stripeCustomerDialogPage.setExpectedExpiryDateInput('2000-12-31');
        expect(stripeCustomerDialogPage.getExpectedExpiryDateInput()).toMatch('2000-12-31');
        stripeCustomerDialogPage.userSelectLastOption();
        stripeCustomerDialogPage.save();
        expect(stripeCustomerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StripeCustomerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stripe-customer-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StripeCustomerDialogPage {
    modalTitle = element(by.css('h4#myStripeCustomerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    createdInput = element(by.css('input#field_created'));
    emailInput = element(by.css('input#field_email'));
    currencyInput = element(by.css('input#field_currency'));
    stripeCustomerIdInput = element(by.css('input#field_stripeCustomerId'));
    stripeSubscriptionIdInput = element(by.css('input#field_stripeSubscriptionId'));
    stripeStatusInput = element(by.css('input#field_stripeStatus'));
    planInput = element(by.css('input#field_plan'));
    ccBrandInput = element(by.css('input#field_ccBrand'));
    ccLast4Input = element(by.css('input#field_ccLast4'));
    expMonthInput = element(by.css('input#field_expMonth'));
    expYearInput = element(by.css('input#field_expYear'));
    isCancelledInput = element(by.css('input#field_isCancelled'));
    cardIdInput = element(by.css('input#field_cardId'));
    expectedExpiryDateInput = element(by.css('input#field_expectedExpiryDate'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setCreatedInput = function(created) {
        this.createdInput.sendKeys(created);
    }

    getCreatedInput = function() {
        return this.createdInput.getAttribute('value');
    }

    setEmailInput = function(email) {
        this.emailInput.sendKeys(email);
    }

    getEmailInput = function() {
        return this.emailInput.getAttribute('value');
    }

    setCurrencyInput = function(currency) {
        this.currencyInput.sendKeys(currency);
    }

    getCurrencyInput = function() {
        return this.currencyInput.getAttribute('value');
    }

    setStripeCustomerIdInput = function(stripeCustomerId) {
        this.stripeCustomerIdInput.sendKeys(stripeCustomerId);
    }

    getStripeCustomerIdInput = function() {
        return this.stripeCustomerIdInput.getAttribute('value');
    }

    setStripeSubscriptionIdInput = function(stripeSubscriptionId) {
        this.stripeSubscriptionIdInput.sendKeys(stripeSubscriptionId);
    }

    getStripeSubscriptionIdInput = function() {
        return this.stripeSubscriptionIdInput.getAttribute('value');
    }

    setStripeStatusInput = function(stripeStatus) {
        this.stripeStatusInput.sendKeys(stripeStatus);
    }

    getStripeStatusInput = function() {
        return this.stripeStatusInput.getAttribute('value');
    }

    setPlanInput = function(plan) {
        this.planInput.sendKeys(plan);
    }

    getPlanInput = function() {
        return this.planInput.getAttribute('value');
    }

    setCcBrandInput = function(ccBrand) {
        this.ccBrandInput.sendKeys(ccBrand);
    }

    getCcBrandInput = function() {
        return this.ccBrandInput.getAttribute('value');
    }

    setCcLast4Input = function(ccLast4) {
        this.ccLast4Input.sendKeys(ccLast4);
    }

    getCcLast4Input = function() {
        return this.ccLast4Input.getAttribute('value');
    }

    setExpMonthInput = function(expMonth) {
        this.expMonthInput.sendKeys(expMonth);
    }

    getExpMonthInput = function() {
        return this.expMonthInput.getAttribute('value');
    }

    setExpYearInput = function(expYear) {
        this.expYearInput.sendKeys(expYear);
    }

    getExpYearInput = function() {
        return this.expYearInput.getAttribute('value');
    }

    getIsCancelledInput = function() {
        return this.isCancelledInput;
    }
    setCardIdInput = function(cardId) {
        this.cardIdInput.sendKeys(cardId);
    }

    getCardIdInput = function() {
        return this.cardIdInput.getAttribute('value');
    }

    setExpectedExpiryDateInput = function(expectedExpiryDate) {
        this.expectedExpiryDateInput.sendKeys(expectedExpiryDate);
    }

    getExpectedExpiryDateInput = function() {
        return this.expectedExpiryDateInput.getAttribute('value');
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
