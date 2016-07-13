var getCssStyleForCell = function(cell,obj){
    var cellStyle =  {
            //styles for the location of the cell
            position:'absolute',
            border:'1px solid black',
            top:cell.x + 'px',
            left:cell.y + 'px',
            width: cell.width + 'px',
            height: cell.height + 'px',
    }
    return Object.assign({},cellStyle,obj ? obj.getStyle() : {});
}
function getObjectBackgroudColor(obj){
    //how the hell do you handle this
    //im not exporting the object types therefore i can't use instanceof on it to determine what to do, should 
    if(!obj)
        return 'white';
    else
        return 'purple';
}
export {getCssStyleForCell};