import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('StripeTransaction e2e test', () => {

    let navBarPage: NavBarPage;
    let stripeTransactionDialogPage: StripeTransactionDialogPage;
    let stripeTransactionComponentsPage: StripeTransactionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load StripeTransactions', () => {
        navBarPage.goToEntity('stripe-transaction-manage');
        stripeTransactionComponentsPage = new StripeTransactionComponentsPage();
        expect(stripeTransactionComponentsPage.getTitle())
            .toMatch(/eLearningApp.stripeTransaction.home.title/);

    });

    it('should load create StripeTransaction dialog', () => {
        stripeTransactionComponentsPage.clickOnCreateButton();
        stripeTransactionDialogPage = new StripeTransactionDialogPage();
        expect(stripeTransactionDialogPage.getModalTitle())
            .toMatch(/eLearningApp.stripeTransaction.home.createOrEditLabel/);
        stripeTransactionDialogPage.close();
    });

    it('should create and save StripeTransactions', () => {
        stripeTransactionComponentsPage.clickOnCreateButton();
        stripeTransactionDialogPage.setStripResponseInput('stripResponse');
        expect(stripeTransactionDialogPage.getStripResponseInput()).toMatch('stripResponse');
        stripeTransactionDialogPage.save();
        expect(stripeTransactionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StripeTransactionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-stripe-transaction-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StripeTransactionDialogPage {
    modalTitle = element(by.css('h4#myStripeTransactionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    stripResponseInput = element(by.css('input#field_stripResponse'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setStripResponseInput = function(stripResponse) {
        this.stripResponseInput.sendKeys(stripResponse);
    }

    getStripResponseInput = function() {
        return this.stripResponseInput.getAttribute('value');
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
