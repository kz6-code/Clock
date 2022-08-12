
var gearSe1;
var gearSe2;
var gearMn1;
var gearMn2;
var img; //watch image
var img2; //seconds hand logo
var c;

function mousePressed(){
  c = mouseX; 
}

function preload(){
  img = loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/121795/hb2.png');     // load image
  img2 = loadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/121795/seconds2.png')// load image
}

function setup(){
  var cx = createCanvas(800, 735); // canvas 
  var x = (windowWidth - width) / 2;   // used to set canvas center
  var y = (windowHeight - height) / 2;
  cx.position(x, y)
  createCanvas(800, 800)

  angleMode(DEGREES);     // set angle mode to degrees
  ellipseMode(CENTER);    // set the elipse center
  imageMode(CENTER);      // and image as well
}

function draw(){
  background(0);                                 //black background
  let hr = hour();                               // each variable has a funcion to it pretty obvious
  let mn = minute();
  let se = second();
  let dt = day();
  let end1 = map(se, 0, 60, 0, 360);             // makes maps if u dont know this then i wont type it out again ask ali to show you raycasing to explain
  let end2 = map(mn, 0, 60, 0, 360);
  let end3 = map(hr%12, 0, 12, 0, 360);

push();                                        
  translate(height/2, width/2);                 
  image(img, 20, 1, 500, 550);                   //kinda shows the image 500 is width and height rest is coordinates and the img that it should show
  rotate(-90);                                   // the image i got was flipped over so i had to flip it back silly me tried to doing it clockwise at first made it -90 cus it looks cooler

  strokeWeight(10);                              // stroke weight to heavy     
  stroke(10);                                    // stroke colour to 10
  //arc (0, 0, 300, 300, 0, 360);

  //Draw gears  this is for those moving clog things 
  strokeWeight(1);                                // set the stroke weight
  stroke(200,200);                               // set stroke colour
  gearSe1 = new gear(0,0,120,40,29, -end1*360);
  fill(0);
  gearSe1.update();
  gearSe2 = new gear(-56,-68,120,50,43, end1*360);
  gearSe2.update();


  stroke(200,200);
  fill(0,255);
  ellipse(0,0,15,15);
  ellipse(-56,-68,80,80);
  stroke(200,180);
  rect(-56,-108,3,79);
  push();
  rotate(70);
  rect(-84,68,3,-50);
  pop();
  push();
  rotate(120);
  rect(-30,44,3,79);
  pop();
  fill(192);
  ellipse(-56,-68,30,30);
  noFill();
  gearMn2 = new gear(41,52,240,28,27,end1*360);
  gearMn1 = new gear(41,52,240,23,20,mn*360);
  stroke(192,192,192);
  gearMn1.update();
  gearMn2.update();

  //noStroke();
  fill(0,255);
  //ellipse(41,52,46,46);



  //Hour Markers and Date

  for (var i = 0; i<12; i++){
    noStroke();
    fill(255,255,0);
    rectMode(CENTER);
    rect (148,0,10,3)
    if (i==3){
      //noFill();
      stroke(192,192,192);
      noFill();
      strokeWeight(1);
      ellipse(120,1,34,34);
      textSize(17);
      noStroke();
      fill(192,190);
      text(dt, 110, 7);
    }
    rotate(30);
  }

    //Draw Minutes Hand
    push();
      rotate(end2);
      strokeWeight(6);
      stroke(255,255,0);
      line(0,0,130,0);
    pop();

    //Draw Hours Hand
    push();
      rotate(end3);
      strokeWeight(10);
      stroke(255,255,0);
      line(0,0,65,0);
    pop();

  //Draw Seconds Hand
  push();
    rotate(end1);
    strokeWeight(1);
    stroke(255,0,0);
    rectMode(CENTER);
    stroke(255,0,0);
    strokeWeight(2);
    line(-50,0,130,0);
    image(img2, -63 , 0, 25, 25);

    strokeWeight(1);
    stroke(255,0,0);
    fill(255);
    triangle(126,-3,126,4, 135,0 );
    fill(255,0,0);
    ellipse (0,0,15,15);
    stroke(255,255);
    strokeWeight(1);

    noStroke();
    fill(255,255);
    //rect(106,0,42,5);
    fill(0);
    ellipse (0,0,8,8);
  pop();

pop();

}

  function gear(x,y,vertexNum,rOut,rIn,c){
  this.pos = createVector(x, y);
  //this.r = r;
  this.vertexNum = vertexNum;
  this.rIn = rIn;
  this.rOut = rOut;
  this.c = c;

  this.update = function(){
    push();
      translate(this.pos.x,this.pos.y);
      rotate(radians(c));
      beginShape();
        for (var i = 0;i < this.vertexNum;i++) {
          if (i%4==2 || i%4==3) {
            var r = this.rOut;
          }
          else {
            var r = this.rIn;
          }
         
          vertex(r*cos(360*i/this.vertexNum), r*sin(360*i/this.vertexNum));

        }
      endShape(CLOSE);
    pop();
  }
}



/* THIS IS THE CODE I STARTED WITh AND GOT THE IDEA FROM        

function setup() {
    var cnv = createCanvas(400, 400);  // creates canvas

  var x = (windowWidth - width) / 2;   // used to set canvas center
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  angleMode(DEGREES);
  ellipseMode(CENTER);
  }

  
  function draw() {
  

    background(17, 31, 122);
    
    translate(200, 200);
    rotate(-90);
  
    let hr = hour();
    let mn = minute();
    let sc = second();
    
  
    strokeWeight(8);
    stroke(255, 100, 150); // og : 255, 100,
    noFill();
    let secondAngle = map(sc, 0, 60, 0, 360);
    //arc(0, 0, 300, 300, 0, secondAngle);
  
    stroke(150, 100, 255);
    let minuteAngle = map(mn, 0, 60, 0, 360);
    //arc(0, 0, 280, 280, 0, minuteAngle);
  
    stroke(150, 255, 100);
    let hourAngle = map(hr % 12, 0, 12, 0, 360);
    //arc(0, 0, 260, 260, 0, hourAngle);
  
    push();
    rotate(secondAngle);
    stroke(255, 100, 150);
    line(0, 0, 100, 0);
    pop();
  
    push();
    rotate(minuteAngle);
    stroke(150, 100, 255);
    line(0, 0, 75, 0);
    pop();
  
    push();
    rotate(hourAngle);
    stroke(150, 255, 100);
    line(0, 0, 50, 0);
    pop();
  
    stroke(255);
    point(0, 0);
  
  
    //  fill(255);
    //  noStroke();
    //  text(hr + ':' + mn + ':' + sc, 10, 200);
  
  
  } */