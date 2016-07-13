var Wall = { };

Wall.getStyle = function(){
  return {backgroundColor:'black'};
}

var createWall = function(){
    var wall = Object.create(Wall);
    return wall;
}

export default createWall;
