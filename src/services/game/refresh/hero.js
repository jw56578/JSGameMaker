import {getRandomAdjacentDestination,getKeyBasedDestination} from '../movement';

var refresh=function(hero,funcs){
  var keydowned = funcs.getKeyDown();
  var gridIndex = funcs.getIndex();
  var columns = funcs.getNumberOfColumns();
  var moveTo = getKeyBasedDestination(keydowned,gridIndex)(gridIndex,columns);
  if(gridIndex != moveTo)
    funcs.changeIndex(gridIndex,moveTo,hero);
  return hero;
}

export {refresh};
