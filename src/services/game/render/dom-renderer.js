import {getStyles} from './css'

var getCssStyleForCell = function(cell,obj){
    var cellStyle =  {
            //styles for the location of the cell
            position:'absolute',
            top:cell.x + 'px',
            left:cell.y + 'px',
            width: cell.width + 'px',
            height: cell.height + 'px',
    }
    return Object.assign({},cellStyle,obj && obj.renderIndex >= 0? getStyles[obj.renderIndex]() : {});
}

export {getCssStyleForCell};