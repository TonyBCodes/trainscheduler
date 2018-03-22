$(document).ready(function () {

    //----- global variables-----------------------------------

    // Initialize Firebase
    var config = {
        databaseURL: "https://test-7a585.firebaseio.com/",
    };
    firebase.initializeApp(config);
    var db = firebase.database();

    // initial train information
    var train1 = {
        "trainnumber": "2130",
        "traindest": "Boston",
        "trainstart": "06:00",
        "trainfreq": 12,
        "tracknum": "5"
    };

    var train2 = {
        "trainnumber": "180",
        "traindest": "New York",
        "trainstart": "05:30",
        "trainfreq": 15,
        "tracknum": "3"
    };

    var train3 = {
        "trainnumber": "777",
        "traindest": "Fern Rock",
        "trainstart": "04:00",
        "trainfreq": 3,
        "tracknum": "2"
    };

    var train4 = {
        "trainnumber": "123",
        "traindest": "Frankford Terminal",
        "trainstart": "04:00",
        "trainfreq": 4,
        "tracknum": "8"
    };

    // train object
    var traininfo = {
        "trainnumber": 1,
        "traindest": 2,
        "trainstart": 3,
        "trainfreq": 4,
        "tracknum": 5
    };


    //----- functions------------------------------------------

    // function to show a clock on the screen
    function updateclock() {
        $("#clock").html(moment().format('D MMMM YYYY H:mm:ss'));
    }

    
    // function to parse through database via the keys
    function gotdata(number) {
        var trinform = (number.val());
        var keys = Object.keys(trinform);
        console.log(keys);
        // once you have the keys, move through the database 1 record at a time
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var ti = trinform[k].traininfo.traindest;
            console.log(ti);
        }


    }

    // empty the database and load the starting trains into the database
    function loadtrains() {
        firebase.database().ref().remove();
        traininfo = train1;
        firebase.database().ref().push({ traininfo });
        traininfo = train2;
        firebase.database().ref().push({ traininfo });
        traininfo = train3;
        firebase.database().ref().push({ traininfo });
        traininfo = train4;
        firebase.database().ref().push({ traininfo });
    }

    // add a new train
    function newtrain() {
        firebase.database().ref().push({ traininfo });
    }

    // calculate the time until the next train
    function ttnt(freq, first) {
        var firstTimeConverted = moment(first, "HH:mm");
        console.log(firstTimeConverted);
        var currtime = moment();
        var difftime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(difftime);
        var tremainder = difftime % freq;
        console.log(tremainder);
        var tmintnt = freq - tremainder;
        console.log(tmintnt);
        var nexttrain = moment().add(tmintnt, "minutes");
        console.log(moment(nexttrain).format("hh:mm"));
    }


    //----- end of functions-----------------------------------

    //----- start----------------------------------------------

// load the trains into firebase at the start
    loadtrains();
    
// show the clock on the screen
    setInterval(updateclock, 1000);

    // playing with changing data to see what happens
    // db.ref().on("child_changed", function (snapshot) {
    //     alert("child changed");
    //     console.log(snapshot.val());
    // });

    db.ref().on("value", function (snapshot) {
        console.log(snapshot.val());
        gotdata(snapshot);

    });

    // call the time to next train function with the frequency and start time
    ttnt(12, "08:32");

    // still to do
    // list the trains on the screen in order of next arrival
    // every minute, 
    //     call the function to display the time until the next train and time of the next train
    //     remove trains that have already gone 
    //     show new trains that are within the next 30 minutes (maybe within the next hour)


    //});


});