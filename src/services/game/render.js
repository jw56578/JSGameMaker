//this thing should abstract the process of adding things to the screen
//for example, now we are adding things to the screen by making a div a different color
// maybe that will change 
//well this thing can't be responsible for that because each individual thing needs to know what to do for itself
//it can't even determine where the thing goes because each scenario might be different


var objectsOnScreen = [];

//find a random open location on the screen 
//this has to be here because then every place you want to add something to the grid you have to remember
//to set isOccupied to true, must centralize this
//but then how do you let the individual things handle their representation on the screen
var renderToRandomLocation = function(obj,grid){
    var l = grid.length;
    while(l--){
        var g = grid[l];
        if(!g.isOccupied){
        obj.init(l);
        g.isOccupied = true;
        obj.setVisualRepresentation(g);
        break;
        }
    }
    objectsOnScreen.push(obj);
}

var renderToLocation = function(){


}
var requestAnimationFrameID;
function refresh(screen){
  //go though all registered monsters and call their move function 
  //this will move things way too fast
  //need to record time of last move and slow down Date.now()
  //only move things every 200 ms or whatever that makes sense
  var l = objectsOnScreen.length;
  while(l--){
    objectsOnScreen[l].onAnimationFrame(screen);
  }
  //emmit event that indicates all moving objects are done
  requestAnimationFrameID = requestAnimationFrame(refresh.bind(null,screen));
}


var clear = function(){
    objectsOnScreen= [];
}
  
export {renderToRandomLocation};
export {clear};
export {refresh};