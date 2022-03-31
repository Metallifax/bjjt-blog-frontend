const devRoute = 'http://localhost:3000';

const visitEditorPageAndCheckIfValid = () => {
  it('should visit Editor page', () => {
    cy.get('a').contains('Editor').click();
    cy.url().should('include', devRoute + '/editor');
  });
};

const inputMessageIntoEditor = (input) => {
  it(`input message into editor that contains ${input}`, () => {
    cy.get('.rdw-editor-main').type(input);
    cy.get('span').contains(input).should('exist');
  });
};

const refreshAndCheckForNoPersistedData = () => {
  it('should clear the list item again when page is refreshed', () => {
    cy.visit(devRoute);
    cy.url().should('include', devRoute);
    cy.get('li').should('not.exist');
  });
};

const submitAndVisitHomepage = () => {
  it("should submit and take user to homepage after clicking 'Save!'", () => {
    cy.get('button').contains('Save!').click();
    cy.url().should('include', devRoute || devRoute + '/');
  });
};

const checkIfHomepageHasItemWithText = (text) => {
  it(`home page should now contain the list item with text '${text}'`, () => {
    cy.get('li').contains(text).should('exist');
  });
};

describe('testing blog creation when interacting with blog editor', () => {
  describe('test that home page is empty upon loading', () => {
    it('should not have a list item upon first visiting', () => {
      cy.visit(devRoute);
      cy.get('li').should('not.exist');
    });
  });

  describe('go to Editor page and enter text in editor', () => {
    visitEditorPageAndCheckIfValid();
    inputMessageIntoEditor('hello world!');
    submitAndVisitHomepage();
    checkIfHomepageHasItemWithText('hello world!');
    refreshAndCheckForNoPersistedData();
  });

  describe('test if an empty editor will still create a blog post', () => {
    visitEditorPageAndCheckIfValid();
    it('should not submit and keep the user on the page upon saving', () => {
      cy.get('button').contains('Save!').click();
      cy.url().should('include', devRoute + '/editor');
    });
  });

  describe('test if multiple "blog posts" can be created', () => {
    inputMessageIntoEditor('hello world again!');
    submitAndVisitHomepage();
    checkIfHomepageHasItemWithText('hello world again!');
    visitEditorPageAndCheckIfValid();
    inputMessageIntoEditor('hello world yet again!');
    submitAndVisitHomepage();
    checkIfHomepageHasItemWithText('hello world yet again!');
  });
});
