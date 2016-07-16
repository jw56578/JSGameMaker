import React, {Component,PropTypes} from 'react';
import Screen from './screen';
import CanvasScreen from './canvas-screen';
/**how do you flow something in react in a functional way
 * 
 */
class App extends Component
{
    render(){
        return (
            <div><CanvasScreen /></div>
        )
    }
}
export default App;