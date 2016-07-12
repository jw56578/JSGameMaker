import React, {Component,PropTypes} from 'react';
import createMap from '../services/game/map';
import getMonster from '../services/game/monster';
import {refresh} from '../services/game/render';
/**
 * show a small grid that represents the screens of the map
 * when clicked on show the specific screen
 */
class MapMaker extends Component
{
  constructor(props, context) {
        super(props, context);
        this.state = {map:createMap()};
        this.handleMouseOver = this.handleMouseOver.bind(this);

  }
  render(){
    var self = this;
    var divs = this.state.grid.map(function(s){
      return <div key={s.id} onMouseOver={self.handleMouseOver.bind(null,s)} style={s}> </div>
    });

    return (<div>
    <div style={{position:'relative',top:'20px'}} onKeyDown={this.handleKeyDown}>{divs}</div>
    <button onClick={this.start}>Start</button>
    </div>)
  }

}
export default Screen;