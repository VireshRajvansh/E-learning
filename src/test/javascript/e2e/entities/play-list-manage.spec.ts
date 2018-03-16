import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('PlayList e2e test', () => {

    let navBarPage: NavBarPage;
    let playListDialogPage: PlayListDialogPage;
    let playListComponentsPage: PlayListComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PlayLists', () => {
        navBarPage.goToEntity('play-list-manage');
        playListComponentsPage = new PlayListComponentsPage();
        expect(playListComponentsPage.getTitle())
            .toMatch(/eLearningApp.playList.home.title/);

    });

    it('should load create PlayList dialog', () => {
        playListComponentsPage.clickOnCreateButton();
        playListDialogPage = new PlayListDialogPage();
        expect(playListDialogPage.getModalTitle())
            .toMatch(/eLearningApp.playList.home.createOrEditLabel/);
        playListDialogPage.close();
    });

    it('should create and save PlayLists', () => {
        playListComponentsPage.clickOnCreateButton();
        playListDialogPage.setNameInput('name');
        expect(playListDialogPage.getNameInput()).toMatch('name');
        playListDialogPage.setSlugInput('slug');
        expect(playListDialogPage.getSlugInput()).toMatch('slug');
        playListDialogPage.setTypeInput('type');
        expect(playListDialogPage.getTypeInput()).toMatch('type');
        playListDialogPage.setLengthInput('5');
        expect(playListDialogPage.getLengthInput()).toMatch('5');
        playListDialogPage.setDurationInput('duration');
        expect(playListDialogPage.getDurationInput()).toMatch('duration');
        playListDialogPage.setTagLineInput('tagLine');
        expect(playListDialogPage.getTagLineInput()).toMatch('tagLine');
        playListDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                playListDialogPage.getActiveInput().click();
                expect(playListDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                playListDialogPage.getActiveInput().click();
                expect(playListDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        playListDialogPage.save();
        expect(playListDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PlayListComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-play-list-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PlayListDialogPage {
    modalTitle = element(by.css('h4#myPlayListLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    slugInput = element(by.css('input#field_slug'));
    typeInput = element(by.css('input#field_type'));
    lengthInput = element(by.css('input#field_length'));
    durationInput = element(by.css('input#field_duration'));
    tagLineInput = element(by.css('input#field_tagLine'));
    activeInput = element(by.css('input#field_active'));

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

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    }

    setLengthInput = function(length) {
        this.lengthInput.sendKeys(length);
    }

    getLengthInput = function() {
        return this.lengthInput.getAttribute('value');
    }

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    }

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    }

    setTagLineInput = function(tagLine) {
        this.tagLineInput.sendKeys(tagLine);
    }

    getTagLineInput = function() {
        return this.tagLineInput.getAttribute('value');
    }

    getActiveInput = function() {
        return this.activeInput;
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
