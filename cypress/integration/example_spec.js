/* eslint-env mocha */
describe('todos API', () => {
  it('returns JSON', () => {
    cy.request('/todos')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('loads 2 items', () => {
    cy.request('/todos')
      .its('body')
      .should('have.length', 2)
  })
})
