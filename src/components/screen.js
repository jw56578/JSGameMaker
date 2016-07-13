import React, {Component,PropTypes} from 'react';
import createScreen from '../services/game/screen';
import createMonster from '../services/game/render/css/monster';
import createWall from '../services/game/render/css/wall';
import createGrass from '../services/game/render/css/grass';
import {refresh} from '../services/game/render';
import {getCssStyleForCell} from '../services/game/dom-renderer';

class Screen extends Component
{
  constructor(props, context) {
        super(props, context);
        var screen = createScreen(2,25,60,30,30);
        this.state = {screen:screen};
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.start = this.start.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.refresh = this.refresh.bind(this);
  }
 handleMouseOver(layerIndex,cell,index,event){
    if(this.state.mouseIsDown){
      var wall = createWall();
      this.state.screen.addToLayerLocation(wall,0,index);
    }
  }
  start(){
    //make the first div that isn't black, some other color
    //this was code for adding a thing to be moved with keyboard
    //fix it to be the correct way to do it
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
  /*  for(let i =0; i < 20; i ++){
      let g = createGrass();
      this.state.screen.addToRandomLayerLocation(g,0);
    }*/
    this.state.screen.addToRandomLayerLocation(m1,1);
    this.state.screen.addToRandomLayerLocation(m2,1);
    this.state.screen.addToRandomLayerLocation(m3,1);
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
    console.time('render');
    var self = this;
    //why does it take 500 ms to loop 140k times if i set rows and columsn to 222 x 333
    //whatever react is doing when you make a <div> is taking a long time so this is not really feasible for large dimensions
    var divLayers = this.state.screen.layers.map(function(l, li){
      var layerObjects = self.state.screen.layerObjects[li];
      var divs = l.map(function(s,i,arry){
        var lo = layerObjects ? layerObjects[i] : null;
        return <div key={li.toString() + i.toString()} onMouseOver={self.handleMouseOver.bind(self.state.screen.layers[0],0,s,i)} style={getCssStyleForCell(s,lo)}> </div>
      });
      return divs;
    });

    divLayers = [].concat(...divLayers);
    console.timeEnd('render')
    return (<div>
    <div style={{position:'relative',top:'20px'}} onKeyDown={this.handleKeyDown}>{divLayers}</div>
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
    console.time('refresh');
    var screen = this.state.screen.refresh();
    console.timeEnd('refresh');
    this.setState({screen:screen});
    this.raid = requestAnimationFrame(this.refresh); 
  }

}
export default Screen;