// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Rahul Shetty Web Test', () => {

const coursesIframe = '#courses-iframe';
const displayedText = '#displayed-text';

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


  it('First Test', () => {

    //Assert title
    cy.title().should('eq','Practice Page');

    //Assert URL
    cy.url().should('eq','https://rahulshettyacademy.com/AutomationPractice/')

    // ------------------------------------------

    //Assert binking text 'text' and href
    cy.get('.blinkingText')
    .should('have.text', 'Free Access to InterviewQues/ResumeAssistance/Material')
    .should('have.attr', 'href', 'https://rahulshettyacademy.com/documents-request');

    // ---------------------------------------------------

    //Scroll IFrame in to view
    cy.get(coursesIframe).scrollIntoView();

    //Assert that iframe is displayed
    cy.get(coursesIframe).should('be.visible');

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
    cy.get('[type="radio"]').eq(2).should('be.checked').and('have.value', 'radio3');

    // -----------------------------------------------
    //Get total no. of checkboxes
    cy.get('#checkbox-example > fieldset > label').should('have.length', 3)

    cy.get('#checkbox-example > fieldset > label').should('have.length.below', 4)

    //Check the first checkbox
    cy.get('#checkbox-example > fieldset > label >input').first().check()

    //Assert that the first option is checked
    cy.get('#checkbox-example > fieldset > label > input').first().should('be.checked')

    // ----------------------------------------------

    //Display

    //Assert that the input field is displayed by default
    cy.get(displayedText).should('be.visible');

    //Click on the hide button
    cy.get('#hide-textbox').click();

    //Assert that it is hidden
    cy.get(displayedText).should('be.hidden');

    //Click on show button
    cy.get('#show-textbox').click();

     //Assert that it is visible
     cy.get(displayedText).should('be.visible');

    //  ----------------------------------------------------------


  });
});
