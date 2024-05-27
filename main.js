img="";
status = "";
objects =[];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
}


function draw(){
    image(video, 0, 0, 380, 380);

    if(status!="")
    {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + objects.length;
            
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }

    // fill("#FF0000");
    // text("Dog", 45, 75);

    // noFill();
    // stroke("#FF0000");
    // rect(30, 60, 450, 350);

    // fill("#FF0000");
    // text("Cat", 300, 120);

    // noFill();
    // stroke("#4287f5");
    // rect(270, 100, 300, 300);
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}