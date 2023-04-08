const dbPromise = openDB("my-database", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("my-store")) {
      db.createObjectStore("my-store", { keyPath: "id" });
    }
  },
});

export default dbPromise;
