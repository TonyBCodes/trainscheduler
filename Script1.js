$(document).ready(function () {

    //----- global variables-----------------------------------

    // Initialize Firebase
    var config = {
        databaseURL: "https://test-7a585.firebaseio.com/",
    };
    firebase.initializeApp(config);
    var db = firebase.database();
    var trainnum = db.ref("trainnumber");

    var traininfo = {
        "trainnumber": 1,
        "traindest": 2,
        "trainstart": 3,
        "trainfreq": 4
    };


    //----- functions------------------------------------------

    function updateclock() {
        $("#clock").html(moment().format('D MMMM YYYY H:mm:ss'));
    }

    function gotdata(number) {
        var trinform = (number.val());
        var keys = Object.keys(trinform);
        console.log(keys);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var ti = trinform[k].traininfo.traindest; 
            console.log(ti);
        }


    }






    //----- end of functions-----------------------------------

    //----- start----------------------------------------------
    //$(window).on("load", function () {

    firebase.database().ref().push({ traininfo });

    firebase.database().ref().push({ traininfo });

    db.ref().on("child_changed", function (snapshot) {
        alert("child changed");
        console.log(snapshot.val());
        trans = snapshot;
    });


    setInterval(updateclock, 1000);

    //db.ref().on("value", function (snapshot) {
    //    console.log(snapshot.val());
    //    $("#train").text(snapshot.val().traininfo.trainnumber);
    //})

    db.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        gotdata(snapshot);

    });


    //});


});