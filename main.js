song="";
leftWristx=0;
leftWristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
scorerightwrist=0;

function preload(){
    song=loadSound("music.mp3")
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotposes);
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000")
    stroke("#FF0000")
    circle(leftWristx,leftWristy,25)
  if(scoreleftwrist > 0.2){

    innumberleftwristy=Number(innumberleftwristy);
    remove_decimals=floor(innumberleftwristy);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume = " + volume;
    song.setVolume(volume);
}

fill("FF0000");
stroke("FF0000");
circle(rightwristx,rightwristy,25)
if(rightwristy > 0 && rightwristy <=100){
    document.getElementById("speed").innerHTML="speed=0.5x";
    song.rate(0.5);   
}
else if(rightwristy > 100 && rightwristy <= 200){
    document.getElementById("speed").innerHTML="speed = 1x";
    song.rate(1);
}
else if(rightwristy > 200 && rightwristy <= 300){
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
}
else if(rightwristy > 300 && rightwristy <= 400){
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}
else if(rightwristy > 400 && rightwristy <= 500){
    document.getElementById("speed").innerHTML="speed=2.5x";
    song.rate(2.5);
}

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("poseNet modal has been started")
}

function gotposes(results){
    if(results.length>0)
        {
           console.log(results);
           leftWristx=results[0].pose.leftWrist.X;
           leftWristy=results[0].pose.leftWrist.Y;
           console.log("leftWristx " + leftWristx + "leftWristy" + leftWristy);

           rightwristx=results[0].pose.rightwrist.X;
           rightwristy=results[0].pose.rightwrist.Y;
           console.log("rightWristx" + rightwristx + "rightWristy" + rightwristy);
           scoreleftwrist=results[0].pose.keypoints[9].score;
           console.log("scoreleftwrist = " + scoreleftwrist);
           scorerightwrist=results[0].pose.keypoints[10].score;
           console.log("scorerightwrist = " + scorerightwrist);
        }
}

