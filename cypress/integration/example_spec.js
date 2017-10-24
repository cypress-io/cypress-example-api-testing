/* eslint-env mocha */
describe('todos API', () => {
  const initialItems = [
    {
      "id": 1,
      "task": "read something"
    },
    {
      "id": 2,
      "task": "write something"
    }
  ]

  const getItems = () =>
    cy.request('/todos')
      .its('body')

  it('returns JSON', () => {
    cy.request('/todos')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('loads 2 items', () => {
    getItems()
      .should('have.length', 2)
  })

  it('loads the initial items', () => {
    getItems()
      .should('deep.eq', initialItems)
  })

  it('returns id + task objects', () => {
    getItems()
      .each(value =>
        expect(value).to.have.all.keys('id', 'task')
      )
  })
})
