// this function will check if menu is opened or not and will click accordingly

const selectGroupMenuItem = (groupName) => {
  cy.contains('a', groupName).then(menu => {
    cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
      if (attr.includes('left')) {
        cy.wrap(menu).click()
      }
    })
  })
}
export class NavigationPage {
  anyPage(firstMenuItem, secondMenuItem) {
    selectGroupMenuItem(firstMenuItem)
    cy.contains(secondMenuItem).click();
  }
}

export const navigateTo = new NavigationPage();