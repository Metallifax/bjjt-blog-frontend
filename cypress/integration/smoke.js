const devRoute = 'http://localhost:3000';

function checkNavbar() {
  cy.get('nav')
    .should('be.visible')
    .within(() => {
      cy.get('a')
        .contains('Blogging App')
        .should('contain.text', 'Blogging App');
      cy.get('a').contains('Home').should('contain.text', 'Home');
      cy.get('a').contains('About').should('contain.text', 'About');
      cy.get('a').contains('Editor').should('contain.text', 'Editor');
    });
}

function checkFooter() {
  cy.get('div')
    .should('be.visible')
    .within(() => {
      cy.get('p').should('contain.text', 'Brazil Japan Joint Team 2022 ©');
    });
}

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

  describe('visiting the about page', () => {
    it("should click About link and go to 'About' page", () => {
      cy.get('a').contains('About').click();
      cy.url().should('include', devRoute + '/about');
    });

    it('should have a navbar', () => {
      checkNavbar();
    });

    it("change the active class on 'About' link on visit", () => {
      cy.get('a').contains('About').should('have.class', 'active');
    });

    it('should have a body with text in it', () => {
      cy.get('h1').contains('About!').should('contain.text', 'About!');
    });

    it('should have a footer', () => {
      checkFooter();
    });
  });
});

describe('visiting the Editor page', () => {
  it("should click 'Editor' link and visit the page", () => {
    cy.get('a').contains('Editor').click();
    cy.url().should('include', devRoute + '/editor');
  });

  it('should have a navbar', () => {
    checkNavbar();
  });

  it('should contain an editor', () => {
    cy.get('div').get('.rdw-editor-wrapper').should('be.visible');
  });

  it('should have a footer', () => {
    checkFooter();
  });
});

describe('clicking back to home page should work', () => {
  it("should click 'Home' link and visit the page", () => {
    cy.get('a').contains('Home').click();
    cy.url().should('include', devRoute || devRoute + '/');
  });

  it('should have a navbar', () => {
    checkNavbar();
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
