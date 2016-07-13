
var Screen = {
    init:initialize,
    addToRandomLayerLocation:addToRandomLayerLocation,
    refresh:refresh,
    addToLayerLocation:addToLayerLocation,
    notifyOfKeyDown:keyDown, //should there be a function for each key that could be pressed
    refreshFuncs:{
        getNumberOfColumns:null,
        getIndex:null, //this function depends on the object
    }
    //should there be a 
}
function keyDown(){

}
function changeIndex(sourceIndex, destinationIndex,layer,obj){
    var l = this.layerObjects.length;
    while(l--){
        let currentLayer = this.layerObjects[l];
        if(!currentLayer)
            continue;
        //check for collision hard coding no collision allowed for right now
        if(currentLayer[destinationIndex]){
            return;
        }
    }
      //this is based  on whether the thing can go up or down through the screen
  //if it can, need to calcualte the index on the other side
    if(destinationIndex < 0 || destinationIndex > layer.length-1){
      return;
    }
    layer[sourceIndex] = null;
    layer[destinationIndex] = obj;
    obj.gridIndex = destinationIndex;
}
/**
 * how to make this functional so that nothing is updated. Just create new objects
 * source of performance issue. it is looping over the entire array when most of the array is probably empty, how fix this?
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
                obj.refresh({
                            getNumberOfColumns:function(){return this.columns}.bind(this),
                            getIndex:function(){return l2;},
                            getTicks:function(){return Date.now();},
                            changeIndex:function(sourceIndex, destinationIndex,obj){
                                changeIndex.bind(this,sourceIndex,destinationIndex,layer,obj)();
                            }.bind(this)
                        }); 
                    //is there a better way to do this
                    //how is an object supposed to know if it collided with something on another layer
                    //perhaps just send in functions for it to do its work

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
