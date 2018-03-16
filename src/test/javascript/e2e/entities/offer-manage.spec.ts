import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Offer e2e test', () => {

    let navBarPage: NavBarPage;
    let offerDialogPage: OfferDialogPage;
    let offerComponentsPage: OfferComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Offers', () => {
        navBarPage.goToEntity('offer-manage');
        offerComponentsPage = new OfferComponentsPage();
        expect(offerComponentsPage.getTitle())
            .toMatch(/eLearningApp.offer.home.title/);

    });

    it('should load create Offer dialog', () => {
        offerComponentsPage.clickOnCreateButton();
        offerDialogPage = new OfferDialogPage();
        expect(offerDialogPage.getModalTitle())
            .toMatch(/eLearningApp.offer.home.createOrEditLabel/);
        offerDialogPage.close();
    });

    it('should create and save Offers', () => {
        offerComponentsPage.clickOnCreateButton();
        offerDialogPage.setNameInput('name');
        expect(offerDialogPage.getNameInput()).toMatch('name');
        offerDialogPage.save();
        expect(offerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OfferComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-offer-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OfferDialogPage {
    modalTitle = element(by.css('h4#myOfferLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
