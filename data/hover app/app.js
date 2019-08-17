var mouseX = null;
var mouseY = null;


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
        mouseX = event.pageX;
        mouseY = event.pageY;
        console.log(mouseX, mouseY);
    }
};


// GET API DATA

var api_data = null;

var current_img_idx = null

$.getJSON("./azure_api.json", function(data){
  api_data = data;

  // api data received

  // load corresponding image
  // set img idx
  current_img_idx = 0;
  // draw bounding boxes
  processImage(current_img_idx)
  // build hover effect


});

var buildHoverEffect = function(img_idx){

}


var processImage = function(img_idx){
  console.log(api_data[img_idx]);

  var objects = api_data[img_idx].response.objects;

  var bounding_boxes = [];

  objects.forEach(function(img_obj){
    bounding_boxes.push(img_obj.rectangle);
  });

  bounding_boxes.forEach(function(box, idx){
    console.log(box)
    // create box element
    box_id = "box"+idx;
    box_element = '<div class="box-element" id="' + box_id +  '"></div>';
    $('#main-img').after(box_element)
    // box elem created - set style for this box
    $('#'+box_id).css({
      'top': box.y + "px",
      'left': box.x + "px",
      'width': box.w + "px",
      'height': box.h + "px"
    });
  })
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
    hoverEffect(true);

    // mouseX, mouseY set
    buildHoverEffect();

  }
});