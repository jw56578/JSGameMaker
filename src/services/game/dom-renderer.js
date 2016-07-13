var getCssStyleForCell = function(cell,obj){
    return {
            //styles for the location of the cell
            position:'absolute',
            border:'1px solid black',
            top:cell.x + 'px',
            left:cell.y + 'px',
            width: cell.width + 'px',
            height: cell.height + 'px',
            //styles for what should show up in the cell based on what is there
            backgroundColor: getObjectBackgroudColor(obj)
    }

}
function getObjectBackgroudColor(obj){
    return obj ? 'purple' : 'white';
}
export {getCssStyleForCell};