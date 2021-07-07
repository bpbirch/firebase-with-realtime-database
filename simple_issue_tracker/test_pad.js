// JavaScript file for the web page "World Peace Issue Tracker"
// Created by Harrison Kong
// Copyright (C) Coursera 2020

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4UaD0LlFMpEFHiNDgnC7Qj_67CYHmcQU",
    authDomain: "brendan-world-peace.firebaseapp.com",
    projectId: "brendan-world-peace",
    databaseURL: "https://brendan-world-peace-default-rtdb.firebaseio.com",
    storageBucket: "brendan-world-peace.appspot.com",
    messagingSenderId: "539669509645",
    appId: "1:539669509645:web:8c2a0d92778abf02ec8744",
    measurementId: "G-YGFN60FFS0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Paste the web app's configuration above this line
// Our code starts below

// GET A ROOT REFERENCE to issues HERE (type along)
// the following will create a reference to our entry point 'issues' in our db tree
const rootRef = firebase.database().ref("issues/");

// Task 3 ------------------------------------------

// .push will automatically create a key for you in your database
// rootRef.push ({
//     description: "Logo does not show up on screen 3",
//     user: "bpbirch",
//     resolved: "yes",
//     severity: "minor"
// });

// rootRef.push ({
//     description: "Screen flashes on save",
//     user: "slickrick88",
//     resolved: "no",
//     severity: "moderate"
// });

// // you can create another tree root (not sure that's what it's called):
// newRoot = firebase.database().ref("anotherRoot/");
// newRoot.push({
//     something: "just something",
//     another_thing: "just something else"
// })

// Task 6 ------------------------------------------

// var recordRef = firebase.database().ref("issues/change-me");
//
// recordRef.update ({
//    "resolved": "yes"
// });

// Task 7 ------------------------------------------

var recordRef = firebase.database().ref("issues/delete-me");

recordRef.remove()
   .catch(function(error) {
     alert("Delete failed: " + error.message)
   });
