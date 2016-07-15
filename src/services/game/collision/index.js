import {handleCollision as monster} from './monster';
import {handleCollision as hero} from './hero';
import {handleCollision as wall} from './wall';
import {handleCollision as grass} from './grass';

var collisionHandlers = [
    monster,
    hero,
    wall,
    grass
]
export {collisionHandlers};