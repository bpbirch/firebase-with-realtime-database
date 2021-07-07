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

const rootRef = firebase.database().ref('issues/');

// Task 4 ------------------------------------------

// rootRef.on is how we communicate changes in our database to our webpage
// so once an item is actually updated in our database, this is the bit of code that actually updates it on the page
rootRef.on("value",

  (snapshot) => {
    const listTableBody = document.getElementById("list-table-body"); // list-table-body is the main table in html

    // clear all the table rows first
    listTableBody.textContent = "";

    snapshot.forEach((child) => { // a child will be one of our tree items (a key:value set of things)
      issue = child.val();
    //   console.log(issue);
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + issue.severity + "</td><td>" + issue.user + "</td><td>" + issue.description + "</td><td>" 
       + "<select onchange='updateIssue(\"" + child.key + "\", this.value)'>" +
        "<option value='no'" + (issue.resolved=="no" ? " selected" : "") + ">no</option>" +
        "<option value='yes'" + (issue.resolved=="yes" ? " selected" : "") + ">yes</option>" +
      "</select>"
      
      + "</td>"
      + "<td><input type='button' class='btn btn-danger' value='X' onclick='deleteIssue(\"" + child.key + "\")'/></td>";
      listTableBody.append(row);
    });

  },

  (error) => {
    console.log("Error: " + error.code);
  }

);

// Task 5 ------------------------------------------

// addNewIssue is the function that adds new items to our database
// but this DOES NOT add them to the display on our page - rootRef.on({ ... above does that
// note that the Submit Issue button in html is where we're actually calling addNewIssue
function addNewIssue() {
  const severity = document.getElementById("severity-dropdown").value; // you click the dropdown to set severity
  const description = document.getElementById("description-textfield").value; // you fill in the description to set the description
  const resolved = document.getElementById("resolved-dropdown").value; // you click the resolved dropdown to set the resolved value
  const user = document.getElementById("user-textfield").value; // i added this one

  if (description.length == 0) {
    alert("Description cannot be blank!");
    return;
  }
// we added the following lines to add these items to our database when we access the addNewIssue function through webpage
    rootRef.push ({
        description: description,
        resolved: resolved,
        severity: severity,
        user: user
    });

  document.getElementById("description-textfield").value="";
  document.getElementById("user-textfield").value="";
}

// Task 6 ------------------------------------------
// interacts with the resolved dropdown we created
function updateIssue(issueKey, newResolvedValue) {
  var recordRef = firebase.database().ref("issues/" + issueKey);
  recordRef.update ({
    "resolved": newResolvedValue
  });
}

// Task 7 ------------------------------------------

function deleteIssue(issueKey) {
  if (confirm("Are you sure?")) {
    var recordRef = firebase.database().ref("issues/" + issueKey);
    
    recordRef.remove()
    .catch(function(error) {
      alert("Delete failed: " + error.message)
    });
  }
  



}

// Utility function to encode special HTML characters so that the
// web browser does not treat them as HTML tags
// but as literal characters

function encodeHtml(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/ /g, '&nbsp;');
  return str;
}
