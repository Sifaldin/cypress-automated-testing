const selectDateFromCurrent = (day) => {
  let date = new Date()
  date.setDate(date.getDate() + day)
  let futureDay = date.getDate()
  let futureMonth = date.toLocaleString('default', { month: 'short' })
  let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`

  cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
    if (!dateAttribute.includes(futureMonth)) {
      cy.get('[data-name="chevron-right"]').click()
      selectDateFromCurrent(day)
    } else {
      cy.get('.day-cell')
        .not('.bounding-month').contains(futureDay).click()
    }
  })

  return dateAssert
}

export class DatePickerPage {
  selectDateFromToday(day) {
    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        let dateAssert = selectDateFromCurrent(day);
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      })
  }

  selectDateRangeFromToday(firstDay, secondDay) {
    cy.contains('nb-card', 'Datepicker With Range')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        let dateAssertFirst = selectDateFromCurrent(firstDay);
        let dateAssertsecond = selectDateFromCurrent(secondDay);
        const finalDate = `${dateAssertFirst} - ${dateAssertsecond}`
        cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
        cy.wrap(input).should('have.value', finalDate)
      })
  }
}

export const onDatepickerPage = new DatePickerPage()