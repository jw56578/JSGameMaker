
var Screen = {
    init:initialize

}

var createScreen = function(rows, columns,cellHeight,cellWidth){
    var screen = Object.create(Screen);
    screen.init(rows, columns,cellHeight,cellWidth);
    return screen;

}
function initialize(rows, columns,cellHeight,cellWidth){
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
            position:'absolute',
            top:topOffset + 'px',
            left:leftOffset + "px",
            width: width + 'px',
            height: height + 'px',
            border:'1px solid black',
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
    this.grid = grid;
    this.columns = columns;
    this.rows = rows;
}
export default createScreen;