//Login

Cypress.Commands.add('login', () => {
    cy.fixture('credentials.json').then(credentials => {
        const email = credentials.email;
        const password = credentials.password;

        cy.visit('https://demo.sylius.com/');
        cy.title().should('eq', 'Fashion Web Store')

        const login_button_on_header = cy.contains('a', 'Login');
        login_button_on_header.click();

        cy.get('div').should('contain', 'Customer login');

        const login_button = cy.get('button.ui.blue.submit.button').scrollIntoView()

        const email_field = cy.get('#_username');
        email_field.type(email, { log: false });

        const password_field = cy.get('#_password');
        password_field.type(password, { log: false });

        login_button.click();

        cy.goToHomepage();
    });
});

Cypress.Commands.add('goToHomepage', (email, password) => {
    const sylius_logo = cy.get('a[href="/en_US/"] img[alt="Sylius logo"].ui.small.image')
    sylius_logo.click();
    cy.title().should('eq', 'Fashion Web Store')
});

// products

Cypress.Commands.add('navigateToMensTShirts', () => {
    const tshirt_span = cy.contains('span', 'T-shirts');
    tshirt_span.click();

    const men_option = cy.contains('a', 'Men');
    men_option.click();
});

Cypress.Commands.add('searchProduct', (product) => {
    const search_textfield = cy.get('#criteria_search_value');
    search_textfield.type(product);

    const search_button = cy.contains('button', 'Search');
    search_button.click();
});
