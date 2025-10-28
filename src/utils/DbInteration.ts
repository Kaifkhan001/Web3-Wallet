
let db : IDBDatabase | null = null;

export default async function initDB() : Promise<IDBDatabase>{
   if(db) return db;

   return new Promise((resolve, reject) => {
    const request = indexedDB.open("Secure", 1);

    request.onupgradeneeded = (e) => {
       const database = (e.target as IDBOpenDBRequest).result;
       if(!database.objectStoreNames.contains("vault")){
        database.createObjectStore('vault', { keyPath: 'id' });
       }
    };

    request.onsuccess = (e) => {
       db = (e.target as IDBOpenDBRequest).result;
       resolve(db);
    };

    request.onerror = () => reject(request.error);
   })
}


export async function setItem<T>(id: string, value: T): Promise<void> {
   if(!db) await initDB();
   return new Promise((resolve, reject ) => {
      const tnx = db!.transaction('vault', 'readwrite');
      const req = tnx.objectStore('vault').put({ id, value: JSON.stringify(value) });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(tnx.error);
   });
}

export async function getItem<T>(id: string): Promise<T | null>{
   if(!db) await initDB();

   return new Promise((resolve, reject) => {
      const tnx = db!.transaction('vault', 'readonly');
      const req = tnx.objectStore('vault').get(id);
      
      req.onsuccess = () => {
         if(req.result){
            resolve(JSON.parse(req.result.value));
         }else{
            reject(new Error(`No record found for id: ${id}`))
         }
      }
      req.onerror = () => reject(req.error);
   });
}