import {createMonster as cm}  from '../../objects/monster';

var CssMonster = Object.create(cm());

CssMonster.getStyle = function(){
  return {backgroundColor:'purple'};
}

var createMonster = function(){
  var monster = Object.create(CssMonster);
  return monster;
}

export default createMonster;
