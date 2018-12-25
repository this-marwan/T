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
		Csound.play();
		playTurn();
    }
    else if (e.keyCode == 37) {
       // left arrow
	    key = 37;
		Csound.play();
		playTurn();
    }
    else if (e.keyCode == 39) {
       // right arrow
	  key = 39;
	  Csound.play();
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
	document.getElementById("00").innerHTML = padArr[0];
	document.getElementById("01").innerHTML = padArr[1];
	document.getElementById("02").innerHTML = padArr[2];
	document.getElementById("03").innerHTML = padArr[3];

	document.getElementById("10").innerHTML = padArr[4];
	document.getElementById("11").innerHTML = padArr[5];
	document.getElementById("12").innerHTML = padArr[6];
	document.getElementById("13").innerHTML = padArr[7];

	document.getElementById("20").innerHTML = padArr[8];
	document.getElementById("21").innerHTML = padArr[9];
	document.getElementById("22").innerHTML = padArr[10];
	document.getElementById("23").innerHTML = padArr[11];

	document.getElementById("30").innerHTML = padArr[12];
	document.getElementById("31").innerHTML = padArr[13];
	document.getElementById("32").innerHTML = padArr[14];
	document.getElementById("33").innerHTML = padArr[15];

	document.getElementById("40").innerHTML = padArr[16];
	document.getElementById("41").innerHTML = padArr[17];
	document.getElementById("42").innerHTML = padArr[18];
	document.getElementById("43").innerHTML = padArr[19];

	document.getElementById("50").innerHTML = padArr[20];
	document.getElementById("51").innerHTML = padArr[21];
	document.getElementById("52").innerHTML = padArr[22];
	document.getElementById("53").innerHTML = padArr[23];

	document.getElementById("60").innerHTML = padArr[24];
	document.getElementById("61").innerHTML = padArr[25];
	document.getElementById("62").innerHTML = padArr[26];
	document.getElementById("63").innerHTML = padArr[27];

	//update score baord
	strngScore = Score.toString();
	document.getElementById("Num").innerHTML = strngScore;

};
