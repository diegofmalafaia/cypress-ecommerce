import CartPage from '../support/pageObjects/cart_page';
import PurchasePage from '../support/pageObjects/purchase_page';
const cartPage = new CartPage();
const purchasePage = new PurchasePage();

describe('E-commerce Purchase Flow for Logged-in Users', () => {
  before(() => {
    cy.login();
  });

  it.only('should finalize a purchase from the cart ', () => {
    cartPage
        .addProductToCart('Sport basic white T-Shirt')
        .navigateToCart()
        .goToCheckoutFromCart();

    cy.fillFieldsWithValidAddress();

    purchasePage
        .navigateToShipmentOptions()
        .navigateToPayment()
        .navigateToSummary()
        .placeOrderAndVerifySuccess();
  });

  it('should finalize a purchase from the checkout button ', () => {

  });
});

describe('E-commerce Purchase Flow for Guest Users', () => {
  it('should attempt to purchase without being logged in ', () => {

  });
});
