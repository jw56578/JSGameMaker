import React, {Component,PropTypes} from 'react';
import {
  createScreen,
  refreshScreen,
  addToRandomLayerLocation,
  addToLayerLocation,
  notifyOfArrowDownPress,
  notifyOfArrowUpPress,
  notifyOfArrowLeftPress,
  notifyOfArrowRightPress,
  saveScreen

} from '../services/game/screen';
import {createMonster} from '../services/game/objects/monster';
import {createWall} from '../services/game/objects/wall';
import {createGrass} from '../services/game/objects/grass';
import {createHero} from '../services/game/objects/hero';
import {refresh} from '../services/game/render';
import {getCssStyleForCell} from '../services/game/render/dom-renderer';
import {putImageData} from '../services/game/render/canvas/32bit';
class CanvasScreen extends Component
{
  constructor(props, context) {
        super(props, context);
        var screen = createScreen(2,20,60,30,30);
        this.state = {screen:screen};
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.start = this.start.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.refresh = this.refresh.bind(this);
        this.load = this.load.bind(this);
        this.save = this.save.bind(this);
        this.imageData = null;
  }
 handleMouseOver(layerIndex,cell,index,event){
    if(this.state.mouseIsDown){
      var wall = createWall();
      addToLayerLocation(this.state.screen,wall,0,index);
    }
  }
  load(){
    var screen = localStorage.getItem('savedscreen');
    if(screen){
      screen = JSON.parse(screen);
      this.setState({screen});
    }
  }
  save(){
    saveScreen('savedscreen',this.state.screen);
  }
  start(){
    //this is only for testing. this should be part of the game maker
    var screen = this.state.screen;
    var h = createHero();
    var m1 = createMonster();
    var m2 = createMonster();
    var m3 = createMonster();
   /* for(let i =0; i < 20; i ++){
      let g = createGrass();
      addToRandomLayerLocation(screen,g,0);
    }*/
    addToRandomLayerLocation(screen,m1,1);
    addToRandomLayerLocation(screen,m2,1);
    addToRandomLayerLocation(screen,m3,1);
    addToRandomLayerLocation(screen,h,1);
  }
  handleKeyDown(e){
    var code = e.code;
    var screen = this.state.screen;
    if(code === "ArrowDown"){
      notifyOfArrowDownPress(screen);
    }
    if(code === "ArrowUp"){
      notifyOfArrowUpPress(screen);
    }
    if(code === "ArrowLeft"){
      notifyOfArrowLeftPress(screen);
    }
    if(code === "ArrowRight"){
      notifyOfArrowRightPress(screen);
    }
  }
  render(){
    var self = this;
    return (<canvas ref="canvas" width={1000} height={500}/>)
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
  basicCanvasImageData(){

  }
  refresh(){
    //the screen should be able to tell the loop if its needs to update or not. if nothing is moving on the screen then there is no point to process anything
    if(!this.imageData){
      this.ctx = this.refs.canvas.getContext('2d');
      this.canvasWidth  = this.refs.canvas.width;
      this.canvasHeight = this.refs.canvas.height;
      this.imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
      this.data = this.imageData.data;
    }
      putImageData(
        {ctx : this.ctx,
        width:this.canvasWidth,
        height:this.canvasHeight,
        imageData: this.imageData}

      );
     
    this.raid = requestAnimationFrame(this.refresh); 
  }

}
export default CanvasScreen;