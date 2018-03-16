import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Course e2e test', () => {

    let navBarPage: NavBarPage;
    let courseDialogPage: CourseDialogPage;
    let courseComponentsPage: CourseComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Courses', () => {
        navBarPage.goToEntity('course-manage');
        courseComponentsPage = new CourseComponentsPage();
        expect(courseComponentsPage.getTitle())
            .toMatch(/eLearningApp.course.home.title/);

    });

    it('should load create Course dialog', () => {
        courseComponentsPage.clickOnCreateButton();
        courseDialogPage = new CourseDialogPage();
        expect(courseDialogPage.getModalTitle())
            .toMatch(/eLearningApp.course.home.createOrEditLabel/);
        courseDialogPage.close();
    });

    it('should create and save Courses', () => {
        courseComponentsPage.clickOnCreateButton();
        courseDialogPage.setNameInput('name');
        expect(courseDialogPage.getNameInput()).toMatch('name');
        courseDialogPage.setSlugInput('slug');
        expect(courseDialogPage.getSlugInput()).toMatch('slug');
        courseDialogPage.setTypeInput('type');
        expect(courseDialogPage.getTypeInput()).toMatch('type');
        courseDialogPage.setShortDescInput('shortDesc');
        expect(courseDialogPage.getShortDescInput()).toMatch('shortDesc');
        courseDialogPage.setCategoriesInput('categories');
        expect(courseDialogPage.getCategoriesInput()).toMatch('categories');
        courseDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                courseDialogPage.getActiveInput().click();
                expect(courseDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                courseDialogPage.getActiveInput().click();
                expect(courseDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        courseDialogPage.getPremiumInput().isSelected().then((selected) => {
            if (selected) {
                courseDialogPage.getPremiumInput().click();
                expect(courseDialogPage.getPremiumInput().isSelected()).toBeFalsy();
            } else {
                courseDialogPage.getPremiumInput().click();
                expect(courseDialogPage.getPremiumInput().isSelected()).toBeTruthy();
            }
        });
        courseDialogPage.setCourseHrsInput('courseHrs');
        expect(courseDialogPage.getCourseHrsInput()).toMatch('courseHrs');
        courseDialogPage.setTagLineInput('tagLine');
        expect(courseDialogPage.getTagLineInput()).toMatch('tagLine');
        courseDialogPage.setPremiumTillInput('2000-12-31');
        expect(courseDialogPage.getPremiumTillInput()).toMatch('2000-12-31');
        courseDialogPage.playlistSelectLastOption();
        courseDialogPage.userSelectLastOption();
        courseDialogPage.save();
        expect(courseDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CourseComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-course-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CourseDialogPage {
    modalTitle = element(by.css('h4#myCourseLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    slugInput = element(by.css('input#field_slug'));
    typeInput = element(by.css('input#field_type'));
    shortDescInput = element(by.css('input#field_shortDesc'));
    categoriesInput = element(by.css('input#field_categories'));
    activeInput = element(by.css('input#field_active'));
    premiumInput = element(by.css('input#field_premium'));
    courseHrsInput = element(by.css('input#field_courseHrs'));
    tagLineInput = element(by.css('input#field_tagLine'));
    premiumTillInput = element(by.css('input#field_premiumTill'));
    playlistSelect = element(by.css('select#field_playlist'));
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

    setShortDescInput = function(shortDesc) {
        this.shortDescInput.sendKeys(shortDesc);
    }

    getShortDescInput = function() {
        return this.shortDescInput.getAttribute('value');
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
    getPremiumInput = function() {
        return this.premiumInput;
    }
    setCourseHrsInput = function(courseHrs) {
        this.courseHrsInput.sendKeys(courseHrs);
    }

    getCourseHrsInput = function() {
        return this.courseHrsInput.getAttribute('value');
    }

    setTagLineInput = function(tagLine) {
        this.tagLineInput.sendKeys(tagLine);
    }

    getTagLineInput = function() {
        return this.tagLineInput.getAttribute('value');
    }

    setPremiumTillInput = function(premiumTill) {
        this.premiumTillInput.sendKeys(premiumTill);
    }

    getPremiumTillInput = function() {
        return this.premiumTillInput.getAttribute('value');
    }

    playlistSelectLastOption = function() {
        this.playlistSelect.all(by.tagName('option')).last().click();
    }

    playlistSelectOption = function(option) {
        this.playlistSelect.sendKeys(option);
    }

    getPlaylistSelect = function() {
        return this.playlistSelect;
    }

    getPlaylistSelectedOption = function() {
        return this.playlistSelect.element(by.css('option:checked')).getText();
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
