//saving new item  -> we create using the createContainer

import { firestore } from "../firebase.config";
import {
    doc,
    setDoc,
    getDocs,
    collection,
    query,
    orderBy,
} from "firebase/firestore";

export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
        merge: true,
    });
};
// tutorial 04:23:00

export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
};
