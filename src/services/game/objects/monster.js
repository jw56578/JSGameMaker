import {MovableObject,getRandomAdjacentDestination} from '../movement';

var Monster = Object.create(MovableObject);
Monster.pace = 100; //this is going to be affected by the sreen resolution, so how can this be dynamic
Monster.refreshFuncIndex = 0;
Monster.handleCollisionIndex = 0;
Monster.renderIndex = 0;

var createMonster = function(layer){
  var monster = Object.create(Monster);
  monster.steps = 0;
  monster.ticks = -Infinity;
  return monster;
}

export {createMonster};
export {Monster}