import React, {Component,PropTypes} from 'react';
import createScreen from '../services/game/screen';
import createMonster from '../services/game/monster';
import {refresh} from '../services/game/render';
import {getCssStyleForCell} from '../services/game/dom-renderer';

class Screen extends Component
{
  constructor(props, context) {
        super(props, context);
        var screen = createScreen(2,20,20,30,30);
        this.state = {screen:screen};
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.start = this.start.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.refresh = this.refresh.bind(this);
  }
 handleMouseOver(layerIndex,cell,event){
    if(this.state.mouseIsDown){
      //thsi logic needs to go somewhere else not havving to do with HTML
      this.state.screen.layers[layerIndex][cell.id] =Object.assign({},cell, {isOccupied:true});
      this.setState({screen:this.state.screen});
    }
  }
  start(){
    //make the first div that isn't black, some other color
/*    var l = this.state.grid.length,activePosition = null; 
    while(l--){
      var g = this.state.grid[l];
      if(!g.isOccupied){
        g.backgroundColor = 'pink';
        activePosition = g;
        g.isOccupied = true;
        break;
      }
    }*/

    var m1 = createMonster();
    var m2 = createMonster();
    var m3 = createMonster();
    this.state.screen.addToRandomLayerLocation(m1,1);
    this.state.screen.addToRandomLayerLocation(m2,1);
    this.state.screen.addToRandomLayerLocation(m3,1);
    refresh(this.state.screen);
    
   // this.setState({activePosition:activePosition,grid:this.state.grid});
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
    var layerObjects = self.state.screen.layerObjects[1];
    //change this hard coding later
    var divs = this.state.screen.layers[0].map(function(s,i,arry){
     var lo = layerObjects ? layerObjects[i] : null;
      return <div key={s.id} onMouseOver={self.handleMouseOver.bind(self.state.screen.layers[0],0,s)} style={getCssStyleForCell(s,lo)}> </div>
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