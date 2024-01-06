class homePagepo {
    label_Header(){
        return cy.get('h1');
    }
    label_Paragraph(){
        return cy.get('.explanation > p');
    }
    label_Caption(){
        return cy.get('caption');
    }
    label_Navigation(){
        return cy.get('.navigation')

    }
    NavigatorLink_FirstLink(){
        return cy.get('.page-navigation');
    }
    marker_Summary(){
        return cy.get('summary');
    }
    label_Textfield(){
        return cy.get('#jsondata')
    }
    text_Area(){
        return cy.get('#jsondata')
    }
    button_Refresh(){
        return cy.get('#refreshtable')
    }
   
}

export default new homePagepo();