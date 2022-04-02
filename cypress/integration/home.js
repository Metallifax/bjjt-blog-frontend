const devRoute = 'http://localhost:3000';

const data = {
  title: 'title',
  name: 'name',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png',
  editor: 'content',
};

const visitEditorPageAndCheckIfValid = () => {
  it('should visit Editor page', () => {
    cy.get('a').contains('Editor').click();
    cy.url().should('include', devRoute + '/editor');
  });
};

const inputsDataIntoEditor = (data) => {
  it('inputs data into editor', () => {
    cy.get('label').contains('Title').next().type(data.title);
    cy.get('label').contains('Name').next().type(data.name);
    cy.get('label').contains('Image URL').next().type(data.imageUrl);
    cy.get('.rdw-editor-main').clear().type(data.editor);
    cy.get('span').contains(data.editor).should('exist');
  });
};

const submitsTheFormAndBringsUserToHome = () => {
  it("should submit and take user to homepage after clicking 'Save!'", () => {
    cy.get('button').contains('Save!').click();
    cy.url().should('include', devRoute || devRoute + '/');
  });
};

const refreshAndCheckForNoPersistedData = () => {
  it('should clear the list item again when page is refreshed', () => {
    cy.visit(devRoute);
    cy.url().should('include', devRoute);
    cy.get('li').should('not.exist');
  });
};

const checkIfHomepageHasItemsContainingData = (data) => {
  it('home page should now contain elements that hold the correct data', () => {
    cy.get('div')
      .find('img')
      .should('have.class', 'card-img-top')
      .should('have.attr', 'src', data.imageUrl);

    cy.get('div').contains(data.title).should('have.text', data.title);
    cy.get('div')
      .contains(`By: ${data.name}`)
      .should('have.text', `By: ${data.name}`);
    cy.get('div').contains(data.editor).should('have.text', data.editor);
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
    inputsDataIntoEditor(data);
    submitsTheFormAndBringsUserToHome();
    checkIfHomepageHasItemsContainingData(data);
    refreshAndCheckForNoPersistedData();
  });

  describe('test if an empty editor will still create a blog post', () => {
    visitEditorPageAndCheckIfValid();
    inputsDataIntoEditor(data);
    submitsTheFormAndBringsUserToHome();
  });

  describe('adding two more posts will give you three blog posts', () => {
    visitEditorPageAndCheckIfValid();
    inputsDataIntoEditor(data);
    submitsTheFormAndBringsUserToHome();

    visitEditorPageAndCheckIfValid();
    inputsDataIntoEditor(data);
    submitsTheFormAndBringsUserToHome();

    it('home page should now have 3 posts', () => {
      cy.get('.card').should('have.length', 3);
    });
  });
});
