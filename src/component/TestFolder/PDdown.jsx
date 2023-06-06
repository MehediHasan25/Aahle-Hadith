import React from 'react';
import jsPDF from 'jspdf';



const PDdown = () => {
    const GeneratePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
      
        // Sample data with duplicate values
        const data = [
            { name: 'John', age: 25 },
            { name: '', age: 30 },
            { name: 'Mary', age: '' },
            { name: '', age: '' },
        ];
      
        const tableConfig = {
            willDrawCell: data => {
              if (data.cell.raw === '') {
                data.cell.styles.lineWidth = 0; // Set border line width to 0 for empty cells
              }
            },
          };
       
        // Save the PDF
        doc.save('sample.pdf');
      
      }
  return (
    <div>
    <button onClick={GeneratePDF}>Download PDF</button>
  </div>
  )
}

export default PDdown




