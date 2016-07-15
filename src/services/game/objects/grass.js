
import BaseObject from './base';

var Grass = Object.create(BaseObject);
Grass.handleCollisionIndex = 3;
Grass.renderIndex = 3;
var createGrass = function(){
  var grass = Object.create(Grass);
  return grass;
}

export {createGrass};
