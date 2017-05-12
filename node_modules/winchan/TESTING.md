## Things to test

1. basic operation: window opens and closes upon click, returning expected value
2. double open: open, close, re-open in the same session
3. timing: perform basic operational test many many times with reloads between
4. explicit dialog close: closing dialog with key combo or X should return error to caller
5. caller close while dialog open: closing the opener should close the window
6. exceptional code: when possible, client code that throws an exception should cause error return
