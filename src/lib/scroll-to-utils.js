function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

export function scrollIntoView(element) {
  const headerElement = document.querySelector(`.rc-header__nav`);
  if (element && headerElement) {
    window.scroll({
      top: getElementTop(element) - headerElement.offsetHeight,
      behavior: 'smooth'
    });
  }
}

export function scrollPaymentPanelIntoView() {
  scrollIntoView(document.querySelector(`#J_checkout_panel_paymentMethod`));
}
