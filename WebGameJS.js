//********** VARIABLES ******** */
var timer = null;
var player1score = 0;
var player2score = 0;
var p1fold = false;
var p2fold = false;
var audio = new Audio("cardflip.mp3");
var monkey = new Audio("Chimpanzee-SoundBible.com-901310467.mp3");

// ***************** MAIN GAME ******************
var cards = new Array(2,3,4,5,6,7,8,9,10,10,10,10,1);
var cardImg = new Array(13);
for(var i = 0; i < cardImg.length; i++)
{cardImg[i] = new Image();}
cardImg[0].src = "2.jpg";
cardImg[1].src = "3.jpg";
cardImg[2].src = "4.jpg";
cardImg[3].src = "5.jpg";
cardImg[4].src = "6.jpg";
cardImg[5].src = "7.jpg";
cardImg[6].src = "8.jpg";
cardImg[7].src = "9.jpg";
cardImg[8].src = "10.jpg";
cardImg[9].src = "jack.jpg";
cardImg[10].src = "queen.jpg";
cardImg[11].src = "king.jpg";
cardImg[12].src = "ace.jpg";
// *************** TURN FUNCTION **************
function turn(){
	var rand = Math.floor(Math.random()* 14);
	var cardflip = document.getElementById("flip");
	this.cardval = cards[rand];
	this.picture = cardImg[rand].src;
}
// *********** FOLDING ********************
function endFold1(){
	document.getElementById("hit1").style.visibility = "hidden";
	document.getElementById("output").innerHTML = "Player 1 folded";
	p1fold = true;
	document.getElementById("tfp1").innerHTML = "Folded";
	document.getElementById("monk1").style.visibility = 'hidden';
	gameResult();
}
function endFold2(){
	document.getElementById("hit2").style.visibility = "hidden";
	document.getElementById("output").innerHTML = "Player 2 folded";
	p2fold = true;
	document.getElementById("tfp2").innerHTML = "Folded";
	document.getElementById("monk2").style.visibility = 'hidden';
	gameResult();
}
//************* COUNTDOWN *********** */
function startCount()
{timer = window.setInterval(countdown,50);}

function stopCount()
{window.clearInterval(timer);}

function countdown(){		
		if(player1score > 0)
		{player1score-=1;}
		document.getElementById("p1score").innerHTML = player1score;				
		
		if(player2score > 0)
		{player2score-=1;}
		document.getElementById("p2score").innerHTML = player2score;

		if(player1score == 0 && player2score == 0)
		{stopCount();}		
}
//**************** GAME RESULTS *********************** */
function gameResult(){	
	if(p1fold && p2fold){
		var textout;
		if(player1score == 21 && player2score == 21)
		{textout = "You both tie with a win";}
		else if(player1score == player2score)
		{textout = "Tie!";}
		else if(player1score <= 21 && player1score > player2score)
		{textout = "Player 1 wins!";}
		else if(player2score <= 21 && player2score > player1score)
		{textout = "Player 2 wins!";}
		else if(player1score <= 21 && player1score > player2score)
		{textout = "Player 1 wins!";}
		else if(player2score > 21 && player1score <= 21)
		{textout = "Player 1 wins!";}
		else if(player1score > 21 && player2score <= 21)
		{textout = "Player 2 wins!";}
		else
		{textout = "You all lose!";}
		document.getElementById("output").innerHTML = textout;
		monkey.play();
	}
}
//player 1 *****************************
function player1GO(){
	turn();	
	player1score += cardval;
	document.getElementById("p1score").innerHTML = player1score;
	var img = new Image();
	img.src = picture;
	var div1 = document.getElementById("cardset1");
	div1.appendChild(img);
	document.getElementById("output").innerHTML = cardval;
	audio.play();	
}

//player2 *****************************
function player2GO(){
	turn();
	player2score += cardval;
	document.getElementById("p2score").innerHTML = player2score;
	var img = new Image();
	img.src = picture;
	var div1 = document.getElementById("cardset2");
	div1.appendChild(img);
	document.getElementById("output").innerHTML = cardval;
	audio.play();
}
// ********************************** RESET GAME ***********************************
function gameStart(){
	document.getElementById("p1score").innerHTML = null;
	document.getElementById("p2score").innerHTML = null;
	document.getElementById("cardset1").innerHTML = null;
	document.getElementById("cardset2").innerHTML = null;
	document.getElementById("hit1").style.visibility = "visible";
	document.getElementById("hit2").style.visibility = "visible";
	document.getElementById("output").innerHTML = null;
	p1fold = false;
	p2fold = false;
	document.getElementById("tfp1").innerHTML = null;
	document.getElementById("tfp2").innerHTML = null;
	document.getElementById("monk1").style.visibility = 'visible';
	document.getElementById("monk2").style.visibility = 'visible';	
	startCount();

}
// ************ WINDOW CALL ************
window.onload = function(){	
	document.getElementById("hit1").onclick = player1GO;
	document.getElementById("hit2").onclick = player2GO;
	document.getElementById("fold1").onclick = endFold1;
	document.getElementById("fold2").onclick = endFold2;
	document.getElementById("begin").onclick = gameStart;
	document.onkeyup = function(e){
		if (e.which == 65)
		{player1GO();}
		else if (e.which == 70)
		{endFold1();}
		else if (e.which == 97)
		{player2GO();}
		else if (e.which == 99)
		{endFold2();}
		else if (e.which == 82)
		{gameStart();}
	}	
}
