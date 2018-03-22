// JavaScript source code

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    //apiKey: "<API_KEY>",
    //authDomain: "test-7a585.firebaseapp.com",
    databaseURL: "https://test-7a585.firebaseio.com/",
    //storageBucket: "<BUCKET>.appspot.com",
    //messagingSenderId: "<SENDER_ID>",
};
firebase.initializeApp(config);

var info = {
    "one": 1,
    "two": 2,
    "three": 3
};

var trans;

var db = firebase.database();


firebase.database().ref().set({ info });

firebase.database().ref().push({ info });

db.ref().on("child_changed", function (snapshot) {
    alert("child changed");
    console.log(snapshot.val());
    trans = snapshot;
});
