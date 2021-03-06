//Global variables
var $boxes = $('.box');
var boardSize = 14; //number of wells on the board (including goals)
var spot1 = $('#1');
var spot2 = $('#2');
var spot3 = $('#3');
var spot4 = $('#4');
var spot5 = $('#5');
var spot6 = $('#6');
var goalRight = $('#7');
var spot8 = $('#8');
var spot9 = $('#9');
var spot10 = $('#10');
var spot11 = $('#11');
var spot12 = $('#12');
var spot13 = $('#13');
var goalLeft = $('#0');
var winnerSpot = $('#winnerSpot');


//for loop to click on each box in the array
$(".box").each(function(index){
   $(this).click(function(){   //recgonizing a click on a box
     if($(this).text() === '0'){   //checking if the innertext of the clicked box is 0
         console.log("no")    //if innertext is 0 - doesn't let the function run because of else
      } else {
           if($(this).hasClass("highlight") && $(this).hasClass("bottomrow")){ //checking for classes
             var stone_count = parseInt($(this).text());  //setting a variable to the stone value currently in the box
               var id = parseInt($(this).attr('id')); //setting a variable to the id of the box that was clicked
               for(var i = stone_count; i >=1; i--){ //for loop that is taking the stone count, checking if larger than 1, and counting down
                 var targetId = (id+i)%boardSize; //taking the id (which is now a number) and adding the stone count(which is also now a number)
                                                  //and adding them together --- % with the boardSize to ensure we wrap back around the board
                                                  //example - if we are on id 13 and we have 3 stones that will get to id 16 (which is not a spot on the board)
                                                  //so 16%14 and we get 2 - where we put our stone in id 2
               var targetCount = parseInt($('#'+targetId).text()); //getting the value of the targetId(the spot where we want to place our stone)
                   targetCount++; //(incrementing our target by 1 (can only place one stone at a time))
                   $("#" + targetId).text(targetCount); //placing our targetCount (the new amount of stones) in our targetId


            //skip other players goal + add two stones if pass the unlucky spot
               if(targetId === 0){
                  var goal = parseInt(goalLeft.text()); //setting a variable to the value (amount of stones) of player 2's goal
                  var total = (goal - 1); //reduce player 2's goal by 1 (this is basically having player 1 skip player 2's goal)
                  goalLeft.text(total); //setting player 2's goal new value
                  var unLucky = parseInt(spot13.text()); //setting a value to player 2's unlucky spot (the last spot before a players goal)
                  var unLuckyTotal = (unLucky + 1); //adding a second stone to player 2's unlucky spot
                  spot13.text(unLuckyTotal); //setting the new value of player 2's unlucky spot
               }



              //if the stone count goes over 14 - original spot value goes to 1
                if (stone_count >= 14){
                  $(this).text(1); //if more than 14 stones, the player is going to all the way around the board - thereby putting one stone in the well that they started in
                }else{
                  $(this).text(0); //if less than 14 stones, they are not going  all the way around the board so the starting well goes back to 0
                }
              }
            count++;


          } else if($(this).hasClass("highlight") && $(this).hasClass("toprow")){ // checking the classes - same code as above (not DRY!!)
               var stone_count = parseInt($(this).text());
                 var id = parseInt($(this).attr('id'));
                 for(var i = stone_count; i >=1; i--){
                   var targetId = (id+i)%boardSize;
                   var targetCount = parseInt($('#'+targetId).text());
                         targetCount++;
                         $("#" + targetId).text(targetCount);

                 if(targetId === 7){ //checking if the targetId is player 1's goal
                    var goal = parseInt(goalRight.text()); // setting a varaible to get the amount of stones in player 1's goal
                    var total = (goal - 1); // reducing player 1's goal by one (basically skipping the goal)
                    goalRight.text(total); //setting player 1's goal to the new value
                    var unLucky = parseInt(spot6.text());  //getting the value of player 1's unlucky spot
                    var unLuckyTotal = (unLucky + 1); //adding a second stone to player 1's unlucky spot
                    spot6.text(unLuckyTotal); // setting the new value of player 1's unlucky spot
                 }

                if (stone_count >= 14){ //same code as above (checking if there are 14 or more stones in players well)
                  $(this).text(1);    //not DRY!
                } else {
                  $(this).text(0);
                }
              }
        count++;  //incrementing the stone count by one
      }
    }
  })
})


//pick player - highlighed boxes determine turn - dont let highlight change
var count = 0;
$('.box').click(function() {
  var selected = $('.bottomrow'); // setting a variable to the boxes in the bottom row
  var notSelected = $('.toprow'); // setting a variable to the boxes in the top row

     selected.toggleClass("highlight", count%2 === 0); //setting the bottomrow to class highlight when the count is even
                                                      //highlight means the boxes are clickable & therefore a players turn
     selected.toggleClass("noHighlight", count%2 !== 0); //setting the bottomrow to class noHighlight when the count is odd
                                                        //no highlight means the boxes are unclickable - the function isnt running
     notSelected.toggleClass("noHighlight", count%2 === 0); //setting the toprow to class noHighlight when count is even
     notSelected.toggleClass("highlight", count%2 !== 0); //setting the toprow to class highlight when count is odd
});



//find winner - add remaining stones to winners score
$(".box").each(function(){
  $(this).click(function(){
   if ((spot1.text() === '0') && (spot2.text() === '0') && (spot3.text() === '0') //checking if bottom rows stone count is 0
      && (spot4.text() === '0') && (spot5.text() === '0') && (spot6.text() === '0')) {
      var a = parseInt(spot8.text()); //taking the inner value of each box in the top row
      var b = parseInt(spot9.text());
      var c = parseInt(spot10.text());
      var d = parseInt(spot11.text());
      var e = parseInt(spot12.text());
      var f = parseInt(spot13.text());
      var g = parseInt(goalRight.text()); //taking inner value of player 1's goal
      var total = parseInt(a + b + c + d + e + f + g); //adding all the inner values from the toprow together and adding it to player 1's goal (because player 1 empty their wells first and therfore get player 2's remaining stones)
      goalRight.text(total); //setting player 1's goal to the new value
      spot8.text(0); //setting the toprows inner values to 0
      spot9.text(0);
      spot10.text(0);
      spot11.text(0);
      spot12.text(0);
      spot13.text(0);

          if (parseInt(goalLeft.text()) > parseInt(goalRight.text())) { //if player 2 has more stones than player 1 = player 2 wins
            console.log(this)
            winnerSpot.text("Player 2 Wins!!!");
            console.log("a goalLeft > goalRight")
          }
          else if (parseInt(goalLeft.text()) < parseInt(goalRight.text())) { //if player 1 has more stones than player 2 = player 1 wins
            console.log(this)
            winnerSpot.text("Player 1 Wins!!!");
            console.log("b goalLeft < goalRight")
          } else {
            console.log(this)
            winnerSpot.text("It's a Tie!!!"); //if equal amount of stones = tie!
            console.log("c goalLeft = goalRight")
          }

  } else if ((spot8.text() === '0') && (spot9.text() === '0') && (spot10.text() === '0') //checking if toprow stone count is 0
      && (spot11.text() === '0') && (spot12.text() === '0') && (spot13.text() === '0')) {
      var a = parseInt(spot1.text());//taking the inner value of each box in the bottom row
      var b = parseInt(spot2.text());
      var c = parseInt(spot3.text());
      var d = parseInt(spot4.text());
      var e = parseInt(spot5.text());
      var f = parseInt(spot6.text());
      var g = parseInt(goalLeft.text()); //taking inner value of player 2's goal
      var total = parseInt(a + b + c + d + e + f + g);//adding all the inner values from the bottomrow together and adding it to player 2's goal
      goalLeft.text(total); //setting player 2's goal to the new value
      spot1.text(0);//setting the toprows inner values to 0
      spot2.text(0);
      spot3.text(0);
      spot4.text(0);
      spot5.text(0);
      spot6.text(0);

          if(parseInt(goalLeft.text()) < parseInt(goalRight.text())) { //if player 1 has more stones than player 2, player 1 wins
            console.log(this)
            winnerSpot.text("Player 1 Wins!!!");
            console.log("d goalLeft < goalRight")
          }
          else if(parseInt(goalLeft.text()) > parseInt(goalRight.text())) { //if player 2 has more stones than player 1, player 2 wins
            console.log(this)
            winnerSpot.text("Player 2 Wins!!!");
            console.log("e goalLeft > goalRight")
          } else {
            console.log(this)
            winnerSpot.text("It's a Tie!!!"); //if the scores are the same, the players tie!
            console.log("f goalLeft = goalRight")
          }
    }
  })
})


//button function to clear the board
myFunction = function() {
  document.location.href = ''; //refresh the board
 }
