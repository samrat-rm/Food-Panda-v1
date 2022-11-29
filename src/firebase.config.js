import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCP4eCpQQ4S2Qe7No5T-oo1qxL5g7C40_o",
    authDomain: "foodpanda-8fa83.firebaseapp.com",
    databaseURL:
        "https://foodpanda-8fa83-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "foodpanda-8fa83",
    storageBucket: "foodpanda-8fa83.appspot.com",
    messagingSenderId: "911323407157",
    appId: "1:911323407157:web:2e02b1c1e78b9adc11227c",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// if there is no app we should get a new app
// this is to prevent creating a new app everytime we reload the page

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
