import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('GalleryGroup e2e test', () => {

    let navBarPage: NavBarPage;
    let galleryGroupDialogPage: GalleryGroupDialogPage;
    let galleryGroupComponentsPage: GalleryGroupComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load GalleryGroups', () => {
        navBarPage.goToEntity('gallery-group-manage');
        galleryGroupComponentsPage = new GalleryGroupComponentsPage();
        expect(galleryGroupComponentsPage.getTitle())
            .toMatch(/eLearningApp.galleryGroup.home.title/);

    });

    it('should load create GalleryGroup dialog', () => {
        galleryGroupComponentsPage.clickOnCreateButton();
        galleryGroupDialogPage = new GalleryGroupDialogPage();
        expect(galleryGroupDialogPage.getModalTitle())
            .toMatch(/eLearningApp.galleryGroup.home.createOrEditLabel/);
        galleryGroupDialogPage.close();
    });

    it('should create and save GalleryGroups', () => {
        galleryGroupComponentsPage.clickOnCreateButton();
        galleryGroupDialogPage.setNameInput('name');
        expect(galleryGroupDialogPage.getNameInput()).toMatch('name');
        galleryGroupDialogPage.save();
        expect(galleryGroupDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GalleryGroupComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-gallery-group-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GalleryGroupDialogPage {
    modalTitle = element(by.css('h4#myGalleryGroupLabel'));
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
