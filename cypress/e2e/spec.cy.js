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

  // beforeEach(() => {
  //   cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
  // });

  it('First Test', () => {

     // ---------------------------------------------------

    //Scroll IFrame in to view
    cy.get(coursesIframe).scrollIntoView();

    //Assert that iframe is displayed
    cy.get(coursesIframe).should('be.visible');

    //Assert Iframe content
    getIframeBody().find('.login-btn > a').eq(0).should('have.text', 'Register');

    //Click on the register button
    getIframeBody().find('.login-btn > a').eq(0).click()

    //Assert register button class name inside IFrame
    getIframeBody().find('.login-btn > a > span').should('have.class', 'icon fa fa-user')

    // //Scroll back to top
    // cy.get('h1').should('have.text', 'Practice Page').scrollIntoView();


    
    // //Assert title
    // cy.title().should('eq','Practice Page');

    // //Assert URL
    // cy.url().should('eq','https://rahulshettyacademy.com/AutomationPractice/')

    // // ------------------------------------------

    // //Assert binking text 'text' and href
    // cy.get('.blinkingText')
    // .should('have.text', 'Free Access to InterviewQues/ResumeAssistance/Material')
    // .should('have.attr', 'href', 'https://rahulshettyacademy.com/documents-request');

   
    // // -------------------------------------------------------

    // //Check the Radio button
    // cy.get('[type="radio"]').check('radio3')

    // //Assert that the radio button is selected
    // cy.get('[type="radio"]').eq(2).should('be.checked').and('have.value', 'radio3');

    // // -----------------------------------------------
    // //Get total no. of checkboxes
    // cy.get('#checkbox-example > fieldset > label').should('have.length', 3)

    // cy.get('#checkbox-example > fieldset > label').should('have.length.below', 4)

    // //Check the first checkbox
    // cy.get('#checkbox-example > fieldset > label >input').first().check()

    // //Assert that the first option is checked
    // cy.get('#checkbox-example > fieldset > label > input').first().should('be.checked')

    // // ----------------------------------------------

    // //Display

    // //Assert that the input field is displayed by default
    // cy.get(displayedText).should('be.visible');

    // //Click on the hide button
    // cy.get('#hide-textbox').click();

    // //Assert that it is hidden
    // cy.get(displayedText).should('be.hidden');

    // //Click on show button
    // cy.get('#show-textbox').click();

    //  //Assert that it is visible
    //  cy.get(displayedText).should('be.visible');

    //  ----------------------------------------------------------


  });

  it('Hover test' , () => {

    //Mouse move
    cy.get('.mouse-hover').scrollIntoView();
    cy.get('#mousehover').trigger('mouseover')

    //Assert that hovered text is displayed
    cy.get('.mouse-hover-content').should('be.visible');

  })

  it('Hover test' , () => {

    cy.visit('https://the-internet.herokuapp.com/hovers');

    //Mouse move
    cy.get('.example > div').eq(0).trigger('mouseover')

    //Assert that hovered text is displayed
    cy.get('[alt = "User Avatar"]').should('be.visible');

  })

  it('Table test' , () => {

    //Assert the no. of rows present
    cy.get('[name="courses"] > tbody > tr').should('have.length', 11)

    //Assert the no. of column in each row
    cy.get('[name="courses"] > tbody > tr').each(($li) => {
        expect($li.children()).to.have.length(3) 
    })

    //Assert the heading
     cy.get('[name="courses"] > tbody > tr > th').should('have.text', 'InstructorCoursePrice')

  })

  it('Table test' , () => {

    cy.visit('https://demoqa.com/droppable');

    //Assert that the draggable element is displayed
    cy.get('#draggable').should('be.visible');

    //Assert that the draggable position is shown
    cy.get('#simpleDropContainer').children('#droppable').should('be.visible')
   

  })

  it("File Upload test" , () => {
      cy.visit("https://the-internet.herokuapp.com/");

      //Click on the drag and drop option
      cy.get("ul > li").eq(17).children().click();

     cy.get("input[type=file]").attachFile('wallpaper.jpg')
     cy.get('input[value=Upload]').click();
      
    //Assert that the file is uploaded
      cy.get('#uploaded-files').contains('wallpaper.jpg')
  })

  it.only("Complete Test" ,() => {
    // cy.once('uncaught:exception', () => false);

    // cy.fixture('example.json').then(function (data) {
    //   cy.get('#firstName').type(data.name);
    // })

    cy.login();

    cy.fixture("example").then((data) => {
      cy.log(data)
      cy.get('#firstName').type(data[0].firstName);
      cy.get('#lastName').type(data[0].lastName)
      cy.get('#userEmail').type(data[0].email)
      cy.get('[type="radio"]').check(data[0].gender ,{ force: true })
      cy.get('#userNumber').type(data[0].mobileNo)
      cy.get('#dateOfBirthInput').click()
      cy.get('.react-datepicker__month-select').select('6')
      cy.get('.react-datepicker__year-select').select('1947')
      cy.get('.react-datepicker__week').first().click()
      cy.get('#subjectsInput').type(data[0].subject);
      cy.get('[type="checkbox"]').check('3' , {force:true})
      cy.get('[type="file"]').attachFile('wallpaper.jpg')
    })
  })
});
