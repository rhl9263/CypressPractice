import homePagePO from "../pageobject/homePagePO";
import * as data from "../fixtures/data.json";

describe("Dynamic HTML TABLE Tag", () => {
    // Testing the dynamic creation of a table using cypress.
     beforeEach(() => {
        // Navigate to the target URL
        cy.visit("/dynamic-table.html");
    });

    it('TS01: verify that home page should have the title as Dynamic HTML TABLE Tag page ', () => {
        homePagePO.label_Header().contains("Dynamic HTML TABLE Tag", { setTimeout: 5000 });
    })

    it('TS02: verify that home page should have the paragraph statement ', () => {
        homePagePO.label_Paragraph().contains("An example of an HTML Table populated by JavaScript", { setTimeout: 5000 });
    })

    it('TS03: verify that home page should have the caption Dynamic table ', () => {
        homePagePO.label_Caption().contains("Dynamic Table", { setTimeout: 5000 });
    })

    it('TS04: verify that home page should have the navigation bar with text "Index", "Page" and "About" ', () => {
        homePagePO.label_Navigation().contains("Index", { setTimeout: 5000 });
        homePagePO.label_Navigation().contains("About", { setTimeout: 5000 });
        homePagePO.label_Navigation().contains("Page", { setTimeout: 5000 });
    })

    it('TS05: verify that home page should have the navigation bar with "Index" and "About" hyperlink', () => {
        //for index href
        // Use Cypress selectors to find the anchor element and check its href attribute
        homePagePO.label_Navigation().find('a').should('have.attr', 'href', '../index.html');
        // for about href
        cy.get('[href="../page?app=dynamictableexample&t=About"]')
    })

    it('TS06: verify that home page should have the text "table data" ', () => {
        homePagePO.marker_Summary().contains("Table Data", { setTimeout: 5000 });
    })

    it('TS07: verify that table data button present in home page can be clicked', () => {
        cy.get('summary', { SetTimeout: 5000 }).click();
    })

    it('TS08: verify that table data already present in homepage has mentioned JSON data', () => {
        cy.get('summary', { setTimeout: 5000 }).click();
        const expectedDataAsString = '[{"name": "Bob", "age": 20}, {"name": "George", "age": 42}]';
        // Use Cypress selectors to find the textarea and assert its value
        cy.get('#jsondata').invoke('val').then((actualDataAsString) => {
            const expectedData = JSON.parse(expectedDataAsString);
            const actualData = JSON.parse(actualDataAsString);
            expect(actualData).to.deep.equal(expectedData);
        });
    });

    it('TS09: verify that home page should have the text "Caption" and "Id" ', () => {
        cy.get('summary', { setTimeout: 5000 }).click();
        cy.get('details > div > :nth-child(2)').contains("Caption", { setTimeout: 5000 });
        cy.get('details > div > :nth-child(3)').contains("Id", { setTimeout: 5000 });

    });

    it('TS10: verify that user can insert the new data in text field and click refresh button', () => {
        cy.get('summary', { setTimeout: 5000 }).click();
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

    it("TS11: Verify that the data in populated table and stored data is same", () => {
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
        homePagePO.label_Textfield().clear().type(newDataAsString, { parseSpecialCharSequences: false });
        homePagePO.button_Refresh().click();
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
                for (let j = 0; j < 3; j++) {
                    if (extractedData[i + 1][j] != newData[i][j]) {
                        count = 1;
                    }
                }
            }
            cy.wrap(count).should('eq', 0);
        });
    })
});