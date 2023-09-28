class PurchasePage {
    nextStepButton = '#next-step';
    headerMessage = 'div.ui.dividing.header';
    placeOrderButton = 'button:has(i.check.icon):contains("Place order")';
    thankYouMessage = '#sylius-thank-you';

    navigateToShipmentOptions() {
        cy.get(this.nextStepButton).scrollIntoView().click();
        cy.get(this.headerMessage).should('contains.text', 'Shipment');
        return this;
    }

    navigateToPayment() {
        cy.get(this.nextStepButton).scrollIntoView().click();
        cy.get(this.headerMessage).should('contains.text', 'Payment');
        return this;
    }

    navigateToSummary() {
        cy.get(this.nextStepButton).scrollIntoView().click();
        cy.get('.content').should('contain', 'Summary of your order');
        return this;
    }

    placeOrderAndVerifySuccess() {
        cy.get(this.placeOrderButton).scrollIntoView().click();
        cy.get(this.thankYouMessage).should('contain', 'You have successfully placed an order.');
        return this;
    }
}

export default PurchasePage;
