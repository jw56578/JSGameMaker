import {MovableObject,getRandomAdjacentDestination} from '../movement';

var Monster = Object.create(MovableObject);
Monster.pace = 100; //this is going to be affected by the sreen resolution, so how can this be dynamic
Monster.getCollisionHandler = function(){
    return {isNeutral:function(){return false;}}
}
Monster.getDestinationIndex = function(gridIndex,columns){
    if(this.steps === 5 || this.steps ===0){
      this.steps = 0;
      this.getDestinationIndexFunc = getRandomAdjacentDestination();
    }
    this.steps ++;
    return this.getDestinationIndexFunc(gridIndex,columns);
  }
Monster.getPaceIsOn = function(){
  if(Date.now() - this.ticks < this.pace){
    return false;
  }
  return true;
}
Monster.refresh=function(funcs){
  if(!this.getPaceIsOn())
    return;
  this.ticks = funcs.getTicks();
  var gridIndex = funcs.getIndex();
  var moveTo = this.getDestinationIndex(gridIndex,funcs.getNumberOfColumns());
  funcs.changeIndex(gridIndex,moveTo,this);
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