document.addEventListener('DOMContentLoaded', function () {
  document.body.style.overflowX = 'hidden';

  const isViewportMobile = () => {
    var viewportWidth = window.innerWidth;
    return viewportWidth < 768; // Simplified return statement
  };

  const isMobile = isViewportMobile();

  const initBrandsSlider = () => {
    new Splide('#splide', {
      type: 'loop',
      perPage: 8,
      gap: '1rem',
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
  };

  const initGuideSlider = () => {
    new Splide('#guide-slider', {
      type: 'loop',
      perPage: 1,
      pagination: true, // Show pagination
      arrows: false, // Hide arrows
      breakpoints: {
        768: {
          perPage: 1,
          pagination: true, // Pagination enabled for small screens
        },
      },
    }).mount();
  };

  const styleHubspotForm = () => {
    const formContainer = document.getElementById('hubspot-form-container');

    const interval = setInterval(() => {
      const form = formContainer.querySelector('form'),
        lightboxContent = document
          .querySelector('#hubspot-content')
          .cloneNode(true);

      if (form) {
        console.log('form loaded', form);
        let formParent = form.parentElement;
        lightboxContent.style.opacity = '1';
        lightboxContent.style.height = 'auto';

        formParent.insertAdjacentElement('afterbegin', lightboxContent);

        clearInterval(interval);
      }
    }, 100);
  };

  const initHubspotForm = (isMobile) => {
    const openLightbox = isMobile
      ? document.getElementById('open-lightbox-mobile')
      : document.getElementById('open-lightbox');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.lightbox__close');

    if (openLightbox) {
      openLightbox.addEventListener('click', function () {
        lightbox.style.display = 'flex';

        hbspt.forms.create({
          region: 'na1',
          portalId: '20191864',
          formId: 'e6f4dd61-1393-40c6-8a82-2dd87f364232',
          target: '#hubspot-form-container',
          onFormReady: styleHubspotForm, // Call the style function once the form is ready
        });
      });
    }

    if (closeLightbox) {
      closeLightbox.addEventListener('click', function () {
        lightbox.style.display = 'none';
      });
    }

    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
          lightbox.style.display = 'none';
        }
      });
    }
  };

  initBrandsSlider();

  if (!!isMobile) {
    initGuideSlider();
    initHubspotForm(isMobile);
  }
});
