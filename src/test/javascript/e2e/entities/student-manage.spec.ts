import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Student e2e test', () => {

    let navBarPage: NavBarPage;
    let studentDialogPage: StudentDialogPage;
    let studentComponentsPage: StudentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Students', () => {
        navBarPage.goToEntity('student-manage');
        studentComponentsPage = new StudentComponentsPage();
        expect(studentComponentsPage.getTitle())
            .toMatch(/eLearningApp.student.home.title/);

    });

    it('should load create Student dialog', () => {
        studentComponentsPage.clickOnCreateButton();
        studentDialogPage = new StudentDialogPage();
        expect(studentDialogPage.getModalTitle())
            .toMatch(/eLearningApp.student.home.createOrEditLabel/);
        studentDialogPage.close();
    });

    it('should create and save Students', () => {
        studentComponentsPage.clickOnCreateButton();
        studentDialogPage.setNameInput('name');
        expect(studentDialogPage.getNameInput()).toMatch('name');
        studentDialogPage.setAboutInput('about');
        expect(studentDialogPage.getAboutInput()).toMatch('about');
        studentDialogPage.setImageUrlInput('imageUrl');
        expect(studentDialogPage.getImageUrlInput()).toMatch('imageUrl');
        studentDialogPage.setCollegeYearInput('5');
        expect(studentDialogPage.getCollegeYearInput()).toMatch('5');
        studentDialogPage.setDobInput('2000-12-31');
        expect(studentDialogPage.getDobInput()).toMatch('2000-12-31');
        studentDialogPage.setMobileInput('mobile');
        expect(studentDialogPage.getMobileInput()).toMatch('mobile');
        studentDialogPage.setAlternativeMobileInput('alternativeMobile');
        expect(studentDialogPage.getAlternativeMobileInput()).toMatch('alternativeMobile');
        studentDialogPage.getPremiumInput().isSelected().then((selected) => {
            if (selected) {
                studentDialogPage.getPremiumInput().click();
                expect(studentDialogPage.getPremiumInput().isSelected()).toBeFalsy();
            } else {
                studentDialogPage.getPremiumInput().click();
                expect(studentDialogPage.getPremiumInput().isSelected()).toBeTruthy();
            }
        });
        studentDialogPage.getActiveInput().isSelected().then((selected) => {
            if (selected) {
                studentDialogPage.getActiveInput().click();
                expect(studentDialogPage.getActiveInput().isSelected()).toBeFalsy();
            } else {
                studentDialogPage.getActiveInput().click();
                expect(studentDialogPage.getActiveInput().isSelected()).toBeTruthy();
            }
        });
        studentDialogPage.setLanguagesSpokenInput('languagesSpoken');
        expect(studentDialogPage.getLanguagesSpokenInput()).toMatch('languagesSpoken');
        studentDialogPage.setSlugInput('slug');
        expect(studentDialogPage.getSlugInput()).toMatch('slug');
        studentDialogPage.setPremiumTillInput('2000-12-31');
        expect(studentDialogPage.getPremiumTillInput()).toMatch('2000-12-31');
        studentDialogPage.setReferenceCodeInput('referenceCode');
        expect(studentDialogPage.getReferenceCodeInput()).toMatch('referenceCode');
        studentDialogPage.setSignUpByReferenceCodeInput('signUpByReferenceCode');
        expect(studentDialogPage.getSignUpByReferenceCodeInput()).toMatch('signUpByReferenceCode');
        studentDialogPage.setWebsiteURLInput('websiteURL');
        expect(studentDialogPage.getWebsiteURLInput()).toMatch('websiteURL');
        studentDialogPage.setTwitterInput('twitter');
        expect(studentDialogPage.getTwitterInput()).toMatch('twitter');
        studentDialogPage.setFacebookInput('facebook');
        expect(studentDialogPage.getFacebookInput()).toMatch('facebook');
        studentDialogPage.setGooglePlusInput('googlePlus');
        expect(studentDialogPage.getGooglePlusInput()).toMatch('googlePlus');
        studentDialogPage.setLinkedInInput('linkedIn');
        expect(studentDialogPage.getLinkedInInput()).toMatch('linkedIn');
        studentDialogPage.stripeCustomerSelectLastOption();
        studentDialogPage.userSelectLastOption();
        studentDialogPage.addressSelectLastOption();
        studentDialogPage.collegeSelectLastOption();
        studentDialogPage.save();
        expect(studentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class StudentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-student-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class StudentDialogPage {
    modalTitle = element(by.css('h4#myStudentLabel'));
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
