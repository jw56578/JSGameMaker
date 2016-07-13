how the hell do you organize this damn stuff


you have a screen with layers

do you add things to a layer or add things to the screen and the screen decides where things go

****
do you say that the screen has one layer for map items, one layer for moveable things ???
how do you decide how many layers there are
why do i even want layers
O in order to maintain the state of something when something else goes over  it
for example if you have grass that is green, monsters can go over grass but then you have to change that spot to monster color, but when they get off the grass it has to turn back green, 
how would you know to turn this cell back to green. you would have to have some complicated logic or just maintain that in a layer and it maintains itself

okay so things do need to be in layers but how do you decide what layer to add a things

make layers
1. do you predefine that here will be a certain number of layers
2. how else would it matter
3. i think each game should define how many layers there are


make a thing on the layer
1. make a map object like a monster
2. then what do you do with it, add it to which layer?
3. you make the thing and then add to specific layer

what makes the UI change to reflect the things on the screen
1. the react ui code has to do somemthing specific per layer and per layerObject
2. the actual layer is suppose to define how the grid is setup, not how things look in each grid cell
3. another thing must decide what css to use based on what thing the layyer Object is

refreshing- animation
1. the screen object doesn't need to know about timers or requestanimationframe
2. the UI/react can do this and just call a function on the screen to "refresh" everything
3. the screen refresh will then cycle through layers and objects to call refresh on those things

RENDERING
1. what is responsible for deciding what renders to the UI for each type of thingn
2. i don't want the things like monster to know that it is html/css based 
3.should i compose a new object around the base neutral object. the new object will know that its css
4. this wouldn't help in the scenario where you wnat to setup a game with whatever monsters but then swap out one thing to decide that rendering should be css or something else
5. looks like something needs to be aware of the type of an object
6. using an object as the base i can't use instance of
7. how the hell do i identify an object type
8. maybe it would be okay to use a composed object because the objects themselves have to handle so many situations
----what if the rendering was an image and it had to be different depending on which direction it is going


Layer Collision
1. how do you handle collision on 2 different layers
2. dammit this adds so much more complication. 
3. now the damn object has to have access to the other layers
4. then it has to determine whether the thing on the lower layer can be overtaken or not
5. what is going to determien whether a thing can be overriden by upper layers.
6. the screen should probably be responsbile for doing this work, or the layer, not the object (monster)
