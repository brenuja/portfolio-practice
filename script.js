const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
var timeout;

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: "0",
      duration: 2,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: "-10",
      duration: 1.5,
      opacity: 0,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

function circlechaptakro() {
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout)
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function (){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);

  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}


circleMouseFollower();
firstPageAnim();
circlechaptakro();


// document.querySelectorAll(".elem").forEach(function(elem){
//   var rotate = 0;
//   var diffrot = 0;

//   elem.addEventListener("mouseleave", function (dets) {
//     gsap.to(elem.querySelector("img"), {
//       opacity: 0,
//       ease: Power3,
//       duration: 0.5,
//     });
//   });

//   elem.addEventListener("mousemove", function(dets){
//     var diff = dets.clientY - elem.getBoundingClientRect().top;
//     diffrot = dets.clientX - rotate;
//     rotate = dets.clientX;
//     gsap.to(elem.querySelector("img"), {
//       opacity: 1,
//       ease: Power3,
//       top: diff,
//       left: dets.clientX,
//       rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
//     });
//   });
// });

document.querySelectorAll(".elem").forEach(function(elem){
  var rotate = 0;
  var diffrot = 0;

  // Text hover effect: reduce opacity and slide to the right
  elem.addEventListener("mouseenter", function() {
    gsap.to(elem.querySelector("h1"), {
      x: 40, // Slide the text to the right by 20px
      opacity: 0.2, // Reduce opacity to 50%
      duration: 0.5,
      ease: Power3,
    });
  });

  // Reset the text on mouse leave
  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });

    // Reset text position and opacity on mouse leave
    gsap.to(elem.querySelector("h1"), {
      x: 0, // Reset the text position
      opacity: 1, // Restore full opacity
      duration: 0.5,
      ease: Power3,
    });
  });

  // Image moves with the cursor
  elem.addEventListener("mousemove", function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
