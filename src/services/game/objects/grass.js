
import BaseObject from './base';

var Grass = Object.create(BaseObject);

Grass.getCollisionHandler = function(){
    return {isNeutral:function(){return true;}}
}

var createGrass = function(){
  var grass = Object.create(Grass);
  return grass;
}

export {createGrass};
