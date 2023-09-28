import CartPage from '../support/pageObjects/cart_page';
import PurchasePage from '../support/pageObjects/purchase_page';
const cartPage = new CartPage();
const purchasePage = new PurchasePage();

describe('E-commerce Purchase Flow for Logged-in Users', () => {
  before(() => {
    cy.login();
  });

  it.only('should finalize a purchase from the cart ', () => {
    cy.navigateToMensTShirts();

    cartPage.addProductToCart('Sport basic white T-Shirt');
    cartPage.navigateToCart();
    cartPage.goToCheckoutFromCart();

    cy.fillFieldsWithValidAddress();

    purchasePage.navigateToShipmentOptions();
    purchasePage.navigateToPayment();
    purchasePage.navigateToSummary();
    purchasePage.placeOrderAndVerifySuccess();
  });

  it('should finalize a purchase from the checkout button ', () => {

  });
});

describe('E-commerce Purchase Flow for Guest Users', () => {
  it('should attempt to purchase without being logged in ', () => {

  });
});
