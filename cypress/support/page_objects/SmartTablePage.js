/// <reference types="cypress" />

export class SmartTable {


  updateAgeByFirstName(name, age) {
    cy.get('tbody').contains('tr', name).then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age)
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).should('contain', age)
    })
  }

  addNewRecordWithFirstAndLastName(firstName, lastName) {
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRowH => {
      cy.wrap(tableRowH).find('[placeholder="First Name"]').type(firstName)
      cy.wrap(tableRowH).find('[placeholder="Last Name"]').type(lastName)
      cy.wrap(tableRowH).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().should('contain', firstName).and('contain', lastName)
  }

  testSearchFunction(arrayOfAges) {
    cy.wrap(arrayOfAges).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each(tableRow => {
        if (age > 200) {
          cy.wrap(tableRow).should('contain', 'No data found')
        } else {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        }
      })

    })

  }
}

export const onSmartTablePage = new SmartTable()