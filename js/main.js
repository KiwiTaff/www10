rythmn=[false,false,false,false,false,false,false,false];

$(document).ready(function(){

	//----------------------------preloader-------------------------------//
	var timer;	//timer for splash screen
	
	//calling jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		loaderVPos: '80%',
		autoClose: false,
		closeBtnText: "Let's Play!",
		splashFunction: function() {  
			//passing Splash Screen script to jPreLoader
			$('#jSplash').children('section').not('.selected').hide();
			$('#jSplash').hide().fadeIn(800);
			
			timer = setInterval(function() {
				splashRotator();
			}, 8000);
		}
	}, function() {	//callback function
		clearInterval(timer);
		$('#footer')
		.animate({"bottom":0}, 500);
		$('#header')
		.animate({"top":0}, 800, function() {
			$('#wrapper').fadeIn(1000);
		});
	});
	
	//create splash screen animation
	function splashRotator(){
		var cur = $('#jSplash').children('.selected');
		var next = $(cur).next();
		
		if($(next).length != 0) {
			$(next).addClass('selected');
		} else {
			$('#jSplash').children('section:first-child').addClass('selected');
			next = $('#jSplash').children('section:first-child');
		}
			
		$(cur).removeClass('selected').fadeOut(800, function() {
			$(next).fadeIn(800);
		});
	}
	
	var beat
	, 	beats
	, 	sampClock
	, 	tickClock
	, 	i
	, 	a=0
	, 	listenFlag=false//flags that the listen button has been clicked for use for the compare function
	, 	answer=0//variable to contain the number of correct beats.
	, 	score=0
	;
	var hint=["white", "white", "white", "white", "white", "white", "white", "white"]
	$instructions = $('.instructions');
	$closeBtn = $('.closeBtn');
	$('.btn').attr("value","off");// sets all .btn attributes to off
	//console.log($('.btn').attr("value"));
	
	var audioElm = document.getElementById('twang');
    audioElm.pause();
	var audioElm2 = document.getElementById('clik');
    audioElm2.pause();

//----------------------------hide instructions-------------------------------//

  $closeBtn.click(function(e){
    e.preventDefault(e);
    $instructions.hide("slow");                                
  });
	
//---------------------------sample tick function-----------------------------//

function sampTick(){
	           
	if(a<8){
		if(sample[a]){
			console.log(a+' twang');
			audioElm.currentTime=0;
			audioElm.play();
		}else{
			console.log(a);
			audioElm2.currentTime=0;
			audioElm2.play();
		}
		a=a+1;
		setTimeout(function(){sampTick()},600);
	}else{
		$('#listen').fadeIn('slow');
	}
}//end of sample tick function

//-----------------compare sample[] to rhythmn[]----------------------//
function compare(){
	listenFlag=false;
	console.log(rythmn);
	for (i=0;i<8;i++){

		if(rythmn[i]){
			if(sample[i]){
				hint[i]="green";
				console.log("for beat "+i+" guess is correct" );
				answer++;
			}else{
				hint[i]="red";
				console.log("for beat "+i+" guess is wrong" );
			}
		}else{
			if(!sample[i]){
				answer++;
			}
		}
	};
	if(answer===8){
		alert('correct');
		score=score+20;
		$('#points').html(score);
	}else{
		alert('not quite guess again');
	}
};

//----------------------------tick function----------------------------//

function tick(){
	$('.wheel').transition({ rotate: '360deg' },4800,'linear');
	$('#drive').transition({ rotate: '120deg' },4800,'linear');
	tock();
}

function tock(){
	if(a<8){
		if(rythmn[a]){
			//console.log(a+' twang');
			audioElm.currentTime=0;
			audioElm.play();
		}else{
			//console.log(a);
			audioElm2.currentTime=0;
			audioElm2.play();
		}
		a=a+1;
		
		tickClock = setTimeout(function(){tock()},600);
	}else{
		$('#start').fadeIn('slow');
		answer=0;
		compare();
	}

}//end of tick function

//-----------------when the listen button is clicked----------------------//
var sample=[true,false,false,false,true,false,false,false];
$('#listen').click(function(){
	alert('listen and match the rythmn');
	listenFlag=true;
	setTimeout(function(){sampTick()},600);
	$('#listen').fadeOut('fast');
	console.log("listenBtn: listenFlag is"+listenFlag);
});


//-----------------when the start button is clicked----------------------//
	
	$('#start').click(function(){
		a=0;
		$('#drive, .wheel').css("-webkit-transform", "none");
		$('#drive, .wheel').css("-moz-transform", "none");
		$('#drive, .wheel').css("-ms-transform", "none");
		$('#drive, .wheel').css("transform", "none");
		console.log(rythmn);
		console.log("listenFlag is"+listenFlag);
		beats=setTimeout(function(){tick()},600);
		$('#start').fadeOut('fast');
		//alert(beats);
	});//end of listen button function

//-----------------when the reset button is clicked----------------------//

	$('#reset').click(function(){
		
		a=0;
		answer=0;
		listenFlag=false;
		rythmn=[false,false,false,false,false,false,false,false];
		for (var i = 7; i >= 0; i--) {
			var newSrc="img/wheel_0"+i+".png";
			tile="#pin_0"+i;
			$(tile).attr("src",newSrc).attr("alt","No-pin");
		};

	});

});//end of document ready


//--------------------------drag and drop------------------------------//
$(".pin").draggable({revert:true, revertDuration:20, snap:".wheel-img", snapMode: "inner"});
	

$(".wheel-img").droppable({

	drop:function(event, ui){
																	//ui is the dropped object
		var newSrc="img/wheel_n_"+$(this).attr('id')+".png";
		$(this).attr('src',newSrc);
																	//ui.draggable( "option", "revert", false).draggable("disable");
		beatString=$(this).attr('id');
		beat = beatString.substr(beatString.length - 1);

		if($(this).attr('alt')==="No-pin"){
			$(this).attr("alt","pinned");
			rythmn[beat]=true;					//adds the beat to the rythmn
			console.log(rythmn[beat]);
		}
	}
});


//--------------------------junk-----------------------------------//



