import {MovableObject,getRandomAdjacentDestination} from '../movement';

var Monster = Object.create(MovableObject);
Monster.pace = 200; //this is going to be affected by the sreen resolution, so how can this be dynamic
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
//having this here indicates that all Monster types will do the same thing when moving
/**what does the refresh method need
 * {
 *    functoin:getNumberOfColumns// this is needed to calculate up or down
 *    function:getIndex() //index on layer? should the object itself know what index it occupies
 *    function:checkForCollision() 
 *             handleCollision() 
 *             eh? /
 *             is there another layer with an object on it at this index that does not allow passing, who handles the collision event like removing hit points
 *             what the hell cooridnates when two things collide, i guess the screen
 *    functoin:getTicks() // remember, using global things is not good, don't directly use the date object
 *    
 * }
 * 
 * refresh is respnseible for deciding its layer index on each refresh given where it curently is and if its desttination is occupied
 * actually, that is only true for movable objects, other objects could do nothing, or do something else having nothing to do with moving
 * it could be based on changing a property in itself to affect the ui display, such as : state = facing left, or something
 */
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