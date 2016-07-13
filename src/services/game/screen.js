
var Screen = {
    init:initialize,
    addToRandomLayerLocation:addToRandomLayerLocation,
    refresh:refresh,
    addToLayerLocation:addToLayerLocation,
    notifyOfKeyDown:keyDown //should there be a function for each key that could be pressed
    //should there be a 
}
function keyDown(){

}
/**
 * how to make this functional so that nothing is updated. Just create new objects
 */
function refresh(){
    var l = this.layerObjects.length;
    while(l--){
        var layer = this.layerObjects[l];
        if(!layer)
            continue;
        var l2 = layer.length;
        while(l2--){
            var obj = layer[l2];
            if(obj && obj.refresh){
                obj.refresh(layer,this.columns); //change this to send in a object of settings
            }
        }
    }
    return this;
}
function addToLayerLocation(obj,layerIndex,index){
   var layer = this.layers[layerIndex],l = layer.length;
    if(!this.layerObjects[layerIndex]){
        this.layerObjects[layerIndex] = [];
    }
    var objLayer = this.layerObjects[layerIndex];
    objLayer[index] = obj;
    obj.gridIndex = index;
}
/**
 * Obviously want different random logic, keeping simple for now
 */
function addToRandomLayerLocation(obj,layerIndex){
    var layer = this.layers[layerIndex],l = layer.length;
    if(!this.layerObjects[layerIndex]){
        this.layerObjects[layerIndex] = [];
    }
    var objLayer = this.layerObjects[layerIndex];
    while(l--){
        var g = objLayer[l];
        if(!g){
            objLayer[l] = obj;
            obj.gridIndex = l; /// not sure if this can be done a better way
            return;
        }
    }
}
var createScreen = function(layers,rows, columns,cellHeight,cellWidth){
    var screen = Object.create(Screen);
    screen.init(layers,rows, columns,cellHeight,cellWidth);
    return screen;
}
//create layer of things that don't move
function createLayer(rows, columns,cellHeight,cellWidth){
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
function initialize(layers,rows, columns,cellHeight,cellWidth){
    this.layers = [];
    this.layerObjects =[]; // one entry for each layer which then contains an array of each object on the layer
    while(layers --){
        this.layers.push(createLayer(rows,columns,cellHeight,cellWidth));
    }
    this.columns = columns;
    this.rows = rows;
}
export default createScreen;
