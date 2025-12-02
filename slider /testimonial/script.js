function slider1() {
let splides = $('.testimonials');
for ( let i = 0, splideLength = splides.length; i < splideLength; i++ ) {
	new Splide( splides[ i ], {
  // Desktop on down
	perPage: 1,
	perMove: 1,
  focus: 0, // 0 = left and 'center' = center
  type: 'slide', // 'loop' or 'slide'
  gap: '2em', // space between slides
  arrows: 'slider', // 'slider' or false
  pagination: false, // 'slider' or false
  speed : 1000, // transition speed in miliseconds
  dragAngleThreshold: 30, // default is 30
  autoWidth: false, // for cards with differing widths
  rewind : true, // go back to beginning when reach end
  rewindSpeed : 400,
  waitForTransition : false,
  updateOnMove : true,
  trimSpace: false, // true removes empty space from end of list
  breakpoints: {
		991: {
    	// Tablet
		},
    767: {
    	// Mobile Landscape
		},
    479: {
    	// Mobile Portrait
		}
	}
} ).mount();
}

}
slider1();
