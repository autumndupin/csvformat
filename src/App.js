import './App.css';
import React, { useState } from "react";
import Papa from 'papaparse';
import {transformData, handleExport} from './helpers'

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

  const handleOnSubmit = ( ) => {
    const newCSV = transformData(parsedCSV, dupeOption)
    handleExport(newCSV)
  }

  return (
    <div>
      <form>
        <input
            type={"file"}
            data-testid={"csv-input"}
            id={"csv-import"}
            accept={".csv"}
            onChange={handleUpload}
          />
        <select id="dupeSelect" name="dupeOptions" data-testid={"option-select"} onChange={handleSelect}>
          <option value="email">Remove duplicate rows by email</option>
          <option value="phone">Remove duplicate rows by phone</option>
          <option value="emailOrPhone">Remove duplicate rows by email or phone</option>
        </select>
        <button
          data-testid={"csv-submit"}
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
