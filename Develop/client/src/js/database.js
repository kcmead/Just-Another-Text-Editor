// Import the openDB function from the 'idb' library for IndexedDB operations
import { openDB } from "idb";

// Initialize the IndexedDB database for the 'jate' application
const initdb = async () =>
  openDB("jate", 1, {
    // Upgrade function for handling database version changes
    upgrade(db) {
      // Check if the object store 'jate' already exists in the database
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create a new object store 'jate' with auto-incrementing keys
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  // Open the 'jate' database with version 1
  const jateDB = await openDB("jate", 1);
  // Start a new read-write transaction on the 'jate' object store
  const tx = jateDB.transaction("jate", "readwrite");
  // Access the 'jate' object store
  const store = tx.objectStore("jate");
  // Put the content into the object store with an auto-incremented key
  const request = store.put({ value: content });
  // Wait for the operation to complete and log the result
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

export const getDb = async () => {
  // Open the 'jate' database with version 1
  const jateDB = await openDB("jate", 1);
  // Start a new read-only transaction on the 'jate' object store
  const tx = jateDB.transaction("jate", "readonly");
  // Access the 'jate' object store
  const store = tx.objectStore("jate");
  // Retrieve all records from the object store
  const request = store.getAll();
  // Wait for the operation to complete, log the result, and return the data
  const result = await request;
  console.log("🚀 - data read from database", result);
  return result.value;
};

// Initialize the 'jate' database when the module is imported
initdb();
