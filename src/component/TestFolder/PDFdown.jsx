import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const PDFdown = () => {
  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Table data
    const tableData = [
      ['Name', 'Email', 'Phone'],
      ['John Doe', 'johndoe@example.com', '1234567890'],
      ['Jane Smith', 'janesmith@example.com', '9876543210'],
      // Add more rows as needed
    ];

    // Add content to the PDF
    doc.autoTable({
      head: [tableData[0]], // Table header row
      body: tableData.slice(1), // Table body rows
    });

    // Save the PDF as a Blob
    const pdfBlob = doc.output('blob');

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'table_data.pdf';

    // Trigger the download
    downloadLink.click();
  };

  return (
    <div>
      <button onClick={generatePDF}>Submit</button>
    </div>
  )
}

export default PDFdown