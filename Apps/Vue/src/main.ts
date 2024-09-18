import { createApp } from "vue";
import App from './App.vue'
import type {UmbPropertyEditorConfigCollection} from "@umbraco-cms/backoffice/property-editor";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

const appId = 'helloVue';

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      padding: 20px;
      display: block;
      box-sizing: border-box;
    }
  </style>

  <div id="${appId}"></div>
`;

class HelloVue extends HTMLElement {
  config: UmbPropertyEditorConfigCollection | undefined;
  app: any;
  public value: any;

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
      const mountElem = this.shadowRoot?.querySelector(`#${appId}`);
      
      this.app = createApp(App, {
          mountElem: mountElem
      });

      if (mountElem) {
          this.app.mount(mountElem);
      }
  }
  
  disconnectedCallback() {
    this.app.unmount()
  }
}

customElements.define('hello-vue', UmbElementMixin(HelloVue))
