describe('Authentication', () => {
  beforeEach(() => {
    cy.exec('npx prisma migrate reset --force');
    cy.exec('npx prisma db seed');
  });

  it('should login and redirect to dashboard', () => {
    cy.visit('/login');
    
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Test@1234');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Smart Home Dashboard').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.visit('/login');
    
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.contains('Invalid email or password').should('be.visible');
  });
});