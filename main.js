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

function dummy() {
  console.log(this.responseText);
}

function comprobarStatus() {
  var status = this.status
  if(status!=502){
    statusOK()
  }
  else{
    setBulbColor()
  }
}

function statusOk(){
  var body = {
    "on":true,
    "sat":254,
    "bri":100,
    "hue":25500
  };

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", dummy);
  oReq.open('PUT', "http://10.0.1.23/api/" + token + "/lights/1/state");
  oReq.send(JSON.stringify(body));
}

function setBulbColor() {
  var body = {
    "on":true,
    "sat":254,
    "bri":100,
    "hue":0
  };

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", dummy);
  oReq.open('PUT', "http://10.0.1.23/api/" + token + "/lights/1/state");
  oReq.send(JSON.stringify(body));
}

function setOfBulbColor() {
  var body = {
    "on":false
  };

  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", dummy);
  oReq.open('PUT', "http://10.0.1.23/api/" + token + "/lights/1/state");
  oReq.send(JSON.stringify(body));
}

function getServerStatus(){
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", comprobarStatus);
  oReq.open('PUT', "http://10.0.1.23");
  oReq.send();
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
setTimeout(setOfBulbColor,500)
setTimeout(getServerStatus,800)
requestButton.addEventListener("click", setBulbColor)
