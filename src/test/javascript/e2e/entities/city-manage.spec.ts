import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('City e2e test', () => {

    let navBarPage: NavBarPage;
    let cityDialogPage: CityDialogPage;
    let cityComponentsPage: CityComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cities', () => {
        navBarPage.goToEntity('city-manage');
        cityComponentsPage = new CityComponentsPage();
        expect(cityComponentsPage.getTitle())
            .toMatch(/eLearningApp.city.home.title/);

    });

    it('should load create City dialog', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage = new CityDialogPage();
        expect(cityDialogPage.getModalTitle())
            .toMatch(/eLearningApp.city.home.createOrEditLabel/);
        cityDialogPage.close();
    });

    it('should create and save Cities', () => {
        cityComponentsPage.clickOnCreateButton();
        cityDialogPage.setNameInput('name');
        expect(cityDialogPage.getNameInput()).toMatch('name');
        cityDialogPage.setSlugInput('slug');
        expect(cityDialogPage.getSlugInput()).toMatch('slug');
        cityDialogPage.stateSelectLastOption();
        cityDialogPage.save();
        expect(cityDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CityComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-city-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CityDialogPage {
    modalTitle = element(by.css('h4#myCityLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    slugInput = element(by.css('input#field_slug'));
    stateSelect = element(by.css('select#field_state'));

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

    stateSelectLastOption = function() {
        this.stateSelect.all(by.tagName('option')).last().click();
    }

    stateSelectOption = function(option) {
        this.stateSelect.sendKeys(option);
    }

    getStateSelect = function() {
        return this.stateSelect;
    }

    getStateSelectedOption = function() {
        return this.stateSelect.element(by.css('option:checked')).getText();
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
