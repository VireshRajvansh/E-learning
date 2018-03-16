import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('State e2e test', () => {

    let navBarPage: NavBarPage;
    let stateDialogPage: StateDialogPage;
    let stateComponentsPage: StateComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load States', () => {
        navBarPage.goToEntity('state-manage');
        stateComponentsPage = new StateComponentsPage();
        expect(stateComponentsPage.getTitle())
            .toMatch(/eLearningApp.state.home.title/);

    });

    it('should load create State dialog', () => {
        stateComponentsPage.clickOnCreateButton();
        stateDialogPage = new StateDialogPage();
        expect(stateDialogPage.getModalTitle())
            .toMatch(/eLearningApp.state.home.createOrEditLabel/);
        stateDialogPage.close();
    });

    it('should create and save States', () => {
        stateComponentsPage.clickOnCreateButton();
        stateDialogPage.setNameInput('name');
        expect(stateDialogPage.getNameInput()).toMatch('name');
        stateDialogPage.setSlugInput('slug');
        expect(stateDialogPage.getSlugInput()).toMatch('slug');
        stateDialogPage.save();
        expect(stateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-state-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StateDialogPage {
    modalTitle = element(by.css('h4#myStateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    slugInput = element(by.css('input#field_slug'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setSlugInput = function(slug) {
        this.slugInput.sendKeys(slug);
    }

    getSlugInput = function() {
        return this.slugInput.getAttribute('value');
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
