// Note: file for test something

// @ts-expect-error TS(2705): An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
async function run() {
  // contains your code here
}

// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
run().then(() => process.exit(0))
