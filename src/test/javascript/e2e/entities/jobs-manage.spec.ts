import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Jobs e2e test', () => {

    let navBarPage: NavBarPage;
    let jobsDialogPage: JobsDialogPage;
    let jobsComponentsPage: JobsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Jobs', () => {
        navBarPage.goToEntity('jobs-manage');
        jobsComponentsPage = new JobsComponentsPage();
        expect(jobsComponentsPage.getTitle())
            .toMatch(/eLearningApp.jobs.home.title/);

    });

    it('should load create Jobs dialog', () => {
        jobsComponentsPage.clickOnCreateButton();
        jobsDialogPage = new JobsDialogPage();
        expect(jobsDialogPage.getModalTitle())
            .toMatch(/eLearningApp.jobs.home.createOrEditLabel/);
        jobsDialogPage.close();
    });

    it('should create and save Jobs', () => {
        jobsComponentsPage.clickOnCreateButton();
        jobsDialogPage.setNameInput('name');
        expect(jobsDialogPage.getNameInput()).toMatch('name');
        jobsDialogPage.setRunonInput('2000-12-31');
        expect(jobsDialogPage.getRunonInput()).toMatch('2000-12-31');
        jobsDialogPage.setTypeInput('type');
        expect(jobsDialogPage.getTypeInput()).toMatch('type');
        jobsDialogPage.setCronExpressInput('cronExpress');
        expect(jobsDialogPage.getCronExpressInput()).toMatch('cronExpress');
        jobsDialogPage.getIsCompleteInput().isSelected().then((selected) => {
            if (selected) {
                jobsDialogPage.getIsCompleteInput().click();
                expect(jobsDialogPage.getIsCompleteInput().isSelected()).toBeFalsy();
            } else {
                jobsDialogPage.getIsCompleteInput().click();
                expect(jobsDialogPage.getIsCompleteInput().isSelected()).toBeTruthy();
            }
        });
        jobsDialogPage.setMsgInput('msg');
        expect(jobsDialogPage.getMsgInput()).toMatch('msg');
        jobsDialogPage.save();
        expect(jobsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class JobsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-jobs-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class JobsDialogPage {
    modalTitle = element(by.css('h4#myJobsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    runonInput = element(by.css('input#field_runon'));
    typeInput = element(by.css('input#field_type'));
    cronExpressInput = element(by.css('input#field_cronExpress'));
    isCompleteInput = element(by.css('input#field_isComplete'));
    msgInput = element(by.css('input#field_msg'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setRunonInput = function(runon) {
        this.runonInput.sendKeys(runon);
    }

    getRunonInput = function() {
        return this.runonInput.getAttribute('value');
    }

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    }

    setCronExpressInput = function(cronExpress) {
        this.cronExpressInput.sendKeys(cronExpress);
    }

    getCronExpressInput = function() {
        return this.cronExpressInput.getAttribute('value');
    }

    getIsCompleteInput = function() {
        return this.isCompleteInput;
    }
    setMsgInput = function(msg) {
        this.msgInput.sendKeys(msg);
    }

    getMsgInput = function() {
        return this.msgInput.getAttribute('value');
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
