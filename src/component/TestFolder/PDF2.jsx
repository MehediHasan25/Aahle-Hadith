import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PDF2 = () => {
  const [val, setVal] = useState("Hello");
  const [nameFile, setNameFile] = useState("myFile")

  const handleClick = () => {
    const doc = new jsPDF();

    // Custom PDF content
    // doc.setFontSize(20);
    // doc.text(20, 20, 'Table Data:');
    // doc.setFontSize(12);

    doc.setFontSize(10);
    doc.text(10, 20, `Text Data: ${val}`);
    doc.text(50, 20, `Text Data1: ${val}`);
    // doc.setFontSize(12);
    doc.text(20, 30, 'This is some text data that will be included in the PDF.');

    // doc.setFontSize(20);
    doc.text(20, 40, 'Table Data:');


    // Table data
    const tableData = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 40 },
    ];

    // Table columns
    const tableColumns = ["SL", 'Name', 'Age'];

    // Table options
    const tableOptions = {
      startY: 80,
    };

    // Generate table data
    const tableRows = tableData.map((row, index) => [index + 1, row.name, row.age]);

    // Generate table
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: tableOptions.startY,
    });

    // Save the PDF
    doc.save(`${nameFile}.pdf`);
  };


  return (
    <div>
      <button onClick={handleClick}>Convert and Download PDF</button>
    </div>
  );

}

export default PDF2;
