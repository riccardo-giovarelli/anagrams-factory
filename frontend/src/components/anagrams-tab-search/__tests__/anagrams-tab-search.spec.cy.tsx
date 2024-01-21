import AnagramsTabSearch from '../anagrams-tab-search';

it('mounts', () => {
  cy.mount(<AnagramsTabSearch />);
  cy.get('[data-cy=original-text]').should('have.text', '');
});
