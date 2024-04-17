const init = () => {
  const marquees = document.querySelectorAll('[wb-data="marquee"]');
  if (!marquees) {
    return;
  }
  marquees.forEach((marquee) => {
    const duration = parseInt(marquee.getAttribute("duration"), 10) || 5;
    const marqueeContent = marquee.firstChild;
    if (!marqueeContent) {
      return;
    }

    const marqueeContentClone = marqueeContent.cloneNode(true);
    marquee.append(marqueeContentClone);

    let tween;

    const playMarquee = () => {
      let progress = tween ? tween.progress() : 0;
      tween && tween.progress(0).kill();
      const width = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("width"),
        10
      );
      const gap = parseInt(
        getComputedStyle(marqueeContent).getPropertyValue("column-gap"),
        10
      );
      const distanceToTranslate = -1 * (gap + width);

      tween = gsap.fromTo(
        marquee.children,
        { x: 0 },
        { x: distanceToTranslate, duration, ease: "none", repeat: -1 }
      );
      tween.progress(progress);
      console.log({ width });
    };
    playMarquee();

    function debounce(func) {
      var timer;
      return function (event) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(
          () => {
            func();
          },
          500,
          event
        );
      };
    }

    window.addEventListener("resize", debounce(playMarquee));
  });
};

function isBelow768px() {
    return window.innerWidth < 1200;
}

let shouldRunInit = false;

function initOnResize() {
    if (isBelow768px() && !shouldRunInit) {
        shouldRunInit = true;
        init();
    } else if (!isBelow768px() && shouldRunInit) {
        shouldRunInit = false;
        // You might want to undo any effects here if necessary
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initOnResize();

    window.addEventListener('resize', function() {
        initOnResize();
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 1200 && window.innerWidth < 1250) {
        location.reload();
    }
});

