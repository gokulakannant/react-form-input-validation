describe('The Home Page', function() {
    it('Successfull rendering', function() {
      cy.visit('http://localhost:3000/')
    })

    it('Check Submit Button', function() {
        cy.visit('http://localhost:3000/')
        cy.contains('Submit Booking').click()
      });
  });

describe("Test blur events", () => {
    it('Successfull rendering', function() {
        cy.visit('http://localhost:3000/')
    })

    it("Customer Name blur (Text field)", () => {
        cy.get('input[name=customer_name]').focus().blur();
        cy.contains("The Customer Name field is required.")
    });

    it("Phone number blur (Text field)", () => {
        cy.get('input[name=phone_number]').focus().blur();
        cy.contains("The phone number field is required.");
    });

    it("Email address blur (Text field)", () => {
        cy.get('input[name=email_address]').focus().blur();
        cy.contains("The email address field is required.");
    });

    it("Pickup Date blur (Date field)", () => {
        cy.get('input[name=pickup_time]').focus().blur();
        cy.contains("The pickup time field is required.");
    });

    it("Pickup Place blur (Dropdown)", () => {
        cy.get('select[name=pickup_place]').focus().blur();
        cy.contains("The pickup place field is required.");
    });

    it("Drop Place blur (Combo box)", () => {
        cy.get('input[name=dropoff_place]').focus().blur();
        cy.contains("The dropoff place field is required.");
    });

    it("Special instructions blur (Textarea)", () => {
        cy.get('textarea').focus().blur();
        cy.contains("The comments field is required.");
    });
});

describe("Test change event", () => {
    it('Successfull rendering', function() {
        cy.visit('http://localhost:3000/')
    });

    it("Customer Name change event (Text field)", () => {
        cy.get('input[name=customer_name]').focus().blur();
        cy.get('input[name=customer_name]').type("gokulakannan").blur();
        cy.contains("The Customer Name field is required.").should('not.exist');
    });

    it("Phone number change (Text field)", () => {
        cy.get('input[name=phone_number]').focus().blur();
        cy.get('input[name=phone_number]').type(9876543210).blur();
        cy.contains("The phone number field is required.").should('not.exist');
    });

    it("Email address blur (Text field)", () => {
        cy.get('input[name=email_address]').focus().blur();
        cy.get('input[name=email_address]').type("gokulakannanthangaraji@gmail.com").blur();
        cy.contains("The email address field is required.").should('not.exist');
    });

    it("Pickup Date blur (Date field)", () => {
        cy.get('input[name=pickup_time]').focus().blur();
        cy.get('input[name=pickup_time]').type("2019-11-27").blur();
        cy.contains("The pickup time field is required.").should('not.exist');
    });

    it("Pickup Place blur (Dropdown)", () => {
        cy.get('select[name=pickup_place]').focus().blur();
        cy.get('select[name=pickup_place]').select('town_hall');
        // cy.contains("The pickup place field is required.").should('not.exist');
    });

    it("Drop Place blur (Combo box)", () => {
        cy.get('input[name=dropoff_place]').focus().blur();
        cy.get('input[name=dropoff_place]').type("Airport").blur();
        cy.contains("The dropoff place field is required.").should('not.exist');
    });

    it("Special instructions blur (Textarea)", () => {
        cy.get('textarea').focus().blur();
        cy.get('textarea').type("Use react form input validator for testing").blur();
        cy.contains("The comments field is required.").should('not.exist');
    });
});

describe("Fill form fields", () => {
    it('Successfull rendering', function() {
        cy.visit('http://localhost:3000/')
    });

    it("Type customer name (Text field)", () => {
        cy.get('input[name=customer_name]').type("gokulakannan").blur();
    });

    it("Type phone number (Text field)", () => {
        cy.get('input[name=phone_number]').type(9876543210).blur();
    });

    it("Type email address (Text field)", () => {
        cy.get('input[name=email_address]').type("gokulakannanthangaraji@gmail.com").blur();
    });

    it("Select Taxi (Radio button)", () => {
        cy.get('[type="radio"]').first().check()
    });

    it("Check extras (Checkbox)", () => {
        cy.get('[type="checkbox"]').check(['baby', 'wheelchair'])
    });

    it("Select pickup Date (Date field)", () => {
        cy.get('input[name=pickup_time]').type("2019-11-27").blur();
    });

    it("Select pickup Place (Dropdown)", () => {
        cy.get('select[name=pickup_place]').select('town_hall')
    });

    it("Choose drop Place (Combo box)", () => {
        cy.get('input[name=dropoff_place]').type("Airport").blur();
    });

    it("Type Special instructions (Textarea)", () => {
        cy.get('textarea').type("Use react form input validator for testing").blur();
        cy.contains("The comments field is required.").should('not.exist');
    });
});

describe("Test validation rules in form fields", () => {
    beforeEach("Render home page", () => {
        cy.visit('http://localhost:3000/');
    })
    describe("Customer name (required)", () => {
        it("Empty fields should display error message", () => {
            cy.get('input[name=customer_name]').focus().blur();
            cy.contains("The Customer Name field is required.");
        });

        it("Valid data should not display error message", () => {
            cy.get('input[name=customer_name]').focus().blur();
            cy.get('input[name=customer_name]').type("gokulakannan").blur();
            cy.contains("The Customer Name field is required.").should('not.exist');
        });
    });

    describe("Phone number (numeric, min, max)", () => {
        it("Invalid alphabet phone number should display error message", () => {
            cy.get('input[name=phone_number]').type("test").blur();
            cy.contains("The phone number must be a number.");
        });

        it("Min length phone number should display error message", () => {
            cy.get('input[name=phone_number]').type(321).blur();
            cy.contains("The phone number field must be between 10 and 12 digits.");
        });

        it("Max length phone number should display error message", () => {
            cy.get('input[name=phone_number]').type(321).blur();
            cy.contains("The phone number field must be between 10 and 12 digits.");
        });

        it("Valid phone number should not display error message", () => {
            cy.get('input[name=phone_number]').type(9876543210).blur();
            cy.contains("The phone number must be a number.").should('not.exist');
        });
    });

    describe("Email address (email)", () => {
        it("Invalid email address should display error message", () => {
            cy.get('input[name=email_address]').type("test").blur();
            cy.contains("The email address format is invalid.");
        });

        it("Valid email address should not display error message", () => {
            cy.get('input[name=email_address]').type("gokulakannanthangaraji@gmail.com").blur();
            cy.contains("The email address format is invalid.").should('not.exist');
        });
    });
})
