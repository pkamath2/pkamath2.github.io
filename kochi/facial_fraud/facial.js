var ctracker;
var videoInput;
var positions = [];
var canvas;
var rec;
var recordedString = '';
var prevRecordedString;
var emotions = new emotionClassifier();
var predictedEmotions;
emotions.init(emotionModel);
var emotionData = emotions.getBlank();

var negative_facial_emotion;
var positive_facial_emotion;
var nlpPredictedEmotion;
var speech_negative_emotion;
var speech_postive_emotion;
var socket;

var beep;
var tupimg;
var tdownimg;
var total_emotion = 'start';

function setup() {
    //Load Camera
    videoInput = createCapture();
    videoInput.size(1000, 750);
    videoInput.position(350,100);
    videoInput.id("v");
    var mv = document.getElementById("v");
    mv.muted = true;

    textFont("American Typewriter");
    textAlign(CENTER, CENTER);

    // setup tracker
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(videoInput.elt);

    beep = loadSound("beep-01a.wav");
    tupimg = loadImage("assets/tup.png");
    tdownimg = loadImage("assets/tdown.png");

    // socket = new WebSocket('ws://192.168.20.188:5000');
    // socket.onopen = socketopen;
    // socket.onmessage = readMessage;

    //Load canvas
    canvas = createCanvas(1000, 750);
    canvas.position(350,100);

    rec = new p5.SpeechRec();
    rec.continuous = true;
    rec.onResult = showResult; // bind callback function to trigger when speech is recognized
    rec.start();
}
      
function draw() {
    positions = ctracker.getCurrentPosition();
    var cp = ctracker.getCurrentParameters();
    predictedEmotions = emotions.meanPredict(cp);
    
    
    clear();
    
    noStroke();
    fill(0,80);
    rect(0,0,width,height);
    
    drawPoints();

    if (emotions && predictedEmotions) {
        // {emotion: "angry", value: ..}
        // {emotion: "disgusted", value: ..}
        // {emotion: "fear", value: ..}
        // {emotion: "sad", value: ..}
        // {emotion: "surprised", value: ..}
        // {emotion: "happy", value: ..}

        negative_facial_emotion = predictedEmotions[0].value + predictedEmotions[1].value + predictedEmotions[2].value + predictedEmotions[3].value;
        positive_facial_emotion = predictedEmotions[4].value + predictedEmotions[5].value;
        // speech_negative_emotion = -0.1 ;
        // speech_postive_emotion = -0.1;
        fill(255);
        rect(300+20, height-90, 30, -positive_facial_emotion * 30); 
        rect(300+110+20, height-90, 30, -negative_facial_emotion * 30); 
        rect(300+(2*110+20), height-90, 30, -speech_postive_emotion * 30); 
        rect(300+(3*110+20), height-90, 30, -speech_negative_emotion * 30);

    }
    
    text("Facial\nPositive", 320, height-70);
    text("Facial\nNegative", 430, height-70);
    text("Speech\nPositive", 520, height-70);
    text("Speech\nNegative", 640, height-70);
    if(recordedString && recordedString != prevRecordedString) {
        console.log(recordedString);
        // socket.send(recordedString)
        nlpPredictedEmotion = loadStrings("http://vast-woodland-82054.herokuapp.com/ff/analyse?start="+recordedString, checkEmotions)
        prevRecordedString = recordedString;
    }
    text(recordedString, 350, height-30);
    if(total_emotion == 'negative'){
        image(tdownimg,780,height-120, tdownimg.height/8,tdownimg.height/8);
    }else if(total_emotion == 'positive'){
        image(tupimg,780,height-120, tupimg.height/8,tdownimg.height/8);
    }
}

 // speech recognition object (will prompt for mic access)
 function showResult()
 {
    //console.log(rec.resultString); // log the result
    recordedString = rec.resultString;
 }

function drawPoints() {
    fill(255);
    for (var i=0; i<positions.length -3; i++) {
        ellipse(positions[i][0], positions[i][1], 3, 3);
    }
}

function checkEmotions(speech_emotion){
    console.log("NLP emotion = " + speech_emotion);
    var facial_emotion;
    if(negative_facial_emotion > positive_facial_emotion){
        facial_emotion = "negative";
    }else{
        facial_emotion = "positive";
    }

    if(speech_emotion == "negative"){
        speech_postive_emotion = 0.1;
        speech_negative_emotion = 1.2;
    }else if(speech_emotion == "positive"){
        speech_postive_emotion = 1.2;
        speech_negative_emotion = 0.1;
    }
    console.log("Facial emotion = " + facial_emotion);
    if(facial_emotion != speech_emotion){
        beep.play();
        total_emotion = 'negative';
        image(tdownimg,300,300);
    }else{
        total_emotion = 'positive';
        image(tupimg,300,300);
    }
}

// function readMessage(event){
//     nlpPredictedEmotion = event.data; // read data from the onmessage event
    
// }

// function socketopen(){
//     console.log("Socket Opened");
// }
