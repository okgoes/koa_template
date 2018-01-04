const officegen = require('officegen');

class Office {
    constructor() {
        this.docx = officegen('docx');
        this.pptx = officegen('pptx');
        this.xlsx = officegen ( 'xlsx' );
    }

    buildWord() {
        this.docx.startNewDoc();
        this.docx.setDocSub
    }

    // buildWord() {
    //     var docx = officegen ({
    //         'type': 'docx',
    //         'subject': '...',
    //         'keywords': '...',
    //         'description': '...'
    //     });
        
    //     // or
    //     this.docx.set
    //     docx.setDocSubject ( '...' );
    //     docx.setDocKeywords ( '...' );
    //     docx.setDescription ( '...' );
    // }
}