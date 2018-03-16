import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserSignUpByReferralCode e2e test', () => {

    let navBarPage: NavBarPage;
    let userSignUpByReferralCodeDialogPage: UserSignUpByReferralCodeDialogPage;
    let userSignUpByReferralCodeComponentsPage: UserSignUpByReferralCodeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserSignUpByReferralCodes', () => {
        navBarPage.goToEntity('user-sign-up-by-referral-code-manage');
        userSignUpByReferralCodeComponentsPage = new UserSignUpByReferralCodeComponentsPage();
        expect(userSignUpByReferralCodeComponentsPage.getTitle())
            .toMatch(/eLearningApp.userSignUpByReferralCode.home.title/);

    });

    it('should load create UserSignUpByReferralCode dialog', () => {
        userSignUpByReferralCodeComponentsPage.clickOnCreateButton();
        userSignUpByReferralCodeDialogPage = new UserSignUpByReferralCodeDialogPage();
        expect(userSignUpByReferralCodeDialogPage.getModalTitle())
            .toMatch(/eLearningApp.userSignUpByReferralCode.home.createOrEditLabel/);
        userSignUpByReferralCodeDialogPage.close();
    });

    it('should create and save UserSignUpByReferralCodes', () => {
        userSignUpByReferralCodeComponentsPage.clickOnCreateButton();
        userSignUpByReferralCodeDialogPage.setReferralCodeInput('referralCode');
        expect(userSignUpByReferralCodeDialogPage.getReferralCodeInput()).toMatch('referralCode');
        userSignUpByReferralCodeDialogPage.userSelectLastOption();
        userSignUpByReferralCodeDialogPage.save();
        expect(userSignUpByReferralCodeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserSignUpByReferralCodeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-sign-up-by-referral-code-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserSignUpByReferralCodeDialogPage {
    modalTitle = element(by.css('h4#myUserSignUpByReferralCodeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    referralCodeInput = element(by.css('input#field_referralCode'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setReferralCodeInput = function(referralCode) {
        this.referralCodeInput.sendKeys(referralCode);
    }

    getReferralCodeInput = function() {
        return this.referralCodeInput.getAttribute('value');
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
