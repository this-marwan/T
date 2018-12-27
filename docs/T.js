var running = false;

var Score;
var key = 0;

var width = 4;//width of the board - should be one less than available numbers

var pos; //position of the block user is controlling

var padArr = [
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,0
];


var act_color = '#8BC34A';
var def_color = '#DCEDC8'; //alternative color: #26A69A

var streak = 0;

var Csound = new Audio('Press.mp3');

document.onkeydown = checkKey;

function Begin(){
	//remove the Menu
	document.getElementById("Menu").style.display = "none";

	//reset our variables
	Score = 0;
	running = true;


	//empty our array back to zero
	for (i = 0;i<padArr.length;i++)
	{
		padArr[i] = 0;
	}

	//update the game pad
	generate(); //generate a new block
	updatePad();
};
function checkKey(e) {

    e = e || window.event;
 if (e.keyCode == 40) {
        // down arrow
		key = 40;
		playTurn();
    }
    else if (e.keyCode == 37) {
       // left arrow
	    key = 37;
		playTurn();
    }
    else if (e.keyCode == 39) {
       // right arrow
	  key = 39;
	  playTurn();
    }
	key = 0;
};
function playTurn(){
    if (key == 39)//right
	{
		if (pos%width != (width-1) && padArr[pos+1] == 0) //check if there to the right/if we are at the end
		{
				padArr[pos+1] = padArr[pos];
					padArr[pos] = 0;
					pos++;
		}
	}
	else if (key==40) //down
	{
		if (padArr[pos+width] == 0 && (pos+width) < padArr.length) //check if there is a block underneath it
		{
				padArr[pos+width] = padArr[pos];
					padArr[pos] = 0;
					pos += width;
		}
	}
	else if (key == 37)//left
	{
		if (pos%width != 0 && padArr[pos-1] == 0 ) //check if there to the left/if we are at the end
		{
				padArr[pos-1] = padArr[pos];
					padArr[pos] = 0;
					pos--;
		}
	}
	Csound.play();
	updatePad();
}//controls movement of block

window.setInterval(function(){ //push the block downward every 1s
	if (running) { //game is operational
				if (padArr[pos+width] != 0 || (pos+width > padArr.length)){ //there's a block under us
						wins();
						if (padArr[2] != 0) //we lost
						{
							running = false;
							//show menu
							document.getElementById("Menu").style.display = "block";
							document.getElementById("lost").style.display = "block";
						}
						else
						{
							generate(); //generate a new block
						}
					}
				else//else push it downward
					{
						padArr[pos+width] = padArr[pos];
							padArr[pos] = 0;
							pos += width;
					}
					updatePad();
		}

}, 1000);

//checks for wins
function wins(){

	streak = 0;
	//we check rows first - we could have match of 4 or 5 elements -- we start checking from the bottom
	for (i = padArr.length-width; i>0;i-=width){
		for (j = 0; j<width;j++){ //can be reduced to two iterations

				if (padArr[i+j] == padArr[i+j+1] && padArr[i+j]!=0) {streak++;}
				else {streak = 0;}

				if (streak == 3) //found a streak of atleast 4
				{
					if (padArr[i+j] == padArr[i+j+2]) //found a streak of 5
					{
						columnDown(i);
						columnDown(i+1);
						columnDown(i+2);
						columnDown(i+3);
						columnDown(i+4);
						Score += 15;
					}
					else
					{
						columnDown(i+j);
						columnDown(i+j+1);
						columnDown(i+j-1);
						columnDown(i+j-2);
						Score += 10;
					}
				}

		}
	}

	//then we check for columns -- checks from top to bottom
					cStreak = 0;
					for (i = 0; i<width;i++){
						for (j = 0; j<padArr.length;j += width){
							if (padArr[i+j] == padArr[i+j-width] && padArr[i+j-width]!=0) {cStreak++;}
							else {cStreak = 0;}

							if (cStreak == 3) //found a streak of atleast 4
							{
								console.log("streak");
								console.log(i + " " +j);
								//push column four steps downwards
									columnDown(i+j);
									columnDown(i+j);
									columnDown(i+j);
									columnDown(i+j);
									Score += 10;
									cStreak = 0;
								}
						}
					}
}

//brings a column down - used when we detect a matching row
function columnDown(i) //COLUMN DOWN!!! - yelled as if in battle
	{
		while (i-width>0){
		padArr[i] = padArr[i-width];
		i = i-width;
	}
	padArr[i] = 0;
}
//generates a new block
function generate() {
	pos = 2;
	padArr[pos] = Math.floor(Math.random() * 5) + 1;
}
//fill the table with Array Data - takes care of the visuals
function updatePad(){
	str = (Math.floor(pos/width)).toString() + (pos%width).toString();

  //this is the worst way to do this smh
	var nodes = document.getElementById("Pad").getElementsByTagName("td");
	for(var i=0; i<nodes.length; i++) {
			if (padArr[i] != 0)
			{
	    nodes[i].style.backgroundColor = "#DCEDC8";
		}
		else{
			nodes[i].style.backgroundColor = "#263238";
		}
	}

	document.getElementById(str).parentElement.style.backgroundColor = "#8BC34A";

   //push new information to the table, can be merged with the coloring function above
	 var nodes = document.getElementById("Pad").getElementsByTagName("div");
 	for(var i=0; i<nodes.length; i++) {
 			if (padArr[i] != 0)
 			{
 	    nodes[i].innerHTML = padArr[i];
 		}
 		else{
 			nodes[i].innerHTML = " ";
 		}
 	}



	//update score baord
	strngScore = Score.toString();
	document.getElementById("Num").innerHTML = strngScore;

};
