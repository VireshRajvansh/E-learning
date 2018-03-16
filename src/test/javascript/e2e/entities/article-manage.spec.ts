import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Article e2e test', () => {

    let navBarPage: NavBarPage;
    let articleDialogPage: ArticleDialogPage;
    let articleComponentsPage: ArticleComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Articles', () => {
        navBarPage.goToEntity('article-manage');
        articleComponentsPage = new ArticleComponentsPage();
        expect(articleComponentsPage.getTitle())
            .toMatch(/eLearningApp.article.home.title/);

    });

    it('should load create Article dialog', () => {
        articleComponentsPage.clickOnCreateButton();
        articleDialogPage = new ArticleDialogPage();
        expect(articleDialogPage.getModalTitle())
            .toMatch(/eLearningApp.article.home.createOrEditLabel/);
        articleDialogPage.close();
    });

    it('should create and save Articles', () => {
        articleComponentsPage.clickOnCreateButton();
        articleDialogPage.setNameInput('name');
        expect(articleDialogPage.getNameInput()).toMatch('name');
        articleDialogPage.setSlugInput('slug');
        expect(articleDialogPage.getSlugInput()).toMatch('slug');
        articleDialogPage.setTypeInput('type');
        expect(articleDialogPage.getTypeInput()).toMatch('type');
        articleDialogPage.setTagLineInput('tagLine');
        expect(articleDialogPage.getTagLineInput()).toMatch('tagLine');
        articleDialogPage.setCategoriesInput('categories');
        expect(articleDialogPage.getCategoriesInput()).toMatch('categories');
        articleDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                articleDialogPage.getActiveInput().click();
                expect(articleDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                articleDialogPage.getActiveInput().click();
                expect(articleDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        articleDialogPage.userSelectLastOption();
        articleDialogPage.save();
        expect(articleDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ArticleComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-article-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ArticleDialogPage {
    modalTitle = element(by.css('h4#myArticleLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    slugInput = element(by.css('input#field_slug'));
    typeInput = element(by.css('input#field_type'));
    tagLineInput = element(by.css('input#field_tagLine'));
    categoriesInput = element(by.css('input#field_categories'));
    activeInput = element(by.css('input#field_active'));
    userSelect = element(by.css('select#field_user'));

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

    setTagLineInput = function(tagLine) {
        this.tagLineInput.sendKeys(tagLine);
    }

    getTagLineInput = function() {
        return this.tagLineInput.getAttribute('value');
    }

    setCategoriesInput = function(categories) {
        this.categoriesInput.sendKeys(categories);
    }

    getCategoriesInput = function() {
        return this.categoriesInput.getAttribute('value');
    }

    getActiveInput = function() {
        return this.activeInput;
    }
    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
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
