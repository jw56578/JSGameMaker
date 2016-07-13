
import BaseObject from './base';

var Wall = Object.create(BaseObject);

Wall.getCollisionHandler = function(){
    return {isNeutral:function(){return false;}}
}

var createWall = function(){
  var wall = Object.create(Wall);
  return wall;
}

export {createWall};
