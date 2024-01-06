describe("Dynamic HTML TABLE Tag", () => {
    // Testing the dynamic creation of a table using cypress.

    it('TS01: verify that it should navigate to the Dynamic HTML TABLE Tag page ', () => {
      // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html', { setTimeout: 5000 });

    })

    it('TS02: verify that it should have the title as Dynamic HTML TABLE Tag page ', () => {
        // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
        cy.get('h1').contains("Dynamic HTML TABLE Tag", { setTimeout: 5000 });

    })

    it('TS03: verify that it should have the paragraph statement ', () => {
         // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
        cy.get('.explanation > p').contains("An example of an HTML Table populated by JavaScript", { setTimeout: 5000 });

    })

    it('TS04: verify that it should have the caption Dynamic table ', () => {
     // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
        cy.get('caption').contains("Dynamic Table", { setTimeout: 5000 });

    })

    it('TS05: verify that it should have the navigation bar with Index Page About text', () => {
        // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
        cy.get('.navigation').contains("Index", { setTimeout: 5000 });
        
        cy.get('.navigation').contains("About", { setTimeout: 5000 });
        
        cy.get('.navigation').contains("Page", { setTimeout: 5000 });

    })

    it('TS06: verify that it should have the navigation bar with Index and About hyperlink', () => {
          // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        //for index href
        const navigationSelector1 = '.page-navigation';
        const expectedHref1 = '../index.html';

        // Use Cypress selectors to find the anchor element and check its href attribute
        cy.get(navigationSelector1).find('a').should('have.attr', 'href', expectedHref1);
        // for about href
        cy.get('[href="../page?app=dynamictableexample&t=About"]')

    })

    it('TS07: verify that it should have the text table data ', () => {
         // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
        cy.get('summary').contains("Table Data", { setTimeout: 5000 });

    })

    it('TS08: verify that table data button can be clicked', () => {
         // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        
        cy.get('summary', { SetTimeout: 5000 }).click();
    })

    it('TS09: verify that table JSON data', () => {
           // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        cy.get('summary', { setTimeout: 5000 }).click();

        const expectedDataAsString = '[{"name": "Bob", "age": 20}, {"name": "George", "age": 42}]';
        // Use Cypress selectors to find the textarea and assert its value
        cy.get('#jsondata').invoke('val').then((actualDataAsString) => {
            const expectedData = JSON.parse(expectedDataAsString);
            const actualData = JSON.parse(actualDataAsString);
            expect(actualData).to.deep.equal(expectedData);
        });
    });

    it('TS10: verify that it should have the text Caption and Id ', () => {
          // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        cy.get('summary', { setTimeout: 5000 }).click();
        cy.get('details > div > :nth-child(2)').contains("Caption", { setTimeout: 5000 });
        cy.get('details > div > :nth-child(3)').contains("Id", { setTimeout: 5000 });

    });

    it('TS11: verify that we can insert the new data and click refresh button', () => {
            // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        cy.contains('Table Data', { setTimeout: 5000 }).click();

        const newData = [
            { "name": "Bob", "age": 20, "gender": "male" },
            { "name": "George", "age": 42, "gender": "male" },
            { "name": "Sara", "age": 42, "gender": "female" },
            { "name": "Conor", "age": 40, "gender": "male" },
            { "name": "Jennifer", "age": 42, "gender": "female" }
        ];

        // Convert the new JSON data to a string
        const newDataAsString = JSON.stringify(newData, { setTimeout: 5000 });


        // Use Cypress selectors to find the textarea, clear existing data, and type the new JSON data
        cy.get('#jsondata').clear().type(newDataAsString, { parseSpecialCharSequences: false });
        cy.get('#refreshtable').click();
    });

    it("TS12: Verify that the populated table is same with the stored data ", () => {
        // Open the website
        cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        cy.contains('Table Data', { setTimeout: 5000 }).click();

        const newData = [
            { "name": "Bob", "age": 20, "gender": "male" },
            { "name": "George", "age": 42, "gender": "male" },
            { "name": "Sara", "age": 42, "gender": "female" },
            { "name": "Conor", "age": 40, "gender": "male" },
            { "name": "Jennifer", "age": 42, "gender": "female" }
        ];

        // Convert the new JSON data to a string
        const newDataAsString = JSON.stringify(newData, { setTimeout: 5000 });


        // Use Cypress selectors to find the textarea, clear existing data, and type the new JSON data
        cy.get('#jsondata').clear().type(newDataAsString, { parseSpecialCharSequences: false });
        cy.get('#refreshtable').click();

        const expectedDataAsString = '[{"name" : "Bob", "age" : 20, "gender": "male"},{"name": "George", "age" : 42, "gender": "male"},{"name": "Sara", "age" : 42, "gender": "female"},{"name": "Conor", "age" : 40, "gender": "male"},{"name": "Jennifer", "age" : 42, "gender": "female"}]';
        // check existing data is same to the uploaded data not required for this test.
        cy.get('#jsondata').invoke('val').then((actualDataAsString) => {
            const expectedData = JSON.parse(expectedDataAsString);
            const actualData = JSON.parse(actualDataAsString);
            expect(actualData).to.deep.equal(expectedData);
        });
        let extractedData = [];
        let count = 0;
        cy.get('#dynamictable tr').each(($row) => {
            const name = $row.find('td').eq(0).text();
            const age = $row.find('td').eq(1).text();
            const gender = $row.find('td').eq(2).text();

            // Create an object and push it to the array
            extractedData.push({ name, age, gender });
        }).then(() => {
            // Log or assert the extracted data
            console.log('Extracted Data:', extractedData);
           
            // matching of data from array of objects
            for (let i = 0; i < newData.length; i++) {
                for (let j = 0; j < 3; j++){
                    if (extractedData[i + 1][j] != newData[i][j]) {
                        count = 1; 
                    }
                }
            }
            cy.wrap(count).should('eq', 0);

        });
    })
});