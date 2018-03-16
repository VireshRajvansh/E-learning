import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Teacher e2e test', () => {

    let navBarPage: NavBarPage;
    let teacherDialogPage: TeacherDialogPage;
    let teacherComponentsPage: TeacherComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Teachers', () => {
        navBarPage.goToEntity('teacher-manage');
        teacherComponentsPage = new TeacherComponentsPage();
        expect(teacherComponentsPage.getTitle())
            .toMatch(/eLearningApp.teacher.home.title/);

    });

    it('should load create Teacher dialog', () => {
        teacherComponentsPage.clickOnCreateButton();
        teacherDialogPage = new TeacherDialogPage();
        expect(teacherDialogPage.getModalTitle())
            .toMatch(/eLearningApp.teacher.home.createOrEditLabel/);
        teacherDialogPage.close();
    });

    it('should create and save Teachers', () => {
        teacherComponentsPage.clickOnCreateButton();
        teacherDialogPage.setNameInput('name');
        expect(teacherDialogPage.getNameInput()).toMatch('name');
        teacherDialogPage.setAboutInput('about');
        expect(teacherDialogPage.getAboutInput()).toMatch('about');
        teacherDialogPage.setImageUrlInput('imageUrl');
        expect(teacherDialogPage.getImageUrlInput()).toMatch('imageUrl');
        teacherDialogPage.setCollegeYearInput('5');
        expect(teacherDialogPage.getCollegeYearInput()).toMatch('5');
        teacherDialogPage.setDobInput('2000-12-31');
        expect(teacherDialogPage.getDobInput()).toMatch('2000-12-31');
        teacherDialogPage.setMobileInput('mobile');
        expect(teacherDialogPage.getMobileInput()).toMatch('mobile');
        teacherDialogPage.setAlternativeMobileInput('alternativeMobile');
        expect(teacherDialogPage.getAlternativeMobileInput()).toMatch('alternativeMobile');
        teacherDialogPage.getPremiumInput().isSelected().then((selected) => {
            if (selected) {
                teacherDialogPage.getPremiumInput().click();
                expect(teacherDialogPage.getPremiumInput().isSelected()).toBeFalsy();
            } else {
                teacherDialogPage.getPremiumInput().click();
                expect(teacherDialogPage.getPremiumInput().isSelected()).toBeTruthy();
            }
        });
        teacherDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                teacherDialogPage.getActiveInput().click();
                expect(teacherDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                teacherDialogPage.getActiveInput().click();
                expect(teacherDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        teacherDialogPage.setLanguagesSpokenInput('languagesSpoken');
        expect(teacherDialogPage.getLanguagesSpokenInput()).toMatch('languagesSpoken');
        teacherDialogPage.setSlugInput('slug');
        expect(teacherDialogPage.getSlugInput()).toMatch('slug');
        teacherDialogPage.setPremiumTillInput('2000-12-31');
        expect(teacherDialogPage.getPremiumTillInput()).toMatch('2000-12-31');
        teacherDialogPage.setReferenceCodeInput('referenceCode');
        expect(teacherDialogPage.getReferenceCodeInput()).toMatch('referenceCode');
        teacherDialogPage.setSignUpByReferenceCodeInput('signUpByReferenceCode');
        expect(teacherDialogPage.getSignUpByReferenceCodeInput()).toMatch('signUpByReferenceCode');
        teacherDialogPage.setWebsiteURLInput('websiteURL');
        expect(teacherDialogPage.getWebsiteURLInput()).toMatch('websiteURL');
        teacherDialogPage.setTwitterInput('twitter');
        expect(teacherDialogPage.getTwitterInput()).toMatch('twitter');
        teacherDialogPage.setFacebookInput('facebook');
        expect(teacherDialogPage.getFacebookInput()).toMatch('facebook');
        teacherDialogPage.setGooglePlusInput('googlePlus');
        expect(teacherDialogPage.getGooglePlusInput()).toMatch('googlePlus');
        teacherDialogPage.setLinkedInInput('linkedIn');
        expect(teacherDialogPage.getLinkedInInput()).toMatch('linkedIn');
        teacherDialogPage.stripeCustomerSelectLastOption();
        teacherDialogPage.userSelectLastOption();
        teacherDialogPage.addressSelectLastOption();
        teacherDialogPage.collegeSelectLastOption();
        teacherDialogPage.save();
        expect(teacherDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TeacherComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-teacher-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TeacherDialogPage {
    modalTitle = element(by.css('h4#myTeacherLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    aboutInput = element(by.css('input#field_about'));
    imageUrlInput = element(by.css('input#field_imageUrl'));
    collegeYearInput = element(by.css('input#field_collegeYear'));
    dobInput = element(by.css('input#field_dob'));
    mobileInput = element(by.css('input#field_mobile'));
    alternativeMobileInput = element(by.css('input#field_alternativeMobile'));
    premiumInput = element(by.css('input#field_premium'));
    activeInput = element(by.css('input#field_active'));
    languagesSpokenInput = element(by.css('input#field_languagesSpoken'));
    slugInput = element(by.css('input#field_slug'));
    premiumTillInput = element(by.css('input#field_premiumTill'));
    referenceCodeInput = element(by.css('input#field_referenceCode'));
    signUpByReferenceCodeInput = element(by.css('input#field_signUpByReferenceCode'));
    websiteURLInput = element(by.css('input#field_websiteURL'));
    twitterInput = element(by.css('input#field_twitter'));
    facebookInput = element(by.css('input#field_facebook'));
    googlePlusInput = element(by.css('input#field_googlePlus'));
    linkedInInput = element(by.css('input#field_linkedIn'));
    stripeCustomerSelect = element(by.css('select#field_stripeCustomer'));
    userSelect = element(by.css('select#field_user'));
    addressSelect = element(by.css('select#field_address'));
    collegeSelect = element(by.css('select#field_college'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setAboutInput = function(about) {
        this.aboutInput.sendKeys(about);
    }

    getAboutInput = function() {
        return this.aboutInput.getAttribute('value');
    }

    setImageUrlInput = function(imageUrl) {
        this.imageUrlInput.sendKeys(imageUrl);
    }

    getImageUrlInput = function() {
        return this.imageUrlInput.getAttribute('value');
    }

    setCollegeYearInput = function(collegeYear) {
        this.collegeYearInput.sendKeys(collegeYear);
    }

    getCollegeYearInput = function() {
        return this.collegeYearInput.getAttribute('value');
    }

    setDobInput = function(dob) {
        this.dobInput.sendKeys(dob);
    }

    getDobInput = function() {
        return this.dobInput.getAttribute('value');
    }

    setMobileInput = function(mobile) {
        this.mobileInput.sendKeys(mobile);
    }

    getMobileInput = function() {
        return this.mobileInput.getAttribute('value');
    }

    setAlternativeMobileInput = function(alternativeMobile) {
        this.alternativeMobileInput.sendKeys(alternativeMobile);
    }

    getAlternativeMobileInput = function() {
        return this.alternativeMobileInput.getAttribute('value');
    }

    getPremiumInput = function() {
        return this.premiumInput;
    }
    getActiveInput = function() {
        return this.activeInput;
    }
    setLanguagesSpokenInput = function(languagesSpoken) {
        this.languagesSpokenInput.sendKeys(languagesSpoken);
    }

    getLanguagesSpokenInput = function() {
        return this.languagesSpokenInput.getAttribute('value');
    }

    setSlugInput = function(slug) {
        this.slugInput.sendKeys(slug);
    }

    getSlugInput = function() {
        return this.slugInput.getAttribute('value');
    }

    setPremiumTillInput = function(premiumTill) {
        this.premiumTillInput.sendKeys(premiumTill);
    }

    getPremiumTillInput = function() {
        return this.premiumTillInput.getAttribute('value');
    }

    setReferenceCodeInput = function(referenceCode) {
        this.referenceCodeInput.sendKeys(referenceCode);
    }

    getReferenceCodeInput = function() {
        return this.referenceCodeInput.getAttribute('value');
    }

    setSignUpByReferenceCodeInput = function(signUpByReferenceCode) {
        this.signUpByReferenceCodeInput.sendKeys(signUpByReferenceCode);
    }

    getSignUpByReferenceCodeInput = function() {
        return this.signUpByReferenceCodeInput.getAttribute('value');
    }

    setWebsiteURLInput = function(websiteURL) {
        this.websiteURLInput.sendKeys(websiteURL);
    }

    getWebsiteURLInput = function() {
        return this.websiteURLInput.getAttribute('value');
    }

    setTwitterInput = function(twitter) {
        this.twitterInput.sendKeys(twitter);
    }

    getTwitterInput = function() {
        return this.twitterInput.getAttribute('value');
    }

    setFacebookInput = function(facebook) {
        this.facebookInput.sendKeys(facebook);
    }

    getFacebookInput = function() {
        return this.facebookInput.getAttribute('value');
    }

    setGooglePlusInput = function(googlePlus) {
        this.googlePlusInput.sendKeys(googlePlus);
    }

    getGooglePlusInput = function() {
        return this.googlePlusInput.getAttribute('value');
    }

    setLinkedInInput = function(linkedIn) {
        this.linkedInInput.sendKeys(linkedIn);
    }

    getLinkedInInput = function() {
        return this.linkedInInput.getAttribute('value');
    }

    stripeCustomerSelectLastOption = function() {
        this.stripeCustomerSelect.all(by.tagName('option')).last().click();
    }

    stripeCustomerSelectOption = function(option) {
        this.stripeCustomerSelect.sendKeys(option);
    }

    getStripeCustomerSelect = function() {
        return this.stripeCustomerSelect;
    }

    getStripeCustomerSelectedOption = function() {
        return this.stripeCustomerSelect.element(by.css('option:checked')).getText();
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

    addressSelectLastOption = function() {
        this.addressSelect.all(by.tagName('option')).last().click();
    }

    addressSelectOption = function(option) {
        this.addressSelect.sendKeys(option);
    }

    getAddressSelect = function() {
        return this.addressSelect;
    }

    getAddressSelectedOption = function() {
        return this.addressSelect.element(by.css('option:checked')).getText();
    }

    collegeSelectLastOption = function() {
        this.collegeSelect.all(by.tagName('option')).last().click();
    }

    collegeSelectOption = function(option) {
        this.collegeSelect.sendKeys(option);
    }

    getCollegeSelect = function() {
        return this.collegeSelect;
    }

    getCollegeSelectedOption = function() {
        return this.collegeSelect.element(by.css('option:checked')).getText();
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
