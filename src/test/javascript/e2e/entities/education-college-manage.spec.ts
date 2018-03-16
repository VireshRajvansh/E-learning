import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('EducationCollege e2e test', () => {

    let navBarPage: NavBarPage;
    let educationCollegeDialogPage: EducationCollegeDialogPage;
    let educationCollegeComponentsPage: EducationCollegeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load EducationColleges', () => {
        navBarPage.goToEntity('education-college-manage');
        educationCollegeComponentsPage = new EducationCollegeComponentsPage();
        expect(educationCollegeComponentsPage.getTitle())
            .toMatch(/eLearningApp.educationCollege.home.title/);

    });

    it('should load create EducationCollege dialog', () => {
        educationCollegeComponentsPage.clickOnCreateButton();
        educationCollegeDialogPage = new EducationCollegeDialogPage();
        expect(educationCollegeDialogPage.getModalTitle())
            .toMatch(/eLearningApp.educationCollege.home.createOrEditLabel/);
        educationCollegeDialogPage.close();
    });

    it('should create and save EducationColleges', () => {
        educationCollegeComponentsPage.clickOnCreateButton();
        educationCollegeDialogPage.setNameInput('name');
        expect(educationCollegeDialogPage.getNameInput()).toMatch('name');
        educationCollegeDialogPage.save();
        expect(educationCollegeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class EducationCollegeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-education-college-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class EducationCollegeDialogPage {
    modalTitle = element(by.css('h4#myEducationCollegeLabel'));
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
