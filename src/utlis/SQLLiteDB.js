import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Updates } from 'expo';

const DEBUG = true;
const DB_NAME = 'places.db';
const SQLITE_DIRECTORY = `${FileSystem.documentDirectory}SQLite`;
const LOCAL_SQLITE_DB = `${SQLITE_DIRECTORY}/${DB_NAME}`;
const SOURCE_DB_ASSET = require(`./assets/db/${DB_NAME}`);

let db;

const initializeDatabase = async () => {
  try {
    db = SQLite.openDatabase(DB_NAME);
    const dbInfo = await FileSystem.getInfoAsync(LOCAL_SQLITE_DB, { intermediate: true });
    await makeSQLiteDirectoryIfNotExist();
    console.log(dbInfo);
    if (!dbInfo.exists) {
      if (DEBUG) console.log(`Creating DB at path: ${LOCAL_SQLITE_DB}`);
      await FileSystem.downloadAsync(Asset.fromModule(SOURCE_DB_ASSET).uri, LOCAL_SQLITE_DB);
      console.log('Reloading app for database');
      Updates.reload();
    } else {
      console.log(`Using DB found at: ${LOCAL_SQLITE_DB}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const makeSQLiteDirectoryIfNotExist = async () => {
  const { exists } = await FileSystem.getInfoAsync(SQLITE_DIRECTORY);
  if (!exists) {
    await FileSystem.makeDirectoryAsync(SQLITE_DIRECTORY);
    console.log('Created SQLite directory');
  } else {
    console.log('SQLite directory exists');
  }
};

const getTableInfo = async () => {
  try {
    const database = await getDatabaseRef();
    database.transaction((tx) => {
      tx.executeSql('SELECT name FROM sqlite_master WHERE type="table"', [], (_, { rows }) => {
        console.log('-- TABLE INFO --');
        rows._array.forEach((r) => {
          console.log(` Found table: ${r.name}`);
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getNumberOfTables = async () => {
  try {
    const database = await getDatabaseRef();
    database.transaction((tx) => {
      tx.executeSql('SELECT name FROM sqlite_master WHERE type="table"', [], (_, { rows }) => {
        const number = rows._array.length;
        console.log(`Get Number of tables: ${number}`);
        return number;
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getDatabaseRef = async () => {
  return db;
};

(function () {
  initializeDatabase();
})();

export default {
  getTableInfo,
  getNumberOfTables,
  getDatabaseRef,
};