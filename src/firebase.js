import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const Config ={
  apiKey: "AIzaSyDNm4t1gawhZ2U4_8UVYrMHaMW5LiDerNE",
  authDomain: "terrain-1b842.firebaseapp.com",
  projectId: "terrain-1b842",
  storageBucket: "terrain-1b842.appspot.com",
  messagingSenderId: "535456926741",
  appId: "1:535456926741:web:44c0ee8e839c62e4c1121c",
  measurementId: "G-MDTJBXVDNF"
  };

const app = initializeApp(Config);
export const storage = getStorage(app);