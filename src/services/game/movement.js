var destinationCalculations = [
    function(gridIndex,columns){return gridIndex - columns;},  //up
    function(gridIndex,columns){return gridIndex + columns;},  //down
    function(gridIndex){return gridIndex - 1;},  //left
    function(gridIndex){return gridIndex + 1;},  //right
  ];
var getRandomAdjacentDestination = function(){
    var randomIndex = Math.floor(Math.random() * (4))
    return destinationCalculations[randomIndex];
}
var getKeyBasedDestination = function(keydowned,currentIndex){
    var destination = destinationCalculations[keydowned];
    destination = destination || function(){return currentIndex};
    return destination;
}

var MovableObject = {
  init:function(gridIndex){
    this.gridIndex = gridIndex;
    this.ticks = -Infinity;
    this.steps = 0;
  }
  
};

export {MovableObject};
export {getRandomAdjacentDestination};
export {getKeyBasedDestination};