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

export {getCssStyleForCell};