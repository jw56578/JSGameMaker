import BaseObject from './base';
import {getRandomAdjacentDestination,getKeyBasedDestination} from '../movement';

var Hero = Object.create(BaseObject);
Hero.handleCollisionIndex = 1;
Hero.refreshFuncIndex = 1;
Hero.renderIndex = 1;
var createHero = function(){
  var h = Object.create(Hero);
  return h;
}

export {createHero};
