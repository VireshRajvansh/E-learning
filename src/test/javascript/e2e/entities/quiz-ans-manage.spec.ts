import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('QuizAns e2e test', () => {

    let navBarPage: NavBarPage;
    let quizAnsDialogPage: QuizAnsDialogPage;
    let quizAnsComponentsPage: QuizAnsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load QuizAns', () => {
        navBarPage.goToEntity('quiz-ans-manage');
        quizAnsComponentsPage = new QuizAnsComponentsPage();
        expect(quizAnsComponentsPage.getTitle())
            .toMatch(/eLearningApp.quizAns.home.title/);

    });

    it('should load create QuizAns dialog', () => {
        quizAnsComponentsPage.clickOnCreateButton();
        quizAnsDialogPage = new QuizAnsDialogPage();
        expect(quizAnsDialogPage.getModalTitle())
            .toMatch(/eLearningApp.quizAns.home.createOrEditLabel/);
        quizAnsDialogPage.close();
    });

    it('should create and save QuizAns', () => {
        quizAnsComponentsPage.clickOnCreateButton();
        quizAnsDialogPage.setAnswersInput('answers');
        expect(quizAnsDialogPage.getAnswersInput()).toMatch('answers');
        quizAnsDialogPage.save();
        expect(quizAnsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class QuizAnsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-quiz-ans-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class QuizAnsDialogPage {
    modalTitle = element(by.css('h4#myQuizAnsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    answersInput = element(by.css('input#field_answers'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setAnswersInput = function(answers) {
        this.answersInput.sendKeys(answers);
    }

    getAnswersInput = function() {
        return this.answersInput.getAttribute('value');
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
