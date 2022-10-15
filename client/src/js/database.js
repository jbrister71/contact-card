import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () => {
    openDB('contact_db', 1, {
        upgrade(db) {
            if(db.objectStoreNames.contains('contacts')) {
                console.log('contacts store already exists');
                return;
            }
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true});
            console.log('contacts store created');
        }
    })
}