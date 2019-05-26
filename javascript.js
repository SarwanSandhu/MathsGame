var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;
//if we clicl on start/reset

document.getElementById("startReset").onclick=function(){
    //if we are playing
    if(playing == true){
        location.reload(); //reload page i.e reset button activate
        
    }else{                              //if we are not playing
        //set score to 0
        score=0;
        
        //change mode to playing
        playing=true;
        document.getElementById("scorevalue").innerHTML=score;
   
        //show countdown box
        show("timeremaining");
        timeremaining=60;
        
        //change button to reset
        document.getElementById("startReset").innerHTML="Reset Game";
        
        //hide game over box
        hide("gameover");
      
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        //start countdown
        startcountdown();
        
        //generate a new Q&A
        
        generateQA();
        
    }
    
}
for(i=1;i<5;i++){
    
document.getElementById("box"+ i).onclick=function(){
    //check if we are playing
    if(playing==true){//yes
        if(this.innerHTML == correctAnswer){
            //correct answer
            
            score ++;
            document.getElementById("scorevalue").innerHTML=score;
            //hide wrong box and show correct box
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);
            
            //Generate new Q&A
            
            generateQA();
        }else{
            //wrong answer
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
        }
    }
}
}
//funtions

//startcounter

function startcountdown(){
    action=setInterval(function(){
        timeremaining -=1;
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){ //game over
            stopcountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML="<p> Game Over!</p><p> your score is " + score + ".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startReset").innerHTML="Start Game";
        }
        
    },1000);
}

function stopcountdown(){
    clearInterval(action);
}
function hide(id){
    document.getElementById(id).style.display="none";
}
//show an element
function show(id){
    document.getElementById(id).style.display="block";
}
 //generate question and answers

function generateQA(){
    //generate two numbers in queation box
    var x = 1+ Math.round(9*Math.random()); // to except 0 we are adding 1
    var y = 1+ Math.round(9*Math.random());
    correctAnswer=x*y; // store multiplication
    document.getElementById("question").innerHTML=x + "x" + y;
    
    var correctPosition = 1+ Math.round(3*Math.random()); //find any random position of box to store correct value
    document.getElementById("box"+ correctPosition).innerHTML=correctAnswer; //fill one box with the correct answers
    
    var answers=[correctAnswer];
    for(i=1;i<5;i++){ //fill other boxes with wrong answers
        if(i!= correctPosition){ //except the correct position
            var wrongAnswer;
           do{
                wrongAnswer=(1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); // a wrong answer
               
           } while(answers.indexOf(wrongAnswer)>-1)  // wrong answer is not same as correct answer and it is not same as other wrong answers if yes run do   
        document.getElementById("box"+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}