import CartPage from '../support/pageObjects/cart_page';
const cartPage = new CartPage();

describe('E-commerce Cart Flow', () => {

  beforeEach(() => {
    cy.login();
  });

  it('should add item to cart', () => {
    cartPage
        .deleteCart()
        .addProductToCart('Sport basic white T-Shirt')
        .navigateToCart()
        .verifyProductQuantity('1');
  });

  it('should remove item from cart', () => {
    cartPage
        .addProductToCart('Sport basic white T-Shirt')
        .navigateToCart()
        .deleteCart();
  });

  it('should update item quantity in cart', () => {
    cartPage
        .addProductToCart('Sport basic white T-Shirt')
        .navigateToCart()
        .updateAndVerifyCartQuantity();
  });

  it('should update the total price when adding items', () => {
    cartPage
        .addProductToCart('Sport basic white T-Shirt')
        .navigateToCart()
        .updateAndVerifyCartTotalValue();
  });
});
