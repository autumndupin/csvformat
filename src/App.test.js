import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { filterByEmailDupes, filterByPhoneDupes, filterByEmailOrPhoneDupes, generateNewCSV} from './helpers'
import FileSaver from 'file-saver';
import App from './App';
import {handleExport} from './App';

const fakeCSV = [
  {"First Name": 'Autumn', "Last Name": 'Test', "Email": 'autumn@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test2', "Email": 'autumn+2@dev.null', "Phone": '444-333-2221'},
  {"First Name": 'Autumn', "Last Name": 'Test3', "Email": 'autumn+3@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test4', "Email": 'autumn+4@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test5', "Email": 'autumn+2@dev.null', "Phone": '333-222-1111'},
  {"First Name": 'Autumn', "Last Name": 'Test6', "Email": 'autumn+4@dev.null', "Phone": '222-111-3333'},
]

const emailResult = [
  {"First Name": 'Autumn', "Last Name": 'Test', "Email": 'autumn@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test2', "Email": 'autumn+2@dev.null', "Phone": '444-333-2221'},
  {"First Name": 'Autumn', "Last Name": 'Test3', "Email": 'autumn+3@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test4', "Email": 'autumn+4@dev.null', "Phone": '333-422-3333'},
]

const phoneResult = [
  {"First Name": 'Autumn', "Last Name": 'Test', "Email": 'autumn@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test2', "Email": 'autumn+2@dev.null', "Phone": '444-333-2221'},
  {"First Name": 'Autumn', "Last Name": 'Test5', "Email": 'autumn+2@dev.null', "Phone": '333-222-1111'},
  {"First Name": 'Autumn', "Last Name": 'Test6', "Email": 'autumn+4@dev.null', "Phone": '222-111-3333'},
]

const emailOrPhoneResult = [
  {"First Name": 'Autumn', "Last Name": 'Test', "Email": 'autumn@dev.null', "Phone": '333-422-3333'},
  {"First Name": 'Autumn', "Last Name": 'Test2', "Email": 'autumn+2@dev.null', "Phone": '444-333-2221'},
]

test('renders csv import input', () => {
  render(<App />)
  const input = screen.getByTestId('csv-input')
  expect(input).toBeVisible()
});

test('renders dupe filter option select', () => {
  render(<App />)
  const selector = screen.getByTestId('option-select')
  expect(selector).toBeVisible()
});

test('renders csv import submit', () => {
  render(<App />)
  const submit = screen.getByTestId('csv-submit')
  expect(submit).toBeVisible()
});

test('selects dupe filter option', () => {
  render(<App />)


  const selector = screen.getByTestId('option-select');

  expect((screen.getByText('Remove duplicate rows by email')).selected).toBeTruthy();

  //trigger a select on phone
  userEvent.selectOptions(selector, 'phone');

  expect((screen.getByText('Remove duplicate rows by phone')).selected).toBeTruthy();
  expect((screen.queryByText('Remove duplicate rows by email')).selected).toBeFalsy();
  expect((screen.queryByText('Remove duplicate rows by email or phone')).selected).toBeFalsy();

});

test('import csv file', () => {
  const file = new File(fakeCSV, 'fake.csv', {type: '.csv'})

  render(<App />)
  const input = screen.getByTestId('csv-input')
  userEvent.upload(input, file)

  expect(input.files[0]).toStrictEqual(file)
  expect(input.files.item(0)).toStrictEqual(file)
  expect(input.files).toHaveLength(1)
})


test('removes duplicates by email', () => {
  const filteredRows = filterByEmailDupes(fakeCSV)
  expect(filteredRows.length).toEqual(emailResult.length)
})

test('removes duplicates by phone', () => {
  const filteredRows = filterByPhoneDupes(fakeCSV)
  expect(filteredRows.length).toEqual(phoneResult.length)
})

test('removes duplicates by email or phone', () => {
  const filteredRows = filterByEmailOrPhoneDupes(fakeCSV)
  expect(filteredRows.length).toEqual(emailOrPhoneResult.length)
})

test('generates new csv format with headers', () => {
  const newCSV = generateNewCSV(fakeCSV)
  expect(newCSV).toContain('First Name,Last Name,Email,Phone')
})