import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState } from 'react';

const PDFConverter =() => {
  const [val,setVal] = useState("Hello");

  const handleClick = () => {
    const doc = new jsPDF();

    // Custom PDF content
    doc.setFontSize(10);
    doc.text(10, 20, `Text Data: ${val}`);
    doc.text(50, 20, `Text Data1: ${val}`);
    // doc.setFontSize(12);
    doc.text(20, 30, 'This is some text data that will be included in the PDF.');

    // Table data
    const tableData = [
      ['Name', 'Age', "Month"],
      ['John', '25', "Jan"],
      ['Jane', '30', "Feb"],
    ];

    // Table options
    const tableOptions = {
      startY: 40,
    };

    // Generate table
    doc.autoTable({
      head: [tableData[0]],
      body: tableData.slice(1),
      startY: tableOptions.startY,
    });

    // Save the PDF
    doc.save('data.pdf');
  };

  
    return (
      <div>
        <button onClick={handleClick}>Convert and Download PDF</button>
      </div>
    );
}

export default PDFConverter;
