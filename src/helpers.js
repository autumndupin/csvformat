import Papa from 'papaparse';

// takes in a parsed CSV file (array of objects) and returns new CSV without duplicate rows
export function transformData(parsedCSV, option) {
  let filteredRows = []

  if (option === "email") {

    filteredRows = filterByEmailDupes(parsedCSV)
    const transformedData = generateNewCSV(filteredRows) 
    return transformedData

  } else if (option === "phone") {

    filteredRows = filterByPhoneDupes(parsedCSV)
    const transformedData = generateNewCSV(filteredRows) 
    return transformedData

  } else if (option === "emailOrPhone") {

    filteredRows = filterByEmailOrPhoneDupes(parsedCSV)
    const transformedData = generateNewCSV(filteredRows) 
    return transformedData

  }
}

// takes in a parsed CSV file (array of objects) and returns only unique rows filtered by email
const filterByEmailDupes = (parsedCSV) => {
  const filteredRows = parsedCSV.filter((row, index, array) => array.findIndex(r => r.Email === row.Email) === index);
  console.log(filteredRows)
  return filteredRows
}

// takes in a parsed CSV file (array of objects) and returns only unique rows filtered by phone
const filterByPhoneDupes = (parsedCSV) => {
  const filteredRows = parsedCSV.filter((row, index, array) => array.findIndex(r => r.Phone === row.Phone) === index);
  console.log(filteredRows)
}

// takes in a parsed CSV file (array of objects) and returns only unique rows filtered by email or phone
const filterByEmailOrPhoneDupes = (parsedCSV) => {
  const filteredRows = parsedCSV.filter((row, index, array) => array.findIndex(r => r.Email === row.Email || r.Phone === row.Phone) === index);
  console.log(filteredRows)
}

// takes in a set of filtered rows (array of objects) and returns a new csv file
const generateNewCSV = (filteredRows) => {
  const header = ["First Name", "Last Name", "Email", "Phone"]
  const newCSV = Papa.unparse({
    "fields": header,
    "data": filteredRows
  });

  return newCSV;
}