import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StripePayment e2e test', () => {

    let navBarPage: NavBarPage;
    let stripePaymentDialogPage: StripePaymentDialogPage;
    let stripePaymentComponentsPage: StripePaymentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StripePayments', () => {
        navBarPage.goToEntity('stripe-payment-manage');
        stripePaymentComponentsPage = new StripePaymentComponentsPage();
        expect(stripePaymentComponentsPage.getTitle())
            .toMatch(/eLearningApp.stripePayment.home.title/);

    });

    it('should load create StripePayment dialog', () => {
        stripePaymentComponentsPage.clickOnCreateButton();
        stripePaymentDialogPage = new StripePaymentDialogPage();
        expect(stripePaymentDialogPage.getModalTitle())
            .toMatch(/eLearningApp.stripePayment.home.createOrEditLabel/);
        stripePaymentDialogPage.close();
    });

    it('should create and save StripePayments', () => {
        stripePaymentComponentsPage.clickOnCreateButton();
        stripePaymentDialogPage.setStripeCustomerIdInput('stripeCustomerId');
        expect(stripePaymentDialogPage.getStripeCustomerIdInput()).toMatch('stripeCustomerId');
        stripePaymentDialogPage.setInvoiceIdInput('invoiceId');
        expect(stripePaymentDialogPage.getInvoiceIdInput()).toMatch('invoiceId');
        stripePaymentDialogPage.setPlanIdInput('planId');
        expect(stripePaymentDialogPage.getPlanIdInput()).toMatch('planId');
        stripePaymentDialogPage.setPlanNameInput('planName');
        expect(stripePaymentDialogPage.getPlanNameInput()).toMatch('planName');
        stripePaymentDialogPage.setChargeInput('charge');
        expect(stripePaymentDialogPage.getChargeInput()).toMatch('charge');
        stripePaymentDialogPage.setCreatedInput(12310020012301);
        expect(stripePaymentDialogPage.getCreatedInput()).toMatch('2001-12-31T02:30');
        stripePaymentDialogPage.setAmountInput('5');
        expect(stripePaymentDialogPage.getAmountInput()).toMatch('5');
        stripePaymentDialogPage.setPlanAmountInput('5');
        expect(stripePaymentDialogPage.getPlanAmountInput()).toMatch('5');
        stripePaymentDialogPage.setPlanCreatedInput(12310020012301);
        expect(stripePaymentDialogPage.getPlanCreatedInput()).toMatch('2001-12-31T02:30');
        stripePaymentDialogPage.setPlanCurrencyInput('planCurrency');
        expect(stripePaymentDialogPage.getPlanCurrencyInput()).toMatch('planCurrency');
        stripePaymentDialogPage.setPlanIntervalInput('planInterval');
        expect(stripePaymentDialogPage.getPlanIntervalInput()).toMatch('planInterval');
        stripePaymentDialogPage.setPlanIntervalCountInput('5');
        expect(stripePaymentDialogPage.getPlanIntervalCountInput()).toMatch('5');
        stripePaymentDialogPage.getLiveModeInput().isSelected().then((selected) => {
            if (selected) {
                stripePaymentDialogPage.getLiveModeInput().click();
                expect(stripePaymentDialogPage.getLiveModeInput().isSelected()).toBeFalsy();
            } else {
                stripePaymentDialogPage.getLiveModeInput().click();
                expect(stripePaymentDialogPage.getLiveModeInput().isSelected()).toBeTruthy();
            }
        });
        stripePaymentDialogPage.getPaidInput().isSelected().then((selected) => {
            if (selected) {
                stripePaymentDialogPage.getPaidInput().click();
                expect(stripePaymentDialogPage.getPaidInput().isSelected()).toBeFalsy();
            } else {
                stripePaymentDialogPage.getPaidInput().click();
                expect(stripePaymentDialogPage.getPaidInput().isSelected()).toBeTruthy();
            }
        });
        stripePaymentDialogPage.setPeriodEndInput(12310020012301);
        expect(stripePaymentDialogPage.getPeriodEndInput()).toMatch('2001-12-31T02:30');
        stripePaymentDialogPage.setPeriodStartInput(12310020012301);
        expect(stripePaymentDialogPage.getPeriodStartInput()).toMatch('2001-12-31T02:30');
        stripePaymentDialogPage.setSubscriptionValueInput('subscriptionValue');
        expect(stripePaymentDialogPage.getSubscriptionValueInput()).toMatch('subscriptionValue');
        stripePaymentDialogPage.setSubtotalInput('5');
        expect(stripePaymentDialogPage.getSubtotalInput()).toMatch('5');
        stripePaymentDialogPage.setTaxInput('tax');
        expect(stripePaymentDialogPage.getTaxInput()).toMatch('tax');
        stripePaymentDialogPage.setTaxPercentInput('taxPercent');
        expect(stripePaymentDialogPage.getTaxPercentInput()).toMatch('taxPercent');
        stripePaymentDialogPage.setTaxDisplayNameInput('taxDisplayName');
        expect(stripePaymentDialogPage.getTaxDisplayNameInput()).toMatch('taxDisplayName');
        stripePaymentDialogPage.setTotalInput('5');
        expect(stripePaymentDialogPage.getTotalInput()).toMatch('5');
        stripePaymentDialogPage.setCurrencyInput('currency');
        expect(stripePaymentDialogPage.getCurrencyInput()).toMatch('currency');
        stripePaymentDialogPage.setStripeCodeInput('stripeCode');
        expect(stripePaymentDialogPage.getStripeCodeInput()).toMatch('stripeCode');
        stripePaymentDialogPage.getIsSuccessInput().isSelected().then((selected) => {
            if (selected) {
                stripePaymentDialogPage.getIsSuccessInput().click();
                expect(stripePaymentDialogPage.getIsSuccessInput().isSelected()).toBeFalsy();
            } else {
                stripePaymentDialogPage.getIsSuccessInput().click();
                expect(stripePaymentDialogPage.getIsSuccessInput().isSelected()).toBeTruthy();
            }
        });
        stripePaymentDialogPage.setInvoiceNumberInput('invoiceNumber');
        expect(stripePaymentDialogPage.getInvoiceNumberInput()).toMatch('invoiceNumber');
        stripePaymentDialogPage.userSelectLastOption();
        stripePaymentDialogPage.save();
        expect(stripePaymentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StripePaymentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stripe-payment-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StripePaymentDialogPage {
    modalTitle = element(by.css('h4#myStripePaymentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    stripeCustomerIdInput = element(by.css('input#field_stripeCustomerId'));
    invoiceIdInput = element(by.css('input#field_invoiceId'));
    planIdInput = element(by.css('input#field_planId'));
    planNameInput = element(by.css('input#field_planName'));
    chargeInput = element(by.css('input#field_charge'));
    createdInput = element(by.css('input#field_created'));
    amountInput = element(by.css('input#field_amount'));
    planAmountInput = element(by.css('input#field_planAmount'));
    planCreatedInput = element(by.css('input#field_planCreated'));
    planCurrencyInput = element(by.css('input#field_planCurrency'));
    planIntervalInput = element(by.css('input#field_planInterval'));
    planIntervalCountInput = element(by.css('input#field_planIntervalCount'));
    liveModeInput = element(by.css('input#field_liveMode'));
    paidInput = element(by.css('input#field_paid'));
    periodEndInput = element(by.css('input#field_periodEnd'));
    periodStartInput = element(by.css('input#field_periodStart'));
    subscriptionValueInput = element(by.css('input#field_subscriptionValue'));
    subtotalInput = element(by.css('input#field_subtotal'));
    taxInput = element(by.css('input#field_tax'));
    taxPercentInput = element(by.css('input#field_taxPercent'));
    taxDisplayNameInput = element(by.css('input#field_taxDisplayName'));
    totalInput = element(by.css('input#field_total'));
    currencyInput = element(by.css('input#field_currency'));
    stripeCodeInput = element(by.css('input#field_stripeCode'));
    isSuccessInput = element(by.css('input#field_isSuccess'));
    invoiceNumberInput = element(by.css('input#field_invoiceNumber'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStripeCustomerIdInput = function(stripeCustomerId) {
        this.stripeCustomerIdInput.sendKeys(stripeCustomerId);
    }

    getStripeCustomerIdInput = function() {
        return this.stripeCustomerIdInput.getAttribute('value');
    }

    setInvoiceIdInput = function(invoiceId) {
        this.invoiceIdInput.sendKeys(invoiceId);
    }

    getInvoiceIdInput = function() {
        return this.invoiceIdInput.getAttribute('value');
    }

    setPlanIdInput = function(planId) {
        this.planIdInput.sendKeys(planId);
    }

    getPlanIdInput = function() {
        return this.planIdInput.getAttribute('value');
    }

    setPlanNameInput = function(planName) {
        this.planNameInput.sendKeys(planName);
    }

    getPlanNameInput = function() {
        return this.planNameInput.getAttribute('value');
    }

    setChargeInput = function(charge) {
        this.chargeInput.sendKeys(charge);
    }

    getChargeInput = function() {
        return this.chargeInput.getAttribute('value');
    }

    setCreatedInput = function(created) {
        this.createdInput.sendKeys(created);
    }

    getCreatedInput = function() {
        return this.createdInput.getAttribute('value');
    }

    setAmountInput = function(amount) {
        this.amountInput.sendKeys(amount);
    }

    getAmountInput = function() {
        return this.amountInput.getAttribute('value');
    }

    setPlanAmountInput = function(planAmount) {
        this.planAmountInput.sendKeys(planAmount);
    }

    getPlanAmountInput = function() {
        return this.planAmountInput.getAttribute('value');
    }

    setPlanCreatedInput = function(planCreated) {
        this.planCreatedInput.sendKeys(planCreated);
    }

    getPlanCreatedInput = function() {
        return this.planCreatedInput.getAttribute('value');
    }

    setPlanCurrencyInput = function(planCurrency) {
        this.planCurrencyInput.sendKeys(planCurrency);
    }

    getPlanCurrencyInput = function() {
        return this.planCurrencyInput.getAttribute('value');
    }

    setPlanIntervalInput = function(planInterval) {
        this.planIntervalInput.sendKeys(planInterval);
    }

    getPlanIntervalInput = function() {
        return this.planIntervalInput.getAttribute('value');
    }

    setPlanIntervalCountInput = function(planIntervalCount) {
        this.planIntervalCountInput.sendKeys(planIntervalCount);
    }

    getPlanIntervalCountInput = function() {
        return this.planIntervalCountInput.getAttribute('value');
    }

    getLiveModeInput = function() {
        return this.liveModeInput;
    }
    getPaidInput = function() {
        return this.paidInput;
    }
    setPeriodEndInput = function(periodEnd) {
        this.periodEndInput.sendKeys(periodEnd);
    }

    getPeriodEndInput = function() {
        return this.periodEndInput.getAttribute('value');
    }

    setPeriodStartInput = function(periodStart) {
        this.periodStartInput.sendKeys(periodStart);
    }

    getPeriodStartInput = function() {
        return this.periodStartInput.getAttribute('value');
    }

    setSubscriptionValueInput = function(subscriptionValue) {
        this.subscriptionValueInput.sendKeys(subscriptionValue);
    }

    getSubscriptionValueInput = function() {
        return this.subscriptionValueInput.getAttribute('value');
    }

    setSubtotalInput = function(subtotal) {
        this.subtotalInput.sendKeys(subtotal);
    }

    getSubtotalInput = function() {
        return this.subtotalInput.getAttribute('value');
    }

    setTaxInput = function(tax) {
        this.taxInput.sendKeys(tax);
    }

    getTaxInput = function() {
        return this.taxInput.getAttribute('value');
    }

    setTaxPercentInput = function(taxPercent) {
        this.taxPercentInput.sendKeys(taxPercent);
    }

    getTaxPercentInput = function() {
        return this.taxPercentInput.getAttribute('value');
    }

    setTaxDisplayNameInput = function(taxDisplayName) {
        this.taxDisplayNameInput.sendKeys(taxDisplayName);
    }

    getTaxDisplayNameInput = function() {
        return this.taxDisplayNameInput.getAttribute('value');
    }

    setTotalInput = function(total) {
        this.totalInput.sendKeys(total);
    }

    getTotalInput = function() {
        return this.totalInput.getAttribute('value');
    }

    setCurrencyInput = function(currency) {
        this.currencyInput.sendKeys(currency);
    }

    getCurrencyInput = function() {
        return this.currencyInput.getAttribute('value');
    }

    setStripeCodeInput = function(stripeCode) {
        this.stripeCodeInput.sendKeys(stripeCode);
    }

    getStripeCodeInput = function() {
        return this.stripeCodeInput.getAttribute('value');
    }

    getIsSuccessInput = function() {
        return this.isSuccessInput;
    }
    setInvoiceNumberInput = function(invoiceNumber) {
        this.invoiceNumberInput.sendKeys(invoiceNumber);
    }

    getInvoiceNumberInput = function() {
        return this.invoiceNumberInput.getAttribute('value');
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
