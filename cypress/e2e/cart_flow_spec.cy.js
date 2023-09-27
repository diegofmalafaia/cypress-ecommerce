import CartPage from '../support/pageObjects/cart_page';
const cartPage = new CartPage();

describe('E-commerce Cart Flow', () => {

  beforeEach(() => {
    cy.login();
  });

  it('should add item to cart', () => {
    cartPage.deleteCart();

    cy.navigateToMensTShirts();

    cartPage.addProductToCart('Sport basic white T-Shirt');

    cartPage.navigateToCart();

    cartPage.verifyProductQuantity('1');
  });

  it('should remove item from cart', () => {
    cy.navigateToMensTShirts();

    cartPage.addProductToCart('Sport basic white T-Shirt');

    cartPage.navigateToCart();

    cartPage.deleteCart();
  });

  it('should update item quantity in cart', () => {
    cy.navigateToMensTShirts();

    cartPage.addProductToCart('Sport basic white T-Shirt');

    cartPage.navigateToCart();

    cartPage.updateAndVerifyCartQuantity();
  });

  it('should update the total price when adding items', () => {
    cy.navigateToMensTShirts();

    cartPage.addProductToCart('Sport basic white T-Shirt');

    cartPage.navigateToCart();

    cartPage.updateAndVerifyCartTotalValue();
  });
});
