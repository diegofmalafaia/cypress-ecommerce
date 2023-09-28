class CartPage {
    cartButton = '#sylius-cart-total';
    goToCartButton = '#sylius-go-to-cart';
    cartMessage = 'Your shopping cart';
    cartTotal = 'span#sylius-cart-total';
    removeProduct = 'i.remove.icon';
    productImage = 'a.blurring.dimmable.image';
    viewMoreButton = '.ui.inverted.button:contains("View more")';
    productName = '#sylius-product-name';
    addToCartButton = 'button:contains(Add to cart)';
    addedToCartMessage = 'Item has been added to cart';
    productQuantityInput = 'input#sylius_cart_items_0_quantity';
    updatedCartButton = '#sylius-cart-update';
    productUnitPrice = '.sylius-unit-price';
    productTotalLabel = 'td:contains("Items total:")';
    productTotalValue = `${this.productTotalLabel} + td.right.aligned`;
    checkoutButtonOnCart = 'button[type="submit"][name="submit-type"][value="checkout"][form="sylius_cart"]';
    purchaseEmail = '#purchaser-email';

    navigateToCart() {
        cy.get(this.cartButton).click();
        cy.get(this.goToCartButton).click();
        cy.contains(this.cartMessage).should('be.visible');
    }

    deleteCart() {
        cy.get(this.cartTotal).invoke('text').then((cartTotal) => {
            if (cartTotal.trim() !== '$0.00') {
                this.navigateToCart();
                cy.get(this.removeProduct).click({ force: true, multiple: true });
                cy.get(this.cartTotal).should('have.text', '$0.00');
                cy.goToHomepage();
            }
        });
    }

    addProductToCart(product) {
        cy.searchProduct(product);

        cy.get(this.productImage).trigger('mouseover');
        cy.get(this.viewMoreButton).click();
        cy.get(this.productName).should('have.text', product);
        cy.get(this.addToCartButton).click();
        cy.contains(this.addedToCartMessage).should('be.visible');
    }

    verifyProductQuantity(expectedValue) {
        cy.get(this.productQuantityInput).should('have.value', expectedValue);
    }

    updateAndVerifyCartQuantity() {
        cy.get(this.productQuantityInput).invoke('val').then((currentValue) => {
            const newValue = parseInt(currentValue) + 1;
            cy.get(this.productQuantityInput).clear().type(newValue.toString());
            cy.get(this.updatedCartButton).click();
            cy.get(this.productQuantityInput).should('have.value', newValue.toString());
        });
    }

    updateAndVerifyCartTotalValue() {
        cy.get(this.productTotalValue).invoke('text').then((totalText) => {
            const previousTotal = parseFloat(totalText.replace(/[^0-9.-]+/g,""));

            cy.get(this.productQuantityInput).invoke('val').then((quantityText) => {
                const currentQuantity = parseInt(quantityText);
                const newQuantity = currentQuantity + 1;

                cy.get(this.productQuantityInput).clear().type(newQuantity.toString());
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

    goToCheckoutFromCart() {
        cy.get(this.checkoutButtonOnCart).click();
        cy.get(this.purchaseEmail).should('contain.text', 'Checking out');
    }
}

export default CartPage;
