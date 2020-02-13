var NAME = ""
var DEST = ""
var FIRST_TIME = 0
var FREQ = 0

 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBWCq3tlG-3KHRn34KO3ZaIuJUFMpGSRxw",
    authDomain: "traintime-85d65.firebaseapp.com",
    databaseURL: "https://traintime-85d65.firebaseio.com",
    projectId: "traintime-85d65",
    storageBucket: "traintime-85d65.appspot.com",
    messagingSenderId: "811957475596"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() {
  $("#addDiv").hide();
})

// Btn Click Events
$("#addBtn").on("click", function(event) {
  $("#addDiv").show();
})

$("#addCancel").on("click", function(event) {
  $("#addDiv").hide();
  $("#nameInput").val("")
  $("#destInput").val("")
  $("#timeInput").val("")
  $("#freqInput").val(0)
})

$("#addUser").on("click", function(event) {
  event.preventDefault();
  $("#addDiv").hide();
  NAME = $("#nameInput").val().trim();
  DEST = $("#destInput").val().trim();
  FIRST_TIME = $("#timeInput").val().trim();
  FREQ = $("#freqInput").val().trim();
  $("#nameInput").val("")
  $("#destInput").val("")
  $("#timeInput").val("")
  $("#freqInput").val(0)
  database.ref().push({
    dbNAME: NAME,
    dbDEST: DEST,
    dbTIME: FIRST_TIME,
    dbFREQ: FREQ
  })
});

database.ref().on("child_added", function (dataSnap) {
  var RETURN_NAME = dataSnap.val().dbNAME
  var RETURN_DEST = dataSnap.val().dbDEST
  var RETURN_FREQ = dataSnap.val().dbFREQ
  var RETURN_TIME = dataSnap.val().dbTIME
  var RT_CONVERTED = moment(RETURN_TIME, "hh:mm").subtract(1, "years")
  var CURRENT_TIME = moment().format("HH:mm")
  $("#currentTime").text(" " + CURRENT_TIME)
  var TIME_DIFFERENCE = moment().diff(moment(RT_CONVERTED), "minutes")
  var TIME_REMAINDER = TIME_DIFFERENCE % RETURN_FREQ
  var MINUTES_TIL_TRAIN = RETURN_FREQ - TIME_REMAINDER
  NEXT_TRAIN = moment().add(MINUTES_TIL_TRAIN, "minutes")
  ARRIVAL_TIME = NEXT_TRAIN.format("HH:mm")

  $("#tBody").append(
  `
  <tr>
    <td>${dataSnap.val().dbNAME}</td>
    <td>${dataSnap.val().dbDEST}</td>
    <td>${dataSnap.val().dbFREQ}</td>
    <td>${ARRIVAL_TIME}</td>
    <td>${MINUTES_TIL_TRAIN}</td>
  </tr>
  `
  )

  setInterval(function() {
    window.location.reload();
  }, 60000); 
})