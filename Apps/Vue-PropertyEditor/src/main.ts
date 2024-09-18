import { createApp } from "vue";
import App from './App.vue'
import type { UmbPropertyEditorConfigCollection } from "@umbraco-cms/backoffice/property-editor";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

const appId = 'helloVue';

// Refer to the stylesheet
const template = document.createElement('template');
template.innerHTML = `
<style>
@import "/App_Plugins/VuePropertyEditor/style.css";
</style>`;

class HelloVue extends HTMLElement {
  config: UmbPropertyEditorConfigCollection | undefined;
  app: any;
  public value: any;

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `
      <div id="${appId}">
      </div>
    `
  }
  connectedCallback() {
      const mountElem = this.shadowRoot?.querySelector(`#${appId}`);
      
      this.app = createApp(App, {
          mountElem: mountElem
      });
      
      if (mountElem) {
          this.app.mount(mountElem);
      }

      // append stylesheet
      this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
  disconnectedCallback() {
    this.app.unmount()
  }
}

customElements.define('hello-vue-property', UmbElementMixin(HelloVue))