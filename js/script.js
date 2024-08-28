// Brands caroussel
document.addEventListener('DOMContentLoaded', function () {
  new Splide('#splide', {
    type: 'loop',
    perPage: 8,
    gap: '1rem',
    // autoplay: true,
    speed: 200000,
    interval: 0,
    pagination: false,
    arrows: false,
    breakpoints: {
      768: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  }).mount();
});

// Hubspot form
// hbspt.forms.create({
//   region: "na1",
//   portalId: "20191864",
//   formId: "e6f4dd61-1393-40c6-8a82-2dd87f364232"
//   });
