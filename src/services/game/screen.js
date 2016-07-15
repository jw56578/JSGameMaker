import {refreshFuncs} from './refresh';
import {collisionHandlers} from './collision';

var Screen = {
    init:initialize,
    refreshFuncs:{
        getNumberOfColumns:null,
        getIndex:null, //this function depends on the object
    }
    //should there be a 
}
function notifyOfArrowUpPress(screen){
    screen.keyDown = 0;
}
function notifyOfArrowDownPress(screen){
    screen.keyDown = 1;
}

function notifyOfArrowLeftPress(screen){
    screen.keyDown = 2;
}
function notifyOfArrowRightPress(screen){
    screen.keyDown = 3;
}
function changeIndex(sourceIndex, destinationIndex,layer,obj){
    var l = this.layerObjects.length;
    while(l--){
        let currentLayer = this.layerObjects[l];
        if(!currentLayer)
            continue;
        //check for collision hard coding no collision allowed for right now
        //how is the collision handler going to decide that the thing can move into the destination or not
        //do you get the collision handler from the source or target

        /*so i'm like the thing moving and im like okay this thing senses that something is already where i want to go
        so then i have to somehow handle what i collided into
        the thing i collided into has to handle something
        then i have to somehow know if i can go to wherever i wanted to go or not
         */
        var destination = currentLayer[destinationIndex];
        if(destination){
            var sourceHandler = collisionHandlers[obj.handleCollisionIndex];
            var destinationHandler = collisionHandlers[destination.handleCollisionIndex];
            if(destinationHandler){
                //EH?
                if(destinationHandler.isNeutral()){
                    continue;
                }else{
                    return;
                }
            }
            
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
 * 
 * interesting bug - if you are looping and the refresh causes the thing to move its location then the loop can possiblly revisit something it already did did
 * this will cause the thing to move its location again
 * 
 * perfect example of mutating state.  create an entirely new state
 * 
 */
function refreshScreen(screen){
    return (function(){
        //temp solution to deal with visited objects
        var visited  =[];
        var l = this.layerObjects.length;
        while(l--){
            let layer = this.layerObjects[l];
            if(!layer)
                continue;
            let l2 = layer.length;
            while(l2--){
                var obj = layer[l2];
                if(obj && visited.indexOf(obj) === -1 && refreshFuncs[obj.refreshFuncIndex]){
                    refreshFuncs[obj.refreshFuncIndex](obj,{
                            getKeyDown:function(){return this.keyDown}.bind(this),
                            getNumberOfColumns:function(){return this.columns}.bind(this),
                            getIndex:function(){return l2;},
                            getTicks:function(){return Date.now();},
                            changeIndex:function(sourceIndex, destinationIndex,obj){
                                changeIndex.bind(this,sourceIndex,destinationIndex,layer,obj)();
                            }.bind(this)
                    }); 
                    visited.push(obj);
                }
            }  
        }
        this.keyDown = null;
        return this;
    }).bind(screen)();
    
}
function addToLayerLocation(screen,obj,layerIndex,index){
   var layer = screen.layers[layerIndex],l = layer.length;
    if(!screen.layerObjects[layerIndex]){
        screen.layerObjects[layerIndex] = [];
    }
    var objLayer = screen.layerObjects[layerIndex];
    objLayer[index] = obj;
    return this;
}
/**
 * Obviously want different random logic, keeping simple for now
 */
function addToRandomLayerLocation(screen, obj,layerIndex){
    var layer = screen.layers[layerIndex],l = layer.length;
    if(!screen.layerObjects[layerIndex]){
        screen.layerObjects[layerIndex] = [];
    }
    var objLayer = screen.layerObjects[layerIndex];
    while(l--){
        var g = objLayer[l];
        if(!g){
            objLayer[l] = obj;
            return;
        }
    }
    return this;
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
        var isTopEdge = i <= columns;
        var isBottomEdge =  i > length - columns;
        var isLeftEdge = i % columns === 0;
        var isRightEdge =  (i -1) % columns === 0;   
         var cell = {
            id: i -1,
            x:topOffset,
            y:leftOffset,
            width,
            height,
            isTopEdge,
            isBottomEdge,
            isLeftEdge,
            isRightEdge
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
    this.numberOfLayers = layers;
    this.layers = [];
    this.layerObjects =[]; // one entry for each layer which then contains an array of each object on the layer
    while(layers --){
        this.layers.push(createLayer(rows,columns,cellHeight,cellWidth));
    }
    this.columns = columns;
    this.rows = rows;
    this.cellHeight = cellHeight;
    this.cellWidth =cellWidth;
}
function saveScreen(key,screen){
    for(let index in screen.layerObjects){
        let layer = screen.layerObjects[index];
        for(let index2 in layer){
            let obj = layer[index2];
            for(let prop in obj){
                if(typeof obj[prop] === 'string' || typeof obj[prop] === 'number'){
                    obj[prop] = obj[prop];
                }
            }
        }
    }
    var screen = JSON.stringify(screen);
    localStorage.setItem(key,screen);
}
export {createScreen};
export {refreshScreen};
export {addToRandomLayerLocation};
export {addToLayerLocation}
export {notifyOfArrowDownPress}
export {notifyOfArrowUpPress}
export {notifyOfArrowLeftPress}
export {notifyOfArrowRightPress}
export {saveScreen}