import {MovableObject,getRandomAdjacentDestination} from './movement';
import {renderToRandomLocation} from './render';

var Monster = Object.create(MovableObject);
Monster.pace = 200;
Monster.getDestinationIndex = function(columns){
    if(this.steps === 10 || this.steps ===0){
      this.steps = 0;
      this.getDestinationIndexFunc = getRandomAdjacentDestination();
    }
    this.steps ++;
    return this.getDestinationIndexFunc(this.gridIndex,columns);
  }

//having this here indicates that all Monter types will do the same thing when moving
Monster.onAnimationFrame=function(screen){
  var grid = screen.grid;
  //choose a direction to go in
  //get the grid index for the desired move
  //make sure nothing is in the desired destination
  //update the grid styles
  //record how many steps have been taken in a direction
  if(Date.now() - this.ticks < this.pace){
    return;
  }

  this.ticks = Date.now();
  //not sure how to access the grid from here. just use global for now
  var moveUp = this.getDestinationIndex(screen.columns);
  if(!grid[moveUp] || grid[moveUp].isOccupied || moveUp < 0)
    return;
    
  grid[this.gridIndex].backgroundColor = 'white';
  grid[moveUp].backgroundColor = 'purple';
  //how can this be handled better
  grid[this.gridIndex].isOccupied = false;
  grid[moveUp].isOccupied = true;
  this.gridIndex = moveUp;
  
}
Monster.setVisualRepresentation=function(gridCell){
   gridCell.backgroundColor = 'purple';
}

var getMonster = function(screen){
  var monster = Object.create(Monster);
  renderToRandomLocation(monster,screen.grid); //this might be pointless
  return monster;
}

export default getMonster;