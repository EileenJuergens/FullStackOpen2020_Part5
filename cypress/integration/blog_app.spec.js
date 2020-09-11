describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('LOGIN')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
  })

  it('login form can be opened', function() {
    cy.contains('LOGIN').click()
  })

  // it('user can login', function () {
  //   cy.contains('LOGIN').click()

  //   cy.get('#username').type('Cassy')
  //   cy.get('#password').type('test123')
  //   cy.get('#login-button').click()

  //   cy.contains('Cassandra Sloan is logged in')
  // })
})
