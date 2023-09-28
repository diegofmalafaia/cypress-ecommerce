class PurchasePage {
    nextStepButton = '#next-step';
    headerMessage = 'div.ui.dividing.header';
    placeOrderButton = 'button:has(i.check.icon):contains("Place order")';
    thankYouMessage = '#sylius-thank-you';

    navigateToShipmentOptions() {
        cy.get(this.nextStepButton).scrollIntoView().click();
        cy.get(this.headerMessage).should('contains.text', 'Shipment');
    }

    navigateToPayment() {
        cy.get(this.nextStepButton).scrollIntoView().click();
        cy.get(this.headerMessage).should('contains.text', 'Payment');
    }

    navigateToSummary() {
        cy.get(this.nextStepButton).scrollIntoView().click();
        cy.get('.content').should('contain', 'Summary of your order');
    }

    placeOrderAndVerifySuccess() {
        cy.get(this.placeOrderButton).scrollIntoView().click();
        cy.get(this.thankYouMessage).should('contain', 'You have successfully placed an order.');
    }
}

export default PurchasePage;
