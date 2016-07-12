import {MovableObject,getRandomAdjacentDestination} from './movement';
import {renderToRandomLocation} from './render';

var Monster = Object.create(MovableObject);
Monster.pace = 200;
Monster.getDestinationIndex = function(columns){
    if(this.steps === 5 || this.steps ===0){
      this.steps = 0;
      this.getDestinationIndexFunc = getRandomAdjacentDestination();
    }
    this.steps ++;
    return this.getDestinationIndexFunc(this.gridIndex,columns);
  }
Monster.getPaceIsOn = function(){
  if(Date.now() - this.ticks < this.pace){
    return false;
  }
  return true;
}
//having this here indicates that all Monster types will do the same thing when moving
Monster.onAnimationFrame=function(screen){
  var grid = screen.grid;
  if(!this.getPaceIsOn())
    return;
  this.ticks = Date.now();
  var moveUp = this.getDestinationIndex(screen.columns);
  if(!grid[moveUp] || moveUp < 0)
    return;
  if( grid[moveUp].isOccupied){
    //how do we handle collision
    //function? taking source and target
  }

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

var getMonster = function(layer){
  var monster = Object.create(Monster);
  renderToRandomLocation(monster,layer); //this might be pointless
  return monster;
}

export default getMonster;