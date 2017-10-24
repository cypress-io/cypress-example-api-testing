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

  const getItems = (options = {log: false}) =>
    cy.request({
      url: '/todos',
      method: 'GET',
      log: options.log
    }).its('body')

  const add = (item, options = {log: true}) =>
    cy.request({
      method: 'POST',
      url: '/todos',
      body: item,
      log: options.log
    })

  const deleteItem = (item, options = {log: true}) =>
    cy.request({
      method: 'DELETE',
      url: `/todos/${item.id}`,
      log: options.log
    })

  const deleteAll = () =>
    getItems()
      .each((item) => deleteItem(item, {log: false}))

  const reset = () => {
    deleteAll()
    initialItems.forEach((item) => add(item, {log: false}))
  }

  beforeEach(reset)
  afterEach(reset)

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

  it('adds an item', () => {
    const randomId = Cypress._.random(0, 10000)
    const item = {id:randomId, task:'life'}

    add(item)
    cy.request(`/todos/${randomId}`)
      .its('body')
      .should('deep.eq', item)
  })

  it('deletes an item', () => {
    const id = initialItems[0].id
    cy.request('DELETE', `/todos/${id}`)
    getItems()
      .should('have.length', 1)
  })
})
