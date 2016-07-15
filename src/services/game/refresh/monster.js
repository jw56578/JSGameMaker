import {MovableObject,getRandomAdjacentDestination} from '../movement';

var getDestinationIndex = function(monster, gridIndex,columns){
    if(!monster.getDestinationIndexFunc || monster.steps === 5 || monster.steps ===0){
      monster.steps = 0;
      monster.getDestinationIndexFunc = getRandomAdjacentDestination();
    }
    monster.steps ++;
    return monster.getDestinationIndexFunc(gridIndex,columns);
  }
var getPaceIsOn = function(monster){
  if(Date.now() - monster.ticks < monster.pace){
    return false;
  }
  return true;
}
var refresh=function(monster,funcs){
  if(!getPaceIsOn(monster))
    return;
  monster.ticks = funcs.getTicks();
  var gridIndex = funcs.getIndex();
  var moveTo = getDestinationIndex(monster, gridIndex,funcs.getNumberOfColumns());
  funcs.changeIndex(gridIndex,moveTo,monster);
  return monster;
}

export {refresh};
