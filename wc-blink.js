(async ()=> {
  const res = await fetch('./wc-blink.html');
  const textTemplate = await res.text();
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
    .querySelector('#wc-blink');

  class WcBlink extends HTMLElement {
    constructor() {
      super();

      const template = HTMLTemplate.content;

      const shadowRoot = this.attachShadow({ mode: 'open' })
        .appendChild(template.cloneNode(true));

      this.blinkStep = 0;
      this.blinkInterval = setInterval(function() {
        this.updateDisplay();
      }.bind(this), 200);
    }

    connectedCallback() {
      const content = document.createElement('div');
      content.setAttribute('slot', 'content');

      content.setAttribute('slot', 'content');
      this.childNodes.forEach((child) => content.appendChild(child));
      this.appendChild(content);
    }

    updateDisplay() {
      const content = this.querySelector('div[slot=content]');
      content.style.opacity = (this.blinkStep == 3) ? 0 : content.style.opacity;
      content.style.opacity = (this.blinkStep == 4) ? 1 : content.style.opacity;

      this.blinkStep++;
      this.blinkStep = this.blinkStep % 5;
    }
  }

  customElements.define('wc-blink', WcBlink);
})();
