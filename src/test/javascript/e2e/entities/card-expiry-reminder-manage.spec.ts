import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CardExpiryReminder e2e test', () => {

    let navBarPage: NavBarPage;
    let cardExpiryReminderDialogPage: CardExpiryReminderDialogPage;
    let cardExpiryReminderComponentsPage: CardExpiryReminderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CardExpiryReminders', () => {
        navBarPage.goToEntity('card-expiry-reminder-manage');
        cardExpiryReminderComponentsPage = new CardExpiryReminderComponentsPage();
        expect(cardExpiryReminderComponentsPage.getTitle())
            .toMatch(/eLearningApp.cardExpiryReminder.home.title/);

    });

    it('should load create CardExpiryReminder dialog', () => {
        cardExpiryReminderComponentsPage.clickOnCreateButton();
        cardExpiryReminderDialogPage = new CardExpiryReminderDialogPage();
        expect(cardExpiryReminderDialogPage.getModalTitle())
            .toMatch(/eLearningApp.cardExpiryReminder.home.createOrEditLabel/);
        cardExpiryReminderDialogPage.close();
    });

    it('should create and save CardExpiryReminders', () => {
        cardExpiryReminderComponentsPage.clickOnCreateButton();
        cardExpiryReminderDialogPage.setUserIdInput('5');
        expect(cardExpiryReminderDialogPage.getUserIdInput()).toMatch('5');
        cardExpiryReminderDialogPage.setMessageTypeInput('messageType');
        expect(cardExpiryReminderDialogPage.getMessageTypeInput()).toMatch('messageType');
        cardExpiryReminderDialogPage.setSendOnDateInput('2000-12-31');
        expect(cardExpiryReminderDialogPage.getSendOnDateInput()).toMatch('2000-12-31');
        cardExpiryReminderDialogPage.getIsCompleteInput().isSelected().then((selected) => {
            if (selected) {
                cardExpiryReminderDialogPage.getIsCompleteInput().click();
                expect(cardExpiryReminderDialogPage.getIsCompleteInput().isSelected()).toBeFalsy();
            } else {
                cardExpiryReminderDialogPage.getIsCompleteInput().click();
                expect(cardExpiryReminderDialogPage.getIsCompleteInput().isSelected()).toBeTruthy();
            }
        });
        cardExpiryReminderDialogPage.setRefDataInput('refData');
        expect(cardExpiryReminderDialogPage.getRefDataInput()).toMatch('refData');
        cardExpiryReminderDialogPage.save();
        expect(cardExpiryReminderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CardExpiryReminderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-card-expiry-reminder-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CardExpiryReminderDialogPage {
    modalTitle = element(by.css('h4#myCardExpiryReminderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userIdInput = element(by.css('input#field_userId'));
    messageTypeInput = element(by.css('input#field_messageType'));
    sendOnDateInput = element(by.css('input#field_sendOnDate'));
    isCompleteInput = element(by.css('input#field_isComplete'));
    refDataInput = element(by.css('input#field_refData'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUserIdInput = function(userId) {
        this.userIdInput.sendKeys(userId);
    }

    getUserIdInput = function() {
        return this.userIdInput.getAttribute('value');
    }

    setMessageTypeInput = function(messageType) {
        this.messageTypeInput.sendKeys(messageType);
    }

    getMessageTypeInput = function() {
        return this.messageTypeInput.getAttribute('value');
    }

    setSendOnDateInput = function(sendOnDate) {
        this.sendOnDateInput.sendKeys(sendOnDate);
    }

    getSendOnDateInput = function() {
        return this.sendOnDateInput.getAttribute('value');
    }

    getIsCompleteInput = function() {
        return this.isCompleteInput;
    }
    setRefDataInput = function(refData) {
        this.refDataInput.sendKeys(refData);
    }

    getRefDataInput = function() {
        return this.refDataInput.getAttribute('value');
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
