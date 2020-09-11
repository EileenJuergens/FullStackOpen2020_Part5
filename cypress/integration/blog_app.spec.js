describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('LOGIN')
  })

  it('login form is shown', function () {
    cy.contains('Username')
    cy.contains('Password')
  })

  it('login form can be opened', function () {
    cy.contains('LOGIN').click()
  })
})

describe('Login', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('Unknown')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#username').type('Cassy')
    cy.get('#password').type('test123')
    cy.get('#login-button').click()

    cy.contains('Cassandra Sloan is logged in')
  })
})
