import createScreen from './screen';

var Map = {
    init:function(columns){
        this.columns = columns;
        this.screens = [];
    }
    ,
    addScreen:function(s){
        this.screens.add(s);
    }

}

/**map holds an array of screens
 * there is no need to have a predefined number of rows as the map will just show whatever it can 
 * but the map would have to decide how many rows there are going to be for the screen, maybe just the same as columns if square map is desired
 */

function createMap(columns){
    var map = Object.create(Map);
    map.init(columns);
    var l = columns * columns;
    while(l--){
        var screen = createScreen(columns,columns,30,30);
        this.screens.push(screen);
    }
    return map;
}