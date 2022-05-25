## Problem: 

Need to take an imported CSV, identify, and remove duplicate rows

Duplicate rows either
1. have the same email address
2. have the same phone number

Be able to run this program by: 
- duplicate emails **only**
- duplicate phone numbers **only**
- duplicate emails **or** phone numbers

**Input:** CSV with header [ “First Name”, “Last Name”, “Email”, “Phone” ]
_note:_ values of some columns may be missing

**Output:** CSV with duplicate rows remove based on email/phone specification

_Edge cases:_
- column_ values may be missing
- handle unexpected CSV inputs gracefully

_Testing:_
- remember to cover 

### TODOS: 

Part 1: 
- Create CSV uploader for user
- On submit, send CSV to server to read/parse
- Identify duplicates
   - Start with email 
- Remove the duplicate row
- Send the data back in a new CSV 
- Allow user to see/download CSV 

Part 2:
- Allow user to choose filter specification  
   - email only
   - phone only
   - email or phone 
- Send specification to server
- Create filter functions for each specification
- Remove duplicate according to specification
- Send the data back in a new CSV
- Allow user to see/download CSV 

Part 3: 
- Write tests