import { Storage } from '@ionic/storage';

const storage = new Storage();

const createStorage = () => {
  storage.create();
};

const setItem = (key: string, value: any) => {
  storage.set(key, value);
};

const getItem = (key: string) => {
  return storage.get(key);
};

export { storage, createStorage, setItem, getItem };