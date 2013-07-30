$(document).ready(function(){
	//alert('at least it loads');
	var beat;
	var beats;
	var sampClock;
	var tickClock;
	var i;
	var a=0;
	var hint=["white", "white", "white", "white", "white", "white", "white", "white"]
	var playFlag=false;//flags that the play button has been clicked for use for the compare function
	var answer=0;//variable to contain the number of correct beats.
	var score=0;
	$('.btn').attr("value","off");// sets all .btn attributes to off
	//console.log($('.btn').attr("value"));
	
	var audioElm = document.getElementById('twang');
    audioElm.pause();
	var audioElm2 = document.getElementById('clik');
    audioElm2.pause();
	
//----------------------------sample tick function----------------------------//
function sampTick(){
	           
	if(a<8){
		if(sample[a]){
			//console.log(a+' twang');
			audioElm.currentTime=0;
			audioElm.play();
		}else{
			//console.log(a);
			audioElm2.currentTime=0;
			audioElm2.play();
		}
		a=a+1;
		sampClock = setTimeout(function(){sampTick()},600);
	}else{
		$('#play').fadeIn('slow');
		
	}
}//end of sample tick function

//-----------------compare sample[] to rhythmn[]----------------------//
function compare(){for (i=0;i<8;i++){
	playFlag=false;
	console.log(rythmn);
	if(sample[i]===rythmn[i]){
			answer++;
			//console.log(i+" "+sample[i]+" "+rythmn[i]+" "+answer);
			hint[i]="green";
		}else if((rythmn[i]===true)&&(sample[i]===false)){
			hint[i]="red";
			//console.log(i+" "+sample[i]+" "+rythmn[i]+" "+answer+" logic says wrong");
		}else{
			//console.log(i+" "+sample[i]+" "+rythmn[i]+" "+answer+" logic says wrong");
		};
		if(answer===8){
			alert('correct');
			score=score+20;
			$('#points').html(score);
		}
	};
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

//-----------------when the play button is clicked----------------------//
var sample=[true,false,false,false,true,false,false,false];
$('#play').click(function(){
	alert('listen and match the rythmn');
	playFlag=true;
	setTimeout(function(){sampTick()},600);
	$('#play').fadeOut('fast');
	console.log("playBtn: playFlag is"+playFlag);
});


//-----------------when the start button is clicked----------------------//
	
	$('#start').click(function(){
		a=0;
		$('.wheel').clearQueue();
		$('#drive').clearQueue();
		console.log("playFlag is"+playFlag);
		beats=setTimeout(function(){tick()},600);
		$('#start').fadeOut('fast');
		//alert(beats);
	});//end of play button function

//-----------------when the reset button is clicked----------------------//

	$('#reset').click(function(){
		//console.log("reset");
		$('.main').clearQueue();
		a=0;
		answer=0;
		playFlag=false;
		rythmn=[false,false,false,false,false,false,false,false];
		for (var i = 7; i >= 0; i--) {
			var newSrc="img/wheel_0"+i+".png";
			tile="#pin_0"+i;
			$(tile).attr("src",newSrc);
		};

	});

});//end of document ready


//--------------------------drag and drop------------------------------//
$(".pin").draggable({revert:true, revertDuration:0, snap:".wheel-img", snapMode: "inner"});
	var rythmn=[false,false,false,false,false,false,false,false];

$(".wheel-img").droppable({

	drop:function(event, ui){
																	//ui is the dropped object
		var newSrc="img/wheel_n_"+$(this).attr('id')+".png";
	
																	//console.log(newSrc);
		$(this).attr('src',newSrc);
																	//ui.draggable( "option", "revert", false).draggable("disable");
																	//console.log($(this).attr('src'));
			beatString=$(this).attr('id');
			beat = beatString.substr(beatString.length - 1);
																	//console.log(beat);
																	//console.log($(this).attr("value"));
	if($(this).attr('alt')==="No-pin"){
		$(this).attr("alt","pinned");
		
		rythmn[beat]=true;					//adds the beat to the rythmn
		//console.log(rythmn[beat]);
	}else{
		$(this).attr("alt","No-pin");
		console.log($(this).attr("value"));
		rythmn[beat]=false;					//removes beat from the rythmn
	};
	}
});

//--------------------------junk-----------------------------------//



