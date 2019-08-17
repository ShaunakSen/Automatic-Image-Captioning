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
        //console.log(mouseX, mouseY);
    }
};


// GET API DATA

var api_data = null;

var current_img_idx = null

$.getJSON("./azure_api.json", function(data){
  api_data = data;
  console.log(api_data)
  // api data received
  

  //set initial value of current index
  
  // build hover effect


});

var boundingBoxClasses = null;

var processImage = function(img_idx){

  console.log("Drawing boxes for img no:", img_idx);

  // clear the DOM
  $('.box-element').remove();

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
  });

  // set the bounding box classes for hover effect
  boundingBoxClasses = document.getElementsByClassName("box-element");
  console.log(boundingBoxClasses);

};



var hoverButton = document.getElementById("hover-button");

var hoverEffectOn = false;



hoverButton.addEventListener("click", function(){

  // load the selected image
  var select = document.getElementById('image-select')
  current_img_idx = select.options[select.selectedIndex].text - 1;
  var url_img_idx = current_img_idx + 1
  $('#main-img').attr('src', 'https://raw.githubusercontent.com/ShaunakSen/Automatic-Image-Captioning/master/img/diag' + url_img_idx + '.png');
  // draw bounding boxes
  processImage(current_img_idx)

  if (hoverEffectOn) {
    hoverButton.innerHTML = "Start Hover Effect";
    hoverEffectOn = false;
    //hoverEffect(false)
    // remove bounding boxes
    $('.box-element').remove();

  } else {
    hoverButton.innerHTML = "Stop Hover Effect";
    hoverEffectOn = true;
    //hoverEffect(true);

    // build hover effect
    var numBoxes = api_data[current_img_idx].response.objects.length;

    console.log("Num boxes:", numBoxes);

    for (var i=0; i<numBoxes; ++i){
      var boxElement = document.getElementById("box" + i);
      boxElement.addEventListener("mouseover", function(){
        // clear the initial text 
        $('#information').text('');
        var box_idx = parseInt(this.id[this.id.length-1])
        // populate info for this box_id
        var item = api_data[current_img_idx].response.objects[box_idx].object;
        var confidence = api_data[current_img_idx].response.objects[box_idx].confidence
        var infoString = "Detected Object:" + item + " with confidence:" + confidence;
        $('#information').text(infoString);
      })
    }

  }
});