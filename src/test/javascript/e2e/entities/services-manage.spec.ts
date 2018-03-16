import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Services e2e test', () => {

    let navBarPage: NavBarPage;
    let servicesDialogPage: ServicesDialogPage;
    let servicesComponentsPage: ServicesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Services', () => {
        navBarPage.goToEntity('services-manage');
        servicesComponentsPage = new ServicesComponentsPage();
        expect(servicesComponentsPage.getTitle())
            .toMatch(/eLearningApp.services.home.title/);

    });

    it('should load create Services dialog', () => {
        servicesComponentsPage.clickOnCreateButton();
        servicesDialogPage = new ServicesDialogPage();
        expect(servicesDialogPage.getModalTitle())
            .toMatch(/eLearningApp.services.home.createOrEditLabel/);
        servicesDialogPage.close();
    });

    it('should create and save Services', () => {
        servicesComponentsPage.clickOnCreateButton();
        servicesDialogPage.setNameInput('name');
        expect(servicesDialogPage.getNameInput()).toMatch('name');
        servicesDialogPage.save();
        expect(servicesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ServicesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-services-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ServicesDialogPage {
    modalTitle = element(by.css('h4#myServicesLabel'));
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
