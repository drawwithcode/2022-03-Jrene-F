let pokeBall; // create a variable for pokeball image
let url = "magikarp.html" // url for the Pokemon sketch
let arrow_move; // set a variable for arrow movement control

function preload(){
   pokeBall = loadImage('assets/images/pokeBall.png'); // load of Pokeball icon image
   soundFormats('mp3'); // all sound files used will have .mp3 extension
   soundGame = loadSound('assets/sounds/Pokemon Button'); // load the sound used for the page navigation (the same used in the original game) 
   myfont = loadFont('https://fonts.cdnfonts.com/s/15306/PressStart2P-Regular.woff'); // load the font (I use this method because 
                                                                                      // when i've tried to load it into the html file it was very slow
   
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0, 20, 50); // add background
    imageMode(CENTER);
    image(pokeBall, windowWidth/2 + 390, 230, 115, 115)
    arrow_move = windowHeight/2 + 238;
  }
  
  function draw() {  
    frameRate(7);  

    push();
      fill(235, 235, 235);
      rect(windowWidth/2 - 550, windowHeight/2 + 100, 2000, 200, 20)
    pop();

    push(); // handing of the animated arrow (triangle)
    fill(0, 20, 50);
    noStroke();
    translate(windowWidth/2 - 120, arrow_move);
    triangle(0, 0, 22, 0, 11, 17);
    if(arrow_move > windowHeight/2 + 238){
        arrow_move = windowHeight/2 + 235;}
        else{
            arrow_move = arrow_move+1;
        }
  pop();

    push(); // Descriptive text for sketch instructions with setting of font and relative text attributes
     fill(0, 20, 50);
      textFont(myfont);
      textSize(18);
      textAlign(LEFT);
      textStyle(BOLD)
      text("Be QUIET and move the cursor if you want to be able to see it.\nDon’t CLICK on it or scroll the MOUSE WHEEL if you don’t want\nto make it angry!!!\n\nClick to CONTINUE...", windowWidth/2 - 500,windowHeight/2 + 165)
    pop();

   push(); // Descriptive text for sketch instructions with setting of font and relative text attributes
   textFont(myfont);
   fill(235, 235, 235);
    textSize(50);
    textAlign(CENTER);
    textStyle(BOLD)
    text("You encountered\na POKEMON!", windowWidth/2 - 90,220)
  pop();
  }

  function mouseClicked(){ // if the mouse is pressed ...
    soundGame.play(); // play the page navigation sound
    urlDelay(); // call the function that call an url after a delay
  }

  async function urlDelay(){ // async function for delayed actions (description examples found on a tutorial)
    await sleep(880); // call the sleep function with 880 (milliseconds) as parameter
    window.open(url,"_self"); // after the wait call the url specified by the "url" variable (magikarp.html)
  }

  function sleep(millisec){ // function sleep 
    return new Promise((resolve)=>{ // return after timeout
        setTimeout(resolve, millisec);  // set sleep timeout (millisec variable)
    })
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }