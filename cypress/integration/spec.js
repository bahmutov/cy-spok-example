/// <reference types="cypress" />
import spok from 'cy-spok'

Cypress.on('window:before:load', (win) => {
  // force fetch-polyfill to use XMLHttpRequest object
  // that Cypress can spy / stub right now
  delete win.fetch
})

it('fetches todo', () => {
  cy.visit('index.html')
  cy.server()
  cy.route('/todos/1').as('todo')
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
})
