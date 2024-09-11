import initSlider from "src/js/initSlider";
import { BREAKPOINT_LG } from "src/js/breakpoints";

initSlider(".frontSlider__slider", ($el) => ({
  wrapperClass:  "frontSlider__slides",
  slideClass:    "frontSlider__slide",
  navigation:    {
    prevEl: $el.parents(".frontSlider").find(".frontSlider__nav--prev")[0],
    nextEl: $el.parents(".frontSlider").find(".frontSlider__nav--next")[0],
  },
  slidesPerView: 1,
  spaceBetween:  0,
  loop:          true,
  autoHeight:    true,
  breakpoints:   {
    [BREAKPOINT_LG]: {
      autoHeight: false,
    },
  },
  // autoHeight:    true,
  autoplay:      {
    delay:             5000,
    // pauseOnMouseEnter: false,
  },
}));
