'use strict';

var requestButton = document.getElementById('js-request');

var token;


function manageLogin() {
  var responseMessage = JSON.parse(this.responseText)[0]

  if (typeof responseMessage.error === "undefined") {
    token = responseMessage.success.username
  } else {
    console.log("Error trying to login. Click link button")
  }
}



function getCredentials() {
  var body = {
    devicetype: "my_hue_app#iphone"
  };

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", manageLogin);
  oReq.open('POST', "http://10.0.1.23/api");
  oReq.send(JSON.stringify(body));
}

getCredentials()
