import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Quiz e2e test', () => {

    let navBarPage: NavBarPage;
    let quizDialogPage: QuizDialogPage;
    let quizComponentsPage: QuizComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Quizzes', () => {
        navBarPage.goToEntity('quiz-manage');
        quizComponentsPage = new QuizComponentsPage();
        expect(quizComponentsPage.getTitle())
            .toMatch(/eLearningApp.quiz.home.title/);

    });

    it('should load create Quiz dialog', () => {
        quizComponentsPage.clickOnCreateButton();
        quizDialogPage = new QuizDialogPage();
        expect(quizDialogPage.getModalTitle())
            .toMatch(/eLearningApp.quiz.home.createOrEditLabel/);
        quizDialogPage.close();
    });

    it('should create and save Quizzes', () => {
        quizComponentsPage.clickOnCreateButton();
        quizDialogPage.setNameInput('name');
        expect(quizDialogPage.getNameInput()).toMatch('name');
        quizDialogPage.setSlugInput('slug');
        expect(quizDialogPage.getSlugInput()).toMatch('slug');
        quizDialogPage.setTextInput('text');
        expect(quizDialogPage.getTextInput()).toMatch('text');
        quizDialogPage.setTypeInput('type');
        expect(quizDialogPage.getTypeInput()).toMatch('type');
        quizDialogPage.setShortDescInput('shortDesc');
        expect(quizDialogPage.getShortDescInput()).toMatch('shortDesc');
        quizDialogPage.getIsCompleteInput().isSelected().then((selected) => {
            if (selected) {
                quizDialogPage.getIsCompleteInput().click();
                expect(quizDialogPage.getIsCompleteInput().isSelected()).toBeFalsy();
            } else {
                quizDialogPage.getIsCompleteInput().click();
                expect(quizDialogPage.getIsCompleteInput().isSelected()).toBeTruthy();
            }
        });
        quizDialogPage.setTagLineInput('tagLine');
        expect(quizDialogPage.getTagLineInput()).toMatch('tagLine');
        quizDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                quizDialogPage.getActiveInput().click();
                expect(quizDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                quizDialogPage.getActiveInput().click();
                expect(quizDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        quizDialogPage.getSelectedInput().isSelected().then((selected) => {
            if (selected) {
                quizDialogPage.getSelectedInput().click();
                expect(quizDialogPage.getSelectedInput().isSelected()).toBeFalsy();
            } else {
                quizDialogPage.getSelectedInput().click();
                expect(quizDialogPage.getSelectedInput().isSelected()).toBeTruthy();
            }
        });
        quizDialogPage.quizAnsSelectLastOption();
        quizDialogPage.userSelectLastOption();
        quizDialogPage.save();
        expect(quizDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuizComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-quiz-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuizDialogPage {
    modalTitle = element(by.css('h4#myQuizLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    slugInput = element(by.css('input#field_slug'));
    textInput = element(by.css('input#field_text'));
    typeInput = element(by.css('input#field_type'));
    shortDescInput = element(by.css('input#field_shortDesc'));
    isCompleteInput = element(by.css('input#field_isComplete'));
    tagLineInput = element(by.css('input#field_tagLine'));
    activeInput = element(by.css('input#field_active'));
    selectedInput = element(by.css('input#field_selected'));
    quizAnsSelect = element(by.css('select#field_quizAns'));
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

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    }

    getTextInput = function() {
        return this.textInput.getAttribute('value');
    }

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    }

    setShortDescInput = function(shortDesc) {
        this.shortDescInput.sendKeys(shortDesc);
    }

    getShortDescInput = function() {
        return this.shortDescInput.getAttribute('value');
    }

    getIsCompleteInput = function() {
        return this.isCompleteInput;
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
    getSelectedInput = function() {
        return this.selectedInput;
    }
    quizAnsSelectLastOption = function() {
        this.quizAnsSelect.all(by.tagName('option')).last().click();
    }

    quizAnsSelectOption = function(option) {
        this.quizAnsSelect.sendKeys(option);
    }

    getQuizAnsSelect = function() {
        return this.quizAnsSelect;
    }

    getQuizAnsSelectedOption = function() {
        return this.quizAnsSelect.element(by.css('option:checked')).getText();
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
