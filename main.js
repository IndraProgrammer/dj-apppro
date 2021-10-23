var song = "";
var scoreleftwrist = 0;
var scorerightwrist = 0;
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#F0000B");
    stroke("#000000");
    if (scoreleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        numleftWristY = Number(leftWristY);
        removeDecimal = floor(numleftWristY);
        volume = removeDecimal / 500;
        document.getElementById("volume").innerHTML = "volume  =  " + volume;
        song.setVolume(volume);
    }
    if (scorerightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        console.log(" i am y axis" + rightWristY);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed=1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed=2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "speed=2.5x";
            song.rate(2.5);
        }
    }
}





function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function modelLoaded() {
    console.log("poseNet is inistilled");
}

function gotPoses(results) {
    console.log("i am inside got pose");
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX);
    }
}