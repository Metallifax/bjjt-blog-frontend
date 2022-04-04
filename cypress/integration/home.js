const devRoute = 'http://localhost:3000';

const checkNavbar = () => {
  cy.get('nav')
    .should('be.visible')
    .within(() => {
      cy.get('a')
        .contains('Blogging App')
        .should('contain.text', 'Blogging App');
      cy.get('a').contains('Home').should('contain.text', 'Home');
    });
};

const checkFooter = () => {
  cy.get('div')
    .should('be.visible')
    .within(() => {
      cy.get('p').should('contain.text', 'Brazil Japan Joint Team 2022 ©');
    });
};

describe('end to end test', () => {
  describe('smoke test', () => {
    it('loads successfully', () => {
      cy.visit(devRoute);
    });
  });

  describe('home page', () => {
    it('should have a navbar', () => {
      checkNavbar();
    });

    it('should have the correct url', () => {
      cy.url().should('include', devRoute || devRoute + '/');
    });

    it("'Home' link should have the 'active' class", () => {
      cy.get('a').contains('Home').should('have.class', 'active');
    });

    it('should have a body with some text inside', () => {
      cy.get('h1').should('be.visible').should('contain.text', 'Home!');
    });

    it('should have a footer', () => {
      checkFooter();
    });
  });
});

describe('testing blog creation when interacting with blog editor', () => {
  describe('test that home page is empty upon loading', () => {
    it('should not have a list item upon first visiting', () => {
      cy.visit(devRoute);
      cy.get('li').should('not.exist');
    });
  });

  describe('tests for the modal', () => {
    it('clicking the modal button launches the modal', () => {
      cy.visit(devRoute);
      cy.get('button').contains('Create a post').click();
    });

    it('the modal should contain text in the header', () => {
      cy.get('div').contains('Your modal').should('have.text', 'Your modal');
    });

    it("clicking 'X' button should exit the modal", () => {
      cy.get('.modal-header > button').click();
      cy.get('.modal-header').should('not.exist');
    });
    //
    // it('clicking outside the modal should close the modal', () => {
    //   cy.get('button').contains('Create a post').click();
    //   cy.get('.modal-header').should('exist');
    //   cy.get('*[class^="fade modal show"]')
    //     .click()
    //     .get('.modal-header')
    //     .should('not.exist');
    // });
  });
});
