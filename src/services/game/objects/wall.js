
import BaseObject from './base';

var Wall = Object.create(BaseObject);
Wall.handleCollisionIndex = 2;
Wall.renderIndex = 2;
var createWall = function(){
  var wall = Object.create(Wall);
  return wall;
}

export {createWall};
