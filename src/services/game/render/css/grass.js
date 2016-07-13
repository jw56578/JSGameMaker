import {createGrass as cm}  from '../../objects/grass';

var Grass = Object.create(cm());

Grass.getStyle = function(){
  return {backgroundColor:'green'};
}

var createGrass = function(){
    var grass = Object.create(Grass);
    return grass;
}

export default createGrass;


