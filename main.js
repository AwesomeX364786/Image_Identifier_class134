img = "";
status = "";
objects = [];

function preload(){
img = loadImage('dog_cat.jpg');
}

function setup(){
canvas = createCanvas(350, 350);
canvas.center();
video = createCapture(VIDEO);
video.size(350, 350);
video.hide();
}

function start(){
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById('status').innerHTML = "Status : Detecting Objects!"; 
}

function modelLoaded(){
console.log("Model Loaded");
status = true;
}

function gotResults(error, results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
image(video, 0, 0, 350, 350);
if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResults);
    for(i = 0; i < objects.length; i++){
        document.getElementById('status').innerHTML = "Status : Objects Detected!";
        document.getElementById('number_of_objects').innerHTML = "Number Of Objects Detected Are : " + objects.length; 
        fill(r,g,b);
        percent = Math.floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}