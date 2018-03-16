import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('TaxRate e2e test', () => {

    let navBarPage: NavBarPage;
    let taxRateDialogPage: TaxRateDialogPage;
    let taxRateComponentsPage: TaxRateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load TaxRates', () => {
        navBarPage.goToEntity('tax-rate-manage');
        taxRateComponentsPage = new TaxRateComponentsPage();
        expect(taxRateComponentsPage.getTitle())
            .toMatch(/eLearningApp.taxRate.home.title/);

    });

    it('should load create TaxRate dialog', () => {
        taxRateComponentsPage.clickOnCreateButton();
        taxRateDialogPage = new TaxRateDialogPage();
        expect(taxRateDialogPage.getModalTitle())
            .toMatch(/eLearningApp.taxRate.home.createOrEditLabel/);
        taxRateDialogPage.close();
    });

    it('should create and save TaxRates', () => {
        taxRateComponentsPage.clickOnCreateButton();
        taxRateDialogPage.setDisplayNameInput('displayName');
        expect(taxRateDialogPage.getDisplayNameInput()).toMatch('displayName');
        taxRateDialogPage.setTotalTaxInPctInput('5');
        expect(taxRateDialogPage.getTotalTaxInPctInput()).toMatch('5');
        taxRateDialogPage.setStateIdInput('5');
        expect(taxRateDialogPage.getStateIdInput()).toMatch('5');
        taxRateDialogPage.save();
        expect(taxRateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TaxRateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tax-rate-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TaxRateDialogPage {
    modalTitle = element(by.css('h4#myTaxRateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    displayNameInput = element(by.css('input#field_displayName'));
    totalTaxInPctInput = element(by.css('input#field_totalTaxInPct'));
    stateIdInput = element(by.css('input#field_stateId'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDisplayNameInput = function(displayName) {
        this.displayNameInput.sendKeys(displayName);
    }

    getDisplayNameInput = function() {
        return this.displayNameInput.getAttribute('value');
    }

    setTotalTaxInPctInput = function(totalTaxInPct) {
        this.totalTaxInPctInput.sendKeys(totalTaxInPct);
    }

    getTotalTaxInPctInput = function() {
        return this.totalTaxInPctInput.getAttribute('value');
    }

    setStateIdInput = function(stateId) {
        this.stateIdInput.sendKeys(stateId);
    }

    getStateIdInput = function() {
        return this.stateIdInput.getAttribute('value');
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
