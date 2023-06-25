import * as SQLLite from "expo-sqlite";
import Place from "../Modles/Place";

const db = SQLLite.openDatabase("places.db");

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
  let imageUri = place.imageUri ?? "https://picsum.photos/200/300";

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [place.title, imageUri, place.address, place.location.lat, place.location.lng],
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
          const places = [];
          const len = result.rows.length;
          for (let i = 0; i < len; i++) {
            let place = result.rows.item(i);
            // console.log("place :" + i, place.address, place.lat, place.lng, place.title, place.imageUri);
            places.push(
              new Place(
                place.title,
                place.imageUri,
                {
                  address: place.address,
                  lat: place.lat,
                  lng: place.lng,
                },
                place.id.toString()
              )
            );
          }
          // console.log("fetchPlaces", places);
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
