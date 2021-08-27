/// <reference types="cypress" />

import { onDatepickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/SmartTablePage"

describe('Test with Page Objects', () => {

  beforeEach('open application', () => {
    cy.openHomePage()
  })

  it('verify navigation across pages', () => {
    navigateTo.anyPage('Form', 'Form Layouts');
    navigateTo.anyPage('Form', 'Datepicker');
    navigateTo.anyPage('Modal & Overlays', 'Toastr');
  })

  it.only('submit inline and basic form and select tomorrow date and select date range', () => {
    navigateTo.anyPage('Form', 'Form Layouts')
    onFormLayoutsPage.submitInlineForm('Sayf', 'test@test.com')
    onFormLayoutsPage.submitBasicForm('test@test.com', '12345567')
    navigateTo.anyPage('Form', 'Datepicker')
    onDatepickerPage.selectDateFromToday(1)
    onDatepickerPage.selectDateRangeFromToday(7, 10)
    navigateTo.anyPage('Tables & Data', 'Smart Table')
    onSmartTablePage.addNewRecordWithFirstAndLastName('Sayf', 'Abbas')
    onSmartTablePage.updateAgeByFirstName('Larry', 46)
    onSmartTablePage.testSearchFunction([20, 30, 300])
  })
})