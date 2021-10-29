# SioEvents
Events Controller for nodejs module and navigators.

The EventEmitter is preferable used in extended classes.

## Install
``` bash
  npm install sioevents
```
## Include
``` javascript
  import SioEvents from "sioevents";
```
## Full Example
```javascript
class EventSender extends SioEvents {
    constructor() {
        super();
        /**This listener is going to be fired with all the events */
        this.on("*",(ev)=>{
            console.log("[EventSender] *: ",ev.event,ev.data);
        })
    }
    send(event, data) {
        this.emit(event, data);
    }
    testEmit(t) {
      this.emit("test", {name:t});
    }
}

let sender=new EventSender();

/**The first listener is going to run just the next two times the event its fired and its going to stop further propagation */
sender.on("test",(ev)=>{
  ev.stopPropagation();
  console.log("[First Listener]: ",ev.data);
},2);

/**The second listener is going to run always the event its fired */
sender.on("test",(ev)=>{
  console.log("[Second Listener]: ",ev.data);
});

/**This is going to fire the * listeners */
sender.emit("noTest",{name:"noTest"});

/**This fire 3 test events so we can see all the functionallity of the class */
sender.testEmit("t1");
sender.testEmit("t2");
sender.testEmit("t3");

/**Console
  [EventSender] *:  noTest { name: 'noTest' }
  [First Listener]:  { name: 't1' }    
  [First Listener]:  { name: 't2' }    
  [Second Listener]:  { name: 't3' }   
  [EventSender] *:  test { name: 't3' }
 * 
*/
```


## Add Listener -> .on(eventName, callback,times=Number.POSITIVE_INFINITY);

|Name|Type|Description|Special Values
|---|---|---|---|
|eventName|String|Name of the event to listen for.|Use "*" to listen to all the events fired.
|callback|Function|Function to be called when the event fires. It recives an EventElement Object.|
|times|Number|Defines the number of times this callback can run. Default: Infinite times

Add a new listener to listen for a name event

```javascript
  ev.on("*",(eventElement)=>{
    console.log(eventElement.data);
  })
```

## Emit -> .emit(eventName, data) || .emit(EventElement);

|Name|Type|Description|Special Values
|---|---|---|---|
|eventName|String|Name of the event to be fired|
|data|Any|On the listeners callback EventElement data value.
|EventElement|EventElement|Another EventElement recived in a listener.

```javascript
  ev.emit("eventName",
    {
      value:"Some special data"
    }
  )
```

## EventElement
Created by SioEvents on every event fire.

### Properties
|Name|Type|Default|Description|
|---|---|---|---|
|event|String|It's always setted|Event Name
|data|Any|Any|Data the event was fired. If you modify this value subsequent listeners will recive the modified value.
|stopped|Boolean|false|It its true if one listener calls EventElement.stopPropagation()
|error|Any|false|It is setted if one listener calls EventElement.preventDefault(info). If not info is provided this value is true else the value of this is the info param.

### Methods
#### stopPropagation()

  The SioEvent is going to stop calling any other listener on the list
### preventDefault(info=null)

  It's goint to set the error with the info value


# NICE DAY AND WONDERFUL CODING

### Author: Adrián Mercado Martínez.
### Last modification: 2021-10-29