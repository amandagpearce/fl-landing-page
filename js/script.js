document.addEventListener('DOMContentLoaded', function () {
  const initBrandsSlider = () => {
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

  const initHubspotForm = () => {
    const openLightbox = document.getElementById('open-lightbox');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.lightbox__close');

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

    closeLightbox.addEventListener('click', function () {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  };

  initBrandsSlider();
  initHubspotForm();
});
