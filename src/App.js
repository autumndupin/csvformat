import './App.css';
import React, { useState } from "react";
import Papa from 'papaparse';
import {transformData} from './helpers'

function App() {
  const [parsedCSV, setParsedCSV] = useState(); 

  const handleOnChange = (e) => {
    handleParse(e.target.files[0])
  };

  const handleParse = (file) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setParsedCSV(results.data)
        },
      });
  }

  const handleOnSubmit = (e) => {
    transformData(parsedCSV)
  }

  return (
    <div>
      <form>
      <input
          type={"file"}
          id={"csvImport"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >Import CSV</button>
      </form>
    </div>
  );
}

export default App;
