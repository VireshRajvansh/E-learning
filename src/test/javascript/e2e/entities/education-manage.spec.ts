import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Education e2e test', () => {

    let navBarPage: NavBarPage;
    let educationDialogPage: EducationDialogPage;
    let educationComponentsPage: EducationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Educations', () => {
        navBarPage.goToEntity('education-manage');
        educationComponentsPage = new EducationComponentsPage();
        expect(educationComponentsPage.getTitle())
            .toMatch(/eLearningApp.education.home.title/);

    });

    it('should load create Education dialog', () => {
        educationComponentsPage.clickOnCreateButton();
        educationDialogPage = new EducationDialogPage();
        expect(educationDialogPage.getModalTitle())
            .toMatch(/eLearningApp.education.home.createOrEditLabel/);
        educationDialogPage.close();
    });

    it('should create and save Educations', () => {
        educationComponentsPage.clickOnCreateButton();
        educationDialogPage.setNameInput('name');
        expect(educationDialogPage.getNameInput()).toMatch('name');
        educationDialogPage.save();
        expect(educationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EducationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-education-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EducationDialogPage {
    modalTitle = element(by.css('h4#myEducationLabel'));
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
