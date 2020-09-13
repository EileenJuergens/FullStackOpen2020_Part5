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

  describe('Login', function () {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('Unknown')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })

    it('succeeds with correct credentials', function () {
      cy.contains('LOGIN').click()
      cy.get('#username').type('Cassy')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Cassy')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('Test url')
      cy.contains('CREATE').click()
      cy.contains('Test title')
    })
  })
})
