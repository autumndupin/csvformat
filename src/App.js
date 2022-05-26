import './App.css';
import React, { useState } from "react";
import FileSaver from 'file-saver';
import Papa from 'papaparse';
import {transformData} from './helpers'

function App() {
  const [parsedCSV, setParsedCSV] = useState(); 
  const [dupeOption, setDupeOption] = useState("email");

  const handleUpload = (e) => {
    handleParse(e.target.files[0])
  };

  const handleSelect = (e) => {
    setDupeOption(e.target.value)
  }

  const handleParse = (file) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setParsedCSV(results.data)
        },
      });
  }

  const handleExport = (csv) => {
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(csvData, 'data.csv');
  }

  const handleOnSubmit = (e) => {
    const newCSV = transformData(parsedCSV, dupeOption)
    handleExport(newCSV)
    debugger;
  }

  return (
    <div>
      <form>
        <input
            type={"file"}
            id={"csvImport"}
            accept={".csv"}
            onChange={handleUpload}
          />
        <select id="dupeSelect" name="dupeOptions" onChange={handleSelect}>
          <option value="email">Remove duplicate rows by email</option>
          <option value="phone">Remove duplicate rows by phone</option>
          <option value="emailOrPhone">Remove duplicate rows by email or phone</option>
        </select>
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
          >Import CSV
        </button>
      </form>
    </div>
  );
}

export default App;
