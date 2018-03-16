import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Gallery e2e test', () => {

    let navBarPage: NavBarPage;
    let galleryDialogPage: GalleryDialogPage;
    let galleryComponentsPage: GalleryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Galleries', () => {
        navBarPage.goToEntity('gallery-manage');
        galleryComponentsPage = new GalleryComponentsPage();
        expect(galleryComponentsPage.getTitle())
            .toMatch(/eLearningApp.gallery.home.title/);

    });

    it('should load create Gallery dialog', () => {
        galleryComponentsPage.clickOnCreateButton();
        galleryDialogPage = new GalleryDialogPage();
        expect(galleryDialogPage.getModalTitle())
            .toMatch(/eLearningApp.gallery.home.createOrEditLabel/);
        galleryDialogPage.close();
    });

    it('should create and save Galleries', () => {
        galleryComponentsPage.clickOnCreateButton();
        galleryDialogPage.setImageUrlInput('imageUrl');
        expect(galleryDialogPage.getImageUrlInput()).toMatch('imageUrl');
        galleryDialogPage.galleryGroupSelectLastOption();
        galleryDialogPage.save();
        expect(galleryDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class GalleryComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-gallery-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GalleryDialogPage {
    modalTitle = element(by.css('h4#myGalleryLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    imageUrlInput = element(by.css('input#field_imageUrl'));
    galleryGroupSelect = element(by.css('select#field_galleryGroup'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setImageUrlInput = function(imageUrl) {
        this.imageUrlInput.sendKeys(imageUrl);
    }

    getImageUrlInput = function() {
        return this.imageUrlInput.getAttribute('value');
    }

    galleryGroupSelectLastOption = function() {
        this.galleryGroupSelect.all(by.tagName('option')).last().click();
    }

    galleryGroupSelectOption = function(option) {
        this.galleryGroupSelect.sendKeys(option);
    }

    getGalleryGroupSelect = function() {
        return this.galleryGroupSelect;
    }

    getGalleryGroupSelectedOption = function() {
        return this.galleryGroupSelect.element(by.css('option:checked')).getText();
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
