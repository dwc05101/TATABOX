import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCW-o6RlUxUwl27MDGLX9DoJStq6dzUhyc",
    authDomain: "tatabox-9c354.firebaseapp.com",
    databaseURL: "https://tatabox-9c354.firebaseio.com",
    projectId: "tatabox-9c354",
    storageBucket: "tatabox-9c354.appspot.com",
    messagingSenderId: "666619023503"
};

firebase.initializeApp(config);

export default firebase;