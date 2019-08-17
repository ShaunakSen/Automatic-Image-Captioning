var hoverEffect = function(trigger) {
  if (trigger){
    document.onmousemove = handleMouseMove;
  }
  else{
    document.onmousemove = null;
  }
    
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here

        console.log(event.pageX, event.pageY);
    }
};



var hoverButton = document.getElementById("hover-button");

var hoverEffectOn = false;

hoverButton.addEventListener("click", function(){
  if (hoverEffectOn) {
    hoverButton.innerHTML = "Start Hover Effect";
    hoverEffectOn = false;
    hoverEffect(false)
  } else {
    hoverButton.innerHTML = "Stop Hover Effect";
    hoverEffectOn = true;
    hoverEffect(true)
  }
});