
import {createWall as cm}  from '../../objects/wall';
var Wall =  Object.create(cm());

Wall.getStyle = function(){
  return {backgroundColor:'black'};
}

var createWall = function(){
    var wall = Object.create(Wall);
    return wall;
}

export default createWall;
