import React, {Component,PropTypes} from 'react';
import createScreen from '../services/game/screen';
import getMonster from '../services/game/monster';
import {refresh} from '../services/game/render';

class Screen extends Component
{
  constructor(props, context) {
        super(props, context);
        var screen = createScreen(20,20,30,30);
        this.state = {screen:screen,grid :screen.grid};
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.start = this.start.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.refresh = this.refresh.bind(this);
  }
 handleMouseOver(s,e){
    if(this.state.mouseIsDown){
      var cell = this.state.grid[s.id];
      this.state.grid[s.id] =Object.assign({},cell, {backgroundColor : cell.isEdge ? 'red' :  'black',isOccupied:true});
      this.setState({grid:this.state.grid});
    }
  }
  start(){
    //make the first div that isn't black, some other color
    var l = this.state.grid.length,activePosition = null; 
    while(l--){
      var g = this.state.grid[l];
      if(!g.isOccupied){
        g.backgroundColor = 'pink';
        activePosition = g;
        g.isOccupied = true;
        break;
      }
    }
    var m1 = getMonster(this.state.screen);
    var m2 = getMonster(this.state.screen);
    var m3 = getMonster(this.state.screen);
    refresh(this.state.screen);
    
    this.setState({activePosition:activePosition,grid:this.state.grid});
  }
  handleKeyDown(e){
    var code = e.code;
    var ap = this.state.activePosition,destination;
  
    if(code === "ArrowDown"){
      destination = this.state.grid[ap.id + this.state.screen.columns];
    }
    if(code === "ArrowUp"){
      destination = this.state.grid[ap.id - this.state.screen.columns];
    }
    if(code === "ArrowLeft"){
      destination = this.state.grid[ap.id - 1];
    }
    if(code === "ArrowRight"){
      destination = this.state.grid[ap.id + 1];
    }
    if(!destination || destination.isOccupied === true)
      return
    ap.backgroundColor = 'white';
    destination.backgroundColor = 'pink';
    destination.isOccupied = true;
    ap.isOccupied = false;
    this.setState({activePosition:destination,grid:this.state.grid});

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
  handleMouseDown(e){
    this.setState({mouseIsDown:true});
  }
  handleMouseUp(){
    this.setState({mouseIsDown:false});
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.refresh();
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mouseup', this.handleMouseUp);
    cancelAnimationFrame(this.raid);
  }
  refresh(){
    this.setState({});
    this.raid = requestAnimationFrame(this.refresh); 
  }

}
export default Screen;