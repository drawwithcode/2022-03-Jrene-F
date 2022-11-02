let images = []; // create an array for images
let mic; // create a variable for microphone handling

let extrusion = 3; // create a variable called 'extrusion' and set it to 3. 
let pixelsize = 0; // create a variable called 'pixesize' and set it to 0

let url = "index.html" // create a variable used to go back to index.html page


function preload(){
	soundFormats('mp3'); // all sound files used will have .mp3 extension
	soundPokemon = loadSound('assets/sounds/Magikarp Sound'); // load the sound of the Pokemon Magikarp
	soundGame = loadSound('assets/sounds/Pokemon Button'); // load the sound used for the page navigation (the same used in the original game) 
	myfont = loadFont('https://fonts.cdnfonts.com/s/15306/PressStart2P-Regular.woff'); // load the font (I use this method because 
																					   // when i've tried to load it into the html file it was very slow)
}


function setup () {
	createCanvas (windowWidth, windowHeight, WEBGL); // creation of 3D canvas

	images[0] = loadImage('assets/images/magikarp.png');  // load of Magikarp image
	images[1] = loadImage('assets/images/magikarp-depth.png'); // load of Magikarp Depth image for 3D result
	images[0].loadPixels(); // load of first image's pixels
	images[1].loadPixels(); // load of second image's pixels
	mouseX = width / 2;
	mouseY = height / 2;

	delay = new p5.Delay();  // set echo's delay for the Magikarp sound
	delay.process(soundPokemon, 0.12, .3, 2300); 
}

function mouseWheel(event){  // event called on mouse wheel rotation, it will extrude the image of Magikarp
	extrusion = extrusion + event.delta/500;   
}


function draw () {	

    translate(-200,-200)
	camera(mouseX/2 - 200, mouseY/2, 400, width/8, height/3.8, 0, 0, 1, 0); // creation of "camera" view, that allows you to observe the scene from different prospectives
	background(0, 20, 50); // add background
	noStroke();
	lights (); // add lights to the scene for 3D shadows

	if (mic) { // if the microphone is enabled ...
		const micLevel = mic.getLevel();  // getting the mic level
		pixelsize = map(micLevel, 0, 1.5, 3, width) // re-mapping of mic level with the size of pixels
		
	}

	if (pixelsize < 5) { // prevent pixelsize from becoming too low
			pixelsize = 5;
			}
	if (pixelsize > 100) { // prevent pixelsize from becoming too high
			pixelsize = 100;
			}

	for (y = 0; y < images[0].height; y += pixelsize) {   // use pixelsize variable for color/depth setting of image's pixels
		for (x = 0; x < images[0].width; x += pixelsize) {  // use pixelsize variable     
				pixelCol = images[0].get(x,y); // get of Magikarp image's pixel by pixel
        		depthCol = images[1].get(x,y); // get of Magikarp-Depth image's pixel by pixel
				let zDepth = brightness(depthCol); // set a variable with the brightness of Magikarp-Depth pixel
        		
				push();														
				translate (x, y, - zDepth * extrusion); // let's fix the depth by negating zDepth multiplied by extrusion (modified by mouse wheel)																									
			 	fill (pixelCol);			// fill the box with the pixel color									
				box (pixelsize);			 // use of pixelsize variable for box creation											
				pop();										
		}
	}

}

function mousePressed(){ // if the mouse is pressed ...
	userStartAudio();  // start the audio function
	mic = new p5.AudioIn(); // mic enablement
	  mic.start(); // start audio capture
	  soundPokemon.play(); // play the Magikarp sound
  }

  function keyPressed(){ // if a keybord key is pressed ...
	if(keyCode == 72){ // check if the key is # equal to "h" or "H" key
    soundGame.play(); // play the page navigation sound
    urlDelay(); // call the function that call an url after a delay
   }
  }
  async function urlDelay(){  // async function for delayed actions (description examples found on a tutorial)
    await sleep(880); // call the sleep function with 880 (milliseconds) as parameter
    window.open(url,"_self"); // after the wait call the url specified by the "url" variable (index.html)
  }

  function sleep(millisec){ // function sleep 
    return new Promise((resolve)=>{ // return after timeout
        setTimeout(resolve, millisec); // set sleep timeout (millisec variable)
    })
  }