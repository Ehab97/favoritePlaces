import * as SQLite from 'expo-sqlite'
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Updates } from 'expo';

const DEBUG = true;
const DB_NAME = 'places.db';
const SQLITE_DIRECTORY = `${FileSystem.documentDirectory}SQLite`;
const LOCAL_SQLITE_DB = `${SQLITE_DIRECTORY}/${DB_NAME}`;
const SOURCE_DB_ASSET = require(`./assets/db/${DB_NAME}`);
const db = SQLite.openDatabase("places.db");

export const init = () => {
  console.log("init");
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL, 
            title TEXT NOT NULL, 
            imageUri TEXT NOT NULL, 
            address TEXT NOT NULL, 
            lat REAL NOT NULL, 
            lng REAL NOT NULL
            );`,
        [],
        () => {
          console.log("init");
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place) => {
  console.log("insertPlace", place);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri ?? "https://picsum.photos/200/300",
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  console.log("fetchPlaces");
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          console.log("fetchPlaces", result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
