import * as firebase from 'firebase';
//import FirebaseConfig from './src/config/FirebaseConfig';
require( 'firebase/auth');

const config = {
    apiKey: "AIzaSyD4X7pwVIvJpJBteuoe4u4xLpx7nfCcjgw",
    authDomain: "tatabox-c2abe.firebaseapp.com",
    databaseURL: "https://tatabox-c2abe.firebaseio.com",
    projectId: "tatabox-c2abe",
    storageBucket: "tatabox-c2abe.appspot.com",
    messagingSenderId: "35792472931",
    appId: "1:35792472931:web:7f4d36cfbc231a6e"
};

class Firebase{
    constructor() {
        this.fb = firebase.initializeApp(config);
    }

    // **** AUTH API ****
    createUser = (id, password, name, dept, schl, imgurl) => {
        var firebase = this.fb;
        firebase.auth().createUserWithEmailAndPassword(id,password)
        .then(function success(userData){
            userData.user.updateProfile({
                displayName: name
            })

            var datas = {name: name, dept: dept , schl: schl, imgs: imgurl};
            firebase.database().ref('/AUTH/'+userData.user.uid).set(datas)
            .then(()=>{
                window.location.pathname = "TATABOX/class";
            });
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("error Code : "+errorCode+", msg : "+errorMessage);
        })
    }

    signIn = (id,password) => {
        var that = this;
        this.fb.auth().signInWithEmailAndPassword(id,password).then(function success(userData){
            that.fb.database().ref('/AUTH/' + userData.user.uid + '/clas').once('value').then(function(snapshot){
                window.location.pathname = "TATABOX/class";
            })
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("error Code : "+errorCode+", msg : "+errorMessage);
            window.location.reload();
        });
    }

    signOut = () => {
        this.fb.auth().signOut().then(window.location.pathname=="TATABOX/");
    }

}


export default Firebase;