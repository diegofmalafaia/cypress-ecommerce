class CartPage {
    cartButtonSelector = '#sylius-cart-total';
    goToCartButtonSelector = '#sylius-go-to-cart';
    cartMessageSelector = 'Your shopping cart';
    cartTotalSelector = 'span#sylius-cart-total';
    removeProductSelector = 'i.remove.icon';
    productImageSelector = 'a.blurring.dimmable.image';
    viewMoreButtonSelector = '.ui.inverted.button:contains("View more")';
    productNameSelector = '#sylius-product-name';
    addToCartButtonSelector = 'button:contains(Add to cart)';
    addedToCartMessageSelector = 'Item has been added to cart';
    productQuantityInputSelector = 'input#sylius_cart_items_0_quantity';
    updatedCartButton = '#sylius-cart-update';
    productUnitPrice = '.sylius-unit-price';
    productTotalLabel = 'td:contains("Items total:")';
    productTotalValue = `${this.productTotalLabel} + td.right.aligned`;


    navigateToCart() {
        cy.get(this.cartButtonSelector).click();
        cy.get(this.goToCartButtonSelector).click();
        cy.contains(this.cartMessageSelector).should('be.visible');
    }

    deleteCart() {
        cy.get(this.cartTotalSelector).invoke('text').then((cartTotal) => {
            if (cartTotal.trim() !== '$0.00') {
                this.navigateToCart();
                cy.get(this.removeProductSelector).click({ force: true, multiple: true });
                cy.get(this.cartTotalSelector).should('have.text', '$0.00');
                cy.goToHomepage();
            }
        });
    }

    addProductToCart(product) {
        cy.searchProduct(product);
        cy.get(this.productImageSelector).trigger('mouseover');
        cy.get(this.viewMoreButtonSelector).click();
        cy.get(this.productNameSelector).should('have.text', product);
        cy.get(this.addToCartButtonSelector).click();
        cy.contains(this.addedToCartMessageSelector).should('be.visible');
    }

    verifyProductQuantity(expectedValue) {
        cy.get(this.productQuantityInputSelector).should('have.value', expectedValue);
    }

    updateAndVerifyCartQuantity() {
        cy.get(this.productQuantityInputSelector).invoke('val').then((currentValue) => {
            const newValue = parseInt(currentValue) + 1;
            cy.get(this.productQuantityInputSelector).clear().type(newValue.toString());
            cy.get(this.updatedCartButton).click();
            cy.get(this.productQuantityInputSelector).should('have.value', newValue.toString());
        });
    }

    updateAndVerifyCartTotalValue() {
        cy.get(this.productTotalValue).invoke('text').then((totalText) => {
            const previousTotal = parseFloat(totalText.replace(/[^0-9.-]+/g,""));

            cy.get(this.productQuantityInputSelector).invoke('val').then((quantityText) => {
                const currentQuantity = parseInt(quantityText);
                const newQuantity = currentQuantity + 1;

                cy.get(this.productQuantityInputSelector).clear().type(newQuantity.toString());
                cy.get(this.updatedCartButton).click();

                cy.wait(3000);

                cy.get(this.productUnitPrice).invoke('text').then((unitPriceText) => {
                    const unitPrice = parseFloat(unitPriceText.replace(/[^0-9.-]+/g,""));

                    const expectedNewTotal = previousTotal + unitPrice;
                    cy.get(this.productTotalValue).should('contain', expectedNewTotal.toFixed(2));
                });
            });
        });
    }
}

export default CartPage;
