// import { openDB } from 'idb';
// import { header } from './header';

// const initdb = async () =>
//   openDB('jate', 1, {
//     async upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       const store = db.createObjectStore('jate', { keyPath: 'id' });
//       console.log('jate database created');

//       // Initialize the store with an header content for key 1
//       await store.add({ id: 1, contents: header });
//     },
//   });



// // TODO: Add logic to a method that accepts some content and adds it to the database
// // export const putDb = async (content) => console.error('putDb not implemented');

// export const putDb = async (content) => {
//   console.log('PUT to the database');
//   const todosDb = await openDB('jate', 1);
//   const tx = todosDb.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   const request = store.put({ id: 1, contents: content });
//   const result = await request;
//   console.log('🚀 - data saved to the database', result);
// };






// // TODO: Add logic for a method that gets all the content from the database
// // export const getDb = async () => console.error('getDb not implemented');


// export const getDb = async () => {
//   console.log('GET from the database');
//   const todosDb = await openDB('jate', 1);
//   const tx = todosDb.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   const request = store.get(1);
//   const result = await request;
//   console.log('results: ', result);
  
//   return result?.contents;
// };



// initdb();
















// import { openDB } from 'idb';
// import { header } from './header';

// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate');
//       console.log('jate database created');
//     },
//   });

// export const putDb = async (content) => {
//   console.log('PUT to the database');
//   const todosDb = await openDB('jate', 1);
//   const tx = todosDb.transaction('jate', 'readwrite');
//   const store = tx.objectStore('jate');
//   const request = store.put(content, 1);
//   const result = await request;
//   console.log('🚀 - data saved to the database', result);
// };

// export const getDb = async () => {
//   console.log('GET from the database');
//   const todosDb = await openDB('jate', 1);
//   const tx = todosDb.transaction('jate', 'readonly');
//   const store = tx.objectStore('jate');
//   const request = store.get(1);
//   const result = await request;
//   console.log('results: ', result);

//   return result;
// };

// initdb().then(async () => {
//   // Initialize with the header content
//   const currentContent = await getDb();
//   if (!currentContent) {
//     putDb(header);
//   }
// });

import { openDB } from 'idb';
import { header } from './header';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        db.createObjectStore('jate');
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });

  // Check if key 1 is empty, and if so, add the header content
  const currentContent = await db.get('jate', 1);
  if (!currentContent) {
    await db.put('jate', header, 1);
    console.log('Header content added to key 1');
  } else {
    console.log('Key 1 is not empty');
  }

  return db;
};

const dbPromise = initdb();

export const putDb = async (content) => {
  console.log('PUT to the database');
  const db = await dbPromise;
  await db.put('jate', content, 1);
  console.log('Content saved to key 1');
};

export const getDb = async () => {
  console.log('GET from the database');
  const db = await dbPromise;
  const result = await db.get('jate', 1);
  console.log('Retrieved content from key 1:', result);
  return result;
};
