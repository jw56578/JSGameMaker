var getCssStyle = function(cell){
    return {
            position:'absolute',
            border:'1px solid black',
            top:cell.x + 'px',
            left:cell.y + 'px',
            width: cell.width + 'px',
            height: cell.height + 'px',
            backgroundColor: cell.isOccupied ? cell.isEdge ? 'red' : 'black' : 'white'
    }

}
export {getCssStyle};