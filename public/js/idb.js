// create a variable to hold db connection
let db;
// open a connection to the IndexedDB database called 'budget'
// and set it to the version 1
const indexexDB = window.indexedDB;
const request = indexexDB.open("budget", 1);

// this event will emit if the database version changes
// non existant to version 1, v1 to v2, etc...
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called 'new_record',
  // set it to have an auto incrementing primary key of sorts
  db.createObjectStore("new_record", { autoIncrement: true });
};

// upon a successful
request.onsuccess = function (event) {
  // when db is successfully created with its object store
  // from onupgradedneeded event above or simply established
  // a connection, save reference to db in global variable
  db = event.target.result;
  // check if app is online, if yes run uploadPizza()
  // function to send all local db data to api
  if (navigator.onLine) {
    saveRecord();
  }
};

request.onerror = function (event) {
  // log error
  console.log(event.target.errorCode);
};

// this function will execute if attempt to submit a new record
// and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the db with read and write permission
  const transaction = db.transaction(["new_record"], "readwrite");
  // access the object store for "new_record"
  const recordObjectStore = transaction.createObjectStore("new_record");
  // add record to your store with add method
  recordObjectStore.add(record);
}

// when the internet connection is restored
// the saved data in indexedDB will be posted to mongoDB
function uploadRecord() {
  // open a transaction on your db
  const transaction = db.transaction(["new_record"], "readwrite");
  // access the browser object storage
  const recordObjectStore = transaction.createObjectStore("new_record");
  // get all records from the store and set to a variable
  const getAll = recordObjectStore.getAll();
  // upon a successful .getAll, run this function
  getAll.onsuccess = function () {
    if (getAll.results.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: `application/json, text/plain, */*`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open on more transaction
          const transaction = db.transaction(["new_record"], "readwrite");
          // access the new_record object store
          const recordObjectStore = transaction.objectStore("new_record");
          // clear all items in your store
          recordObjectStore.clear();
          alert("All saved records have been submitted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

// event listener for internet connectivity,
// activate when connecting back online
window.addEventListener("online", uploadRecord);
