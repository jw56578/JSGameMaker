
var Screen = {
    init:initialize
}
var createScreen = function(rows, columns,cellHeight,cellWidth){
    var screen = Object.create(Screen);
    screen.init(rows, columns,cellHeight,cellWidth);
    return screen;
}
//create layer of things that don't move
function createLayerOne(rows, columns,cellHeight,cellWidth){
    var grid = [];
    var topOffset = 0;
    var leftOffset = 0;
    var width = cellWidth;
    var height = cellHeight;
    var length = rows * columns;
    for(var i =1; i <= length; i ++){ 
        var isEdge = i <= columns || i > length - columns || i % columns === 0 || (i -1) % columns === 0;   
         var cell = {
            id: i -1,
            x:topOffset,
            y:leftOffset,
            width: width ,
            height: height,
            isEdge:isEdge,
            isOccupied:false
        }
        leftOffset += width;
        if(i !==0 && i % columns === 0){
            topOffset += height;
            leftOffset = 0;
        }
        grid.push(cell);
    }
    return grid;
}
function initialize(rows, columns,cellHeight,cellWidth){
    //should there be layers or 2 seperate data structures for map items and the things that are part of the map
    //create a layer object and try this out
    //hard code layers for now to test
    var layers = [];
    layers.push(createLayerOne(rows,columns,cellHeight,cellWidth));
    this.layers = layers;
    this.columns = columns;
    this.rows = rows;
}
export default createScreen;