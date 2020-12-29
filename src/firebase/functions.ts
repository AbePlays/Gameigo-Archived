import { Game } from "../components/Home";
import firebase from "./firebase";

export const signup = async (email: string, password: string) => {
  console.log(`EMAIL ${email} PASSWORD ${password}`);
  try {
    let res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return res.user;
  } catch (e) {
    console.log(e);
  }
};

export const login = async (email: string, password: string) => {
  console.log(`EMAIL ${email} PASSWORD ${password}`);
  try {
    let res = await firebase.auth().signInWithEmailAndPassword(email, password);
    return res.user;
  } catch (e) {
    console.log(e);
  }
};

export const signout = async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async (user: firebase.User, name: string) => {
  try {
    await firebase.firestore().collection("users").doc(user.uid).set({
      name: name,
      email: user.email,
      favorites: [],
    });
  } catch (e) {
    console.log(e);
  }
};

const currentUser = () => {
  try {
    let user = firebase.auth().currentUser;
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async (uid: string) => {
  try {
    let docs = await firebase.firestore().collection("users").doc(uid).get();
    return docs.data();
  } catch (e) {
    console.log(e);
  }
};

export const addData = async (data: Game) => {
  try {
    let user = currentUser();
    if (user) {
      let userDoc = firebase.firestore().collection("users").doc(user.uid);
      let doc = await userDoc.get();
      await userDoc.update({
        favorites: [...doc.data()!.favorites, data],
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeData = async (id: number) => {
  try {
    let user = currentUser();
    if (user) {
      let userData = firebase.firestore().collection("users").doc(user.uid);
      let doc = await userData.get();
      let arr: Game[] = doc.data()!.favorites;
      arr = arr.filter((item: Game) => item.id !== id);
      await userData.update({
        favorites: arr,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
