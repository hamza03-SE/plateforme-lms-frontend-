describe('Page de connexion LMS', () => {

  beforeEach(() => {
    // Ouvre la page de login avant chaque test
    cy.visit('http://localhost:5173/login'); 
  });

  it('Affiche le formulaire de login', () => {
    // Vérifie que le titre "Connexion" est présent
    cy.contains('Connexion').should('exist');

    // Vérifie la présence des champs email et mot de passe
    cy.get('input[placeholder="exemple@gmail.com"]').should('exist');
    cy.get('input[placeholder="********"]').should('exist');

    // Vérifie la présence du bouton submit
    cy.get('button[type="submit"]').should('exist');
  });

  it('Affiche une erreur si les identifiants sont invalides', () => {
    // Saisir des identifiants invalides
    cy.get('input[placeholder="exemple@gmail.com"]').type('wrong@example.com');
    cy.get('input[placeholder="********"]').type('wrongpassword');

    // Cliquer sur le bouton de connexion
    cy.get('button[type="submit"]').click();

    // Vérifie que le message d'erreur apparaît
    cy.contains('Identifiants invalides').should('exist');
  });

  it('Redirige l\'utilisateur ADMIN vers le dashboard', () => {
    // Mock de l'API login pour l'utilisateur ADMIN
    cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
       body: { role: 'ADMIN', token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYW16YWVycmFkaTQzM0BnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NTc3NjYyNzEsImV4cCI6MTc1Nzg1MjY3MX0.k1oBeVelf4w2zXZKHKnHOh8ohbmLypPuaJmyoI3Bb0DiBur9zJXNygKnzdRlwWQMQyJAH5O8W9WLe8NzRJ7Oxg' }   
    }).as('loginRequest');


    // Saisir des identifiants valides
    cy.get('input[placeholder="exemple@gmail.com"]').type('hamzaerradi433@gmail.com');
    cy.get('input[placeholder="********"]').type('Hamza@2003');

    // Cliquer sur le bouton de connexion
    cy.get('button[type="submit"]').click();

    // Attendre la réponse interceptée
    cy.wait('@loginRequest');

    // Vérifie la redirection vers le dashboard ADMIN
    cy.url().should('include', '/admin/dashboard');
  });

});
