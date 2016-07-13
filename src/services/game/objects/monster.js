import {MovableObject,getRandomAdjacentDestination} from '../movement';

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
Monster.refresh=function(layer,columns){
  var grid = layer;
  if(!this.getPaceIsOn())
    return;
  this.ticks = Date.now();
  var moveTo = this.getDestinationIndex(columns);

  //how can you solve this, if you do recursion then it could get stuck on a direction and block everything
  //so you have to somehow know if you can't go somewhere and choose another direction besides that direction
  if(moveTo < 0 || moveTo > layer.length-1){
    //this.refresh(layer,columns);
    return;
  }
/*  if( grid[moveUp].isOccupied){
    //how do we handle collision
    //function? taking source and target
    return;
  }*/
  if( grid[moveTo]){
    //how do we handle collision
    //function? taking source and target
    return;
  }
  grid[this.gridIndex] = null;
  grid[moveTo] = this;
  this.gridIndex = moveTo;
  return this;
  
}

var createMonster = function(layer){
  var monster = Object.create(Monster);
  monster.steps = 0;
  monster.ticks = -Infinity;
  return monster;
}

export {createMonster};
export {Monster}