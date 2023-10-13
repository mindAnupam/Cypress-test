// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Google Homepage Test', () => {

const getIframeDocument = () => {
  return cy.get('#courses-iframe')
  .its('0.contentDocument').should('exist')
}

const getIframeBody = () => {
  return getIframeDocument()
  .its('body').should('not.be.undefined')
  .then(cy.wrap);
}

  beforeEach(() => {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  });

  it('should perform a basic search', () => {
    
    // Type a search query and submit the form
    cy.get('[title="Search"]').type(searchQuery).type('{enter}');

    cy.vi

    // Ensure search results are displayed
    cy.get('#search').should('be.visible');

    // Verify that the search results contain the query
    cy.get('#search').should('include.text', searchQuery);
  });

  it('should switch to Google Images', () => {
    // Click the "Images" link in the navigation bar
    cy.contains('Images').click();

    // Ensure the URL changes to the Images search page
    cy.url().should('include', '/imghp');
  });

  it.only('should have a title', () => {

    //Assert title
    cy.title().should('eq','Practice Page');

    //Assert URL
    cy.url().should('eq','https://rahulshettyacademy.com/AutomationPractice/')

    // ------------------------------------------

    //Assert blinking text
    cy.get('.blinkingText').should('have.text', 'Free Access to InterviewQues/ResumeAssistance/Material');

    //Assert blinking text href
    cy.get('.blinkingText').should('have.attr','href', 'https://rahulshettyacademy.com/documents-request');

    // ---------------------------------------------------

    //Scroll IFrame in to view
    cy.get('#courses-iframe').scrollIntoView();

    //Assert that iframe is displayed
    cy.get('#courses-iframe').should('be.visible');

    //Assert Iframe content
    getIframeBody().find('.login-btn > a').eq(0).should('have.text', 'Register');

    //Assert register button class name inside IFrame
    getIframeBody().find('.login-btn > a > span').should('have.class', 'icon fa fa-user')

    //Scroll back to top
    cy.get('h1').should('have.text', 'Practice Page').scrollIntoView();

    // -------------------------------------------------------

    //Check the Radio button
    cy.get('[type="radio"]').check('radio3')

    //Assert that the radio button is selected
    cy.get('[type="radio"]').eq(2).should('be.checked');

    // -----------------------------------------------
    //Get total no. of checkboxes
    cy.get('#checkbox-example > fieldset > label').should('have.length', '3')

    cy.get('#checkbox-example > fieldset > label').should('have.length.below', 4)

    //Check the first checkbox
    cy.get('#checkbox-example > fieldset > label >input').first().check()

    //Assert that the first option is checked
    cy.get('#checkbox-example > fieldset > label > input').first().should('be.checked')

    // ----------------------------------------------

    //Display

    //Assert that the input field is displayed by default
    cy.get('#displayed-text').should('be.visible');

    //Click on the hide button
    cy.get('#hide-textbox').click();

    //Assert that it is hidden
    cy.get('#displayed-text').should('be.hidden');

    //Click on show button
    cy.get('#show-textbox').click();

     //Assert that it is visible
     cy.get('#displayed-text').should('be.visible');

    //  ----------------------------------------------------------

    //Hover

    //Scroll to element
    cy.get('#mousehover').scrollIntoView();

    //Assert that dropdown is hidden by default
    // cy.get('.mouse-hover').siblings('div').should('be.hidden') //Not working dunnoo why?
    cy.get('.mouse-hover > div').should('be.hidden')

    //Hover over text
    cy.get('.mouse-hover').trigger('mouseover');

    //Assert that the dropdown is visible
    // cy.get('.mouse-hover > div').should('be.visible')



  });
});
