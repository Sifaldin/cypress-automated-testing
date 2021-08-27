/// <reference types="cypress"/>

describe('our first test', () => {
  it('first test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    //by tag name
    cy.get('input');

    //by class
    cy.get('.input-full-width');

    //by id
    cy.get('#inputEmail1');

    //by attribute name
    cy.get('[placeholder]')

    //by attribute name and value
    cy.get('[placeholder="Email"]')

    //by two differetn attributes
    cy.get('[placeholder="Email"][type="email"]')

    //combinations
    cy.get('input[placeholder="Email"]')

    cy.get('input[placeholder]#inputEmail1')

    //most favored way by cypress (custom attribute)
    cy.get('[data-cy="imputEmail1"]')
  })

  it('second test', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[data-cy="testButton"]')

    cy.contains('Sign in')

    cy.contains('[status="primary"]', 'Sign in')

    cy.get('[for="inputEmail3"]')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

    cy.contains('nb-card', 'Horizontal form')
      .find('button')
  })

  it('then and wrap', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
    cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

    // cypress style 

    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      const firstEmailLabel = firstForm.find('[for="inputEmail1"]').text();
      const firstPasswordLabel = firstForm.find('[for="inputPassword2"]').text()

      expect(firstEmailLabel).to.equal('Email')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const secondEmailLabel = secondForm.find('[for="exampleInputEmail1"]').text();
        const secondPasswordLabel = secondForm.find('[for="exampleInputPassword1"]').text();

        expect(secondPasswordLabel).to.equal(firstPasswordLabel)
        cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address');
      })
    })
  })

  it('invoke', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.get('[for="inputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email')
    })

    cy.contains('nb-card', "Basic form")
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      //.should('contain', 'checked')
      .then(classValue => {
        expect(classValue).to.contain('checked');
      })
  })

  //important function inside
  it('invoke datepicker', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Datepicker').click();

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
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
            .contains(futureDay).click()
        }
      })

      return dateAssert
    }

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        let dateAssert = selectDateFromCurrent(300);
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
      })

  })

  it('radioButtons', () => {
    cy.visit('/');
    cy.contains('Forms').click();
    cy.contains('Form Layouts').click();

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .click({ force: true })
        .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({ force: true })
        .should('be.checked');

      cy.wrap(radioButtons)
        .eq(0)
        .should('not.be.checked');

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')
    })
  })

  it('checkBoxes', () => {
    cy.visit('/');
    cy.contains('Modal & Overlays').click();
    cy.contains('Toastr').click();


    cy.get('[type="checkbox"]').check({ force: true })
    cy.get('[type="checkbox"]').eq(2).click({ force: true })
  })

  it('dropList', () => {
    cy.visit('/');

    // 1
    /*   cy.get('nb-select').contains('Light').click();
      cy.get('nb-option').contains('Dark').click();
      cy.get('nb-select').should('contain', 'Dark')
      cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
   */

    cy.get('nav nb-select').then(dropMenu => {
      cy.wrap(dropMenu).click();
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim();
        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click();
        cy.wrap(dropMenu).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

        if (index < 3) {
          cy.wrap(dropMenu).click()
        }

      })
    })
  })


  it('Web tables', () => {

    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click();

    //1 
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
      cy.wrap(tableRow).find('.nb-checkmark').click()
      cy.wrap(tableRow).should('contain', '25')
    })

    //2 
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRowH => {
      cy.wrap(tableRowH).find('[placeholder="First Name"]').type('Sayf')
      cy.wrap(tableRowH).find('[placeholder="Last Name"]').type('Abbas')
      cy.wrap(tableRowH).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().should('contain', 'Sayf')

    //3
    const age = [20, 30, 40, 200]
    cy.wrap(age).each(age => {

      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each(tableRow => {

        if (age == 200) {
          cy.wrap(tableRow).should('contain', 'No data found')
        } else {

          cy.wrap(tableRow).find('td').eq(6).should('contain', age)

        }
      })

    })





  })

})