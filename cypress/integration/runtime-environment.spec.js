describe('runtime environment', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should have runtime configuration', () => {
        cy.get('#environment').then(environmentElement => {
            cy.wrap(JSON.parse(environmentElement[0].innerText)).should('deep.equal', {
                production: true,
                foo: 'baz'
            });
        });
    });
});