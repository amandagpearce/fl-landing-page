document.addEventListener('DOMContentLoaded', function () {
  // Utility function to check if the viewport is mobile
  const isViewportMobile = () => {
    const viewportWidth = window.innerWidth;
    return viewportWidth < 768;
  };

  // Function to initialize LocomotiveScroll
  const initializeLocomotiveScroll = () => {
    new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 2.5,
      getDirection: true,
      reloadOnContextChange: true,
      lerp: 0.1,
      smoothMobile: true,
    });
  };

  // Function to check if all images are loaded
  const checkImagesLoaded = () => {
    const images = document.querySelectorAll('img');
    let loadedImagesCount = 0;

    images.forEach((img) => {
      if (img.complete) {
        loadedImagesCount++;
      } else {
        img.addEventListener('load', () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            initializeLocomotiveScroll();
          }
        });

        img.addEventListener('error', () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            initializeLocomotiveScroll();
          }
        });
      }
    });

    if (loadedImagesCount === images.length) {
      initializeLocomotiveScroll();
    }
  };

  // Function to initialize the brands slider
  const initBrandsSlider = () => {
    new Splide('#splide', {
      type: 'loop',
      perPage: 7,
      autoplay: true,
      gap: '2rem',
      speed: 200000,
      interval: 0,
      pagination: false,
      arrows: false,
      breakpoints: {
        768: {
          perPage: 6,
        },
        480: {
          perPage: 3,
          speed: 100000,
        },
      },
    }).mount();
  };

  // Function to initialize the guide slider
  const initGuideSlider = () => {
    new Splide('#guide-slider', {
      type: 'loop',
      perPage: 1,
      pagination: true,
      arrows: false,
      breakpoints: {
        768: {
          perPage: 1,
          pagination: true,
        },
      },
    }).mount();
  };

  // Function to style the HubSpot form
  const styleHubspotForm = () => {
    const formContainer = document.getElementById('hubspot-form-container');

    const interval = setInterval(() => {
      const form = formContainer.querySelector('form');
      const lightboxContent = document
        .querySelector('#hubspot-content')
        .cloneNode(true);

      if (form) {
        const formParent = form.parentElement;
        const formSubmitButton = form.querySelector('input[type="submit"]');
        const emailInput = form.querySelector('input[name="email"]');
        const phoneInput = form.querySelector('input[name="mobilephone"]');

        if (formSubmitButton) {
          formSubmitButton.value = 'Get your full guide';
        }

        if (emailInput) {
          emailInput.setAttribute(
            'placeholder',
            'Work email (name@company.com)*'
          );
        }

        if (phoneInput) {
          phoneInput.setAttribute('placeholder', 'Phone');
        }

        lightboxContent.style.opacity = '1';
        lightboxContent.style.height = 'auto';

        formParent.insertAdjacentElement('afterbegin', lightboxContent);
        lightbox.style.display = 'flex';

        clearInterval(interval);
      }
    }, 100);
  };

  // Function to initialize the HubSpot form and handle the lightbox
  const initHubspotForm = (isMobile) => {
    const openLightbox = isMobile
      ? document.getElementById('open-lightbox-mobile')
      : document.getElementById('open-lightbox');
    const lightbox = document.getElementById('lightbox');

    if (openLightbox) {
      openLightbox.addEventListener('click', function () {
        hbspt.forms.create({
          region: 'na1',
          portalId: '20191864',
          formId: 'e6f4dd61-1393-40c6-8a82-2dd87f364232',
          target: '#hubspot-form-container',
          onFormReady: styleHubspotForm,
        });
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

  // Main initialization function to orchestrate all initializations
  const init = () => {
    const isMobile = isViewportMobile();

    initBrandsSlider();
    checkImagesLoaded();

    if (isMobile !== undefined) {
      initHubspotForm(isMobile);

      if (isMobile) {
        initGuideSlider();
      }
    }
  };

  init();
});
