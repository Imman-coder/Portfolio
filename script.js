var cursor = ['40px','40px'];
var size = 0;
var offsets = 0;
var hover_state_previous = false;
var words = ['Hi, i like Programming.', 'I also like Robotics.',],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 50,
    speed = 70;

function clipMousedot(x,y){
  gsap.set(".cursor-dot", {
        x: x,
        y: y
      });
    }
function clipMouse(x,y){
  gsap.to(".cursor", {
    x: x,
    y: y,
    duration:.4,
  });
}
function clipbg(x,y){
  gsap.to(".shape", {
    x: x,
    y: y,
    stagger: {
      each:-0.1,
    }
  });
}
function hovered(r_evt){
  const mouseX = r_evt.clientX;
  const mouseY = r_evt.clientY;
  var found=false;
  $(".cursor-bind").each( function(){
    var elem = $(this);
    var size_l = [elem.height(),elem.width()];
    var offsets_l = elem.offset();
    if(mouseY>=offsets_l["top"] && mouseY<=offsets_l["top"]+size_l[0] && mouseX>=offsets_l["left"] && mouseX<=offsets_l["left"]+size_l[1]){
      // console.log(elem);
      size = [elem.height(),elem.width()];
      offsets = elem.offset();
      found=true;
      return true;
    }
  });
  return found;
}
function wordflick  () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    }
    else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substring(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      }
      else {
        offset--;
      }
    }
    $('.word').text(part);
  },speed);
};

window.onload = function () {
  document.body.addEventListener("mousemove", (evt) => {
    const mouseX = evt.clientX;
    const mouseY = evt.clientY;
    clipMousedot(mouseX,mouseY);
    if(hovered(evt)){
      $('.cursor').height(size[0]);
      $('.cursor').width(size[1]);
      $('.cursor').css('border-radius', '3px');
      $('.cursor').addClass("cursor-hovered");
      $('.cursor-dot').addClass("cursor-dot-hovered");
      clipMouse(offsets["left"]+21,offsets["top"]+24);
      clipbg(mouseX,mouseY)
      return false;
    }
    else {
      $('.cursor').height(cursor[0]);
      $('.cursor').width(cursor[1]);
      $('.cursor').css('border-radius', '50%');
      $('.cursor').removeClass("cursor-hovered");
      $('.cursor-dot').removeClass("cursor-dot-hovered");
      clipMouse(mouseX,mouseY)
      clipbg(mouseX,mouseY)
    }
  });
  wordflick();
}


function openMenu() {
  var lp = document.getElementById("links");
  if (lp.style.display === "block") {
    lp.style.display = "none";
  } else {
    lp.style.display = "block";
  }
}