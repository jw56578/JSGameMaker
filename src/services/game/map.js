

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
 * 
 */

function createMap(columns){
    var map = Object.create(Map);
    map.init(columns);
    return map;
}