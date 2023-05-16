import fs from 'fs';
import Docxtemplater from 'docxtemplater';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Load the pdfmake fonts
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export function convertDocxToPdf(docxFilePath: string, outputPdfFilePath: string) {
    try {
        // Read the docx file
        const docxFileContent = fs.readFileSync(docxFilePath, 'binary');

        // Load the docx file into a Docxtemplater instance
        const doc = new Docxtemplater();
        doc.loadZip(docxFileContent);

        // Render the document
        doc.render();

        // Get the rendered document as a buffer
        const renderedDocBuffer = doc.getZip().generate({ type: 'nodebuffer' });

        // Convert the rendered document buffer to PDF
        const pdfDocGenerator = pdfMake.createPdf(renderedDocBuffer);

        // Generate the PDF file and save it to the output path
        pdfDocGenerator.getBuffer((buffer: any) => {
            fs.writeFileSync(outputPdfFilePath, buffer);
        });

        console.log('Conversion successful!');
    } catch (error) {
        console.error('Error converting docx to pdf:', error);
    }
}
