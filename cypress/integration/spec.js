/// <reference types="cypress" />
import spok from 'cy-spok'

it('fetches todo', () => {
  cy.visit('index.html')
  cy.intercept('/todos/1').as('todo')
  cy.get('#todo').click()
  cy.wait('@todo')
    .its('response.body')
    .should(spok({
      $topic: 'response',
      userId: 1,
      id: 1,
      title: spok.string,
      completed: false
    }))

  // "normal" deep.include assertion can only confirm
  // the user and the id properties
  cy.get('@todo')
    .its('response.body')
    .should('deep.include', {
      userId: 1,
      id: 1
    })
    // then we can get the title and confirm it is a string
    .its('title').should('be.a', 'string')
})
