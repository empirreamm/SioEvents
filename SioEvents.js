class EventElement{
  constructor(event, data){
    this.event = event;
    this.data = data;
    this.stopped = false;
    this.error=false;
  }
  stopPropagation(){
    this.stopped = true;
  }
  preventDefault(info=null){
    this.error = info??true;
  }
}
class SioEvents{
  constructor(){
    SioEvents.defineProps(this);
  }
  static defineProps(object){
    Object.defineProperties(object,
      {
        events:{
          value:{},
          writable:true,
        },
        on: {
          value: function (event, callback,times=Number.POSITIVE_INFINITY){
            if(!this.events[event]){
              this.events[event] = [];
            }
            this.events[event].push({callback,times});
          },
        },
        emit: {
          value: function (event, data){
            let eventElement=null;
            if(event instanceof EventElement){
              eventElement=event;
              event=event.event;
            }else{
              eventElement = new EventElement(event, data);
            }
            if(this.events[event]){
              for(let eventHandlerIndex in this.events[event]){
                let eventHandler=this.events[event][eventHandlerIndex];
                if(!eventElement.stopped){
                  eventHandler.callback(eventElement);
                  eventHandler.times--;
                  if(eventHandler.times<=0){
                    this.events[event].splice(eventHandler,1);
                  }
                }
              }
            }
            if(this.events["*"]){
              for(let eventHandlerIndex in this.events["*"]){
                let eventHandler=this.events["*"][eventHandlerIndex];
                if(!eventElement.stopped){
                  eventHandler.callback(eventElement);
                  eventHandler.times--;
                  if(eventHandler.times<=0){
                    this.events[event].splice(eventHandler,1);
                  }
                }
              }
            }
            return eventElement;
          },
        },
      }
    );
    return true;
  }
  static makeEventObject(object){
    return SioEvents.defineProps(object);
  }
}
export default SioEvents;