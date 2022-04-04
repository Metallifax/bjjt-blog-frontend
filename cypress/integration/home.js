const devRoute = 'http://localhost:3000';

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

    it('clicking outside the modal should close the modal', () => {
      cy.get('button').contains('Create a post').click();
      cy.get('.modal-header').should('exist');
      cy.get('*[class^="fade modal show"]').click();
      cy.get('.modal-header').should('not.exist');
    });
  });
});
