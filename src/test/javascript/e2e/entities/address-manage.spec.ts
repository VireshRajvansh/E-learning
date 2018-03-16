import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-manage');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle())
            .toMatch(/eLearningApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle())
            .toMatch(/eLearningApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setTypeInput('type');
        expect(addressDialogPage.getTypeInput()).toMatch('type');
        addressDialogPage.setAddressLine1Input('addressLine1');
        expect(addressDialogPage.getAddressLine1Input()).toMatch('addressLine1');
        addressDialogPage.setAddressLine2Input('addressLine2');
        expect(addressDialogPage.getAddressLine2Input()).toMatch('addressLine2');
        addressDialogPage.setZipCodeInput('zipCode');
        expect(addressDialogPage.getZipCodeInput()).toMatch('zipCode');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setStateInput('state');
        expect(addressDialogPage.getStateInput()).toMatch('state');
        addressDialogPage.setLandmarkInput('landmark');
        expect(addressDialogPage.getLandmarkInput()).toMatch('landmark');
        addressDialogPage.setCountryInput('country');
        expect(addressDialogPage.getCountryInput()).toMatch('country');
        addressDialogPage.setLatInput('5');
        expect(addressDialogPage.getLatInput()).toMatch('5');
        addressDialogPage.setLngInput('5');
        expect(addressDialogPage.getLngInput()).toMatch('5');
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-manage div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    typeInput = element(by.css('input#field_type'));
    addressLine1Input = element(by.css('input#field_addressLine1'));
    addressLine2Input = element(by.css('input#field_addressLine2'));
    zipCodeInput = element(by.css('input#field_zipCode'));
    cityInput = element(by.css('input#field_city'));
    stateInput = element(by.css('input#field_state'));
    landmarkInput = element(by.css('input#field_landmark'));
    countryInput = element(by.css('input#field_country'));
    latInput = element(by.css('input#field_lat'));
    lngInput = element(by.css('input#field_lng'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTypeInput = function(type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function() {
        return this.typeInput.getAttribute('value');
    }

    setAddressLine1Input = function(addressLine1) {
        this.addressLine1Input.sendKeys(addressLine1);
    }

    getAddressLine1Input = function() {
        return this.addressLine1Input.getAttribute('value');
    }

    setAddressLine2Input = function(addressLine2) {
        this.addressLine2Input.sendKeys(addressLine2);
    }

    getAddressLine2Input = function() {
        return this.addressLine2Input.getAttribute('value');
    }

    setZipCodeInput = function(zipCode) {
        this.zipCodeInput.sendKeys(zipCode);
    }

    getZipCodeInput = function() {
        return this.zipCodeInput.getAttribute('value');
    }

    setCityInput = function(city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function() {
        return this.cityInput.getAttribute('value');
    }

    setStateInput = function(state) {
        this.stateInput.sendKeys(state);
    }

    getStateInput = function() {
        return this.stateInput.getAttribute('value');
    }

    setLandmarkInput = function(landmark) {
        this.landmarkInput.sendKeys(landmark);
    }

    getLandmarkInput = function() {
        return this.landmarkInput.getAttribute('value');
    }

    setCountryInput = function(country) {
        this.countryInput.sendKeys(country);
    }

    getCountryInput = function() {
        return this.countryInput.getAttribute('value');
    }

    setLatInput = function(lat) {
        this.latInput.sendKeys(lat);
    }

    getLatInput = function() {
        return this.latInput.getAttribute('value');
    }

    setLngInput = function(lng) {
        this.lngInput.sendKeys(lng);
    }

    getLngInput = function() {
        return this.lngInput.getAttribute('value');
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
