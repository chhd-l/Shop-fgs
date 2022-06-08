export const submitEvent = () => {
  if (window.dataLayer)
    dataLayer.push({
      event: 'assistanceDogLandingInteraction', //String - Constant
      assistanceDogLandingInteraction: {
        type: 'Contact us' //String : Constant
      }
    });
};
