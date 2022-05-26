export function transformData(parsedCSV, option) {
  console.log(parsedCSV)
  filterByEmailDupes(parsedCSV)
}

const filterByEmailDupes = (parsedCSV) => {
  const filteredRows = parsedCSV.filter((row, index, array) => array.findIndex(r => r.Email === row.Email) === index);
  console.log(filteredRows)
  return filteredRows
}

const filterByPhoneDupes = (parsedCSV) => {
  const filteredRows = parsedCSV.filter((row, index, array) => array.findIndex(r => r.Phone === row.Phone) === index);
  console.log(filteredRows)
}

const filterByEmailOrPhoneDupes = (parsedCSV) => {
  const filteredRows = parsedCSV.filter((row, index, array) => array.findIndex(r => r.Email === row.Email || r.Phone === row.Phone) === index);
  console.log(filteredRows)
}