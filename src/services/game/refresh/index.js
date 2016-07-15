import {refresh as refreshMonster} from './monster';
import {refresh as refreshHero} from './hero';

var refreshFuncs = [
    refreshMonster,
    refreshHero
]
export {refreshFuncs};