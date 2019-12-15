/// <reference types="cypress" />
import spok from 'cy-spok'

Cypress.on('window:before:load', (win) => {
  // force fetch-polyfill to use XMLHttpRequest object
  // that Cypress can spy / stub right now
  delete win.fetch
})

it('fetches todo', () => {
  cy.visit('index.html')
  cy.get('#todo').click()
})
