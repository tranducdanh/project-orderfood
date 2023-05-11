import {getApp, getApps, initializeApp} from'firebase/app'
import {getStorage} from'firebase/storage'
import {getFirestore} from'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyCZkeMn_CYJBjizIjXx_nC6VexSr8jaPSc",
    authDomain: "restaurant-cc8be.firebaseapp.com",
    databaseURL: "https://restaurant-cc8be-default-rtdb.firebaseio.com",
    projectId: "restaurant-cc8be",
    storageBucket: "restaurant-cc8be.appspot.com",
    messagingSenderId: "32881739158",
    appId: "1:32881739158:web:0480d713886403d29b49b7"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  
  export { app, firestore, storage };