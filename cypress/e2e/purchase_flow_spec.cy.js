describe('E-commerce Purchase Flow for Logged-in Users', () => {
  before(() => {
    cy.login();
  });

  it('should finalize a purchase from the cart ', () => {

  });

  it('should finalize a purchase from the checkout button ', () => {

  });
});

describe('E-commerce Purchase Flow for Guest Users', () => {
  it('should attempt to purchase without being logged in ', () => {

  });
});
