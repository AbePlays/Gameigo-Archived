import firebase from "./firebase";

export const signup = async (email: string, password: string) => {
  console.log(`EMAIL ${email} PASSWORD ${password}`);
  try {
    let res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return res.user;
  } catch (error) {
    console.log(error);
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
