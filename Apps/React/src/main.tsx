import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { UmbPropertyEditorConfigCollection } from "@umbraco-cms/backoffice/property-editor";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import './index.css'
import ReactApp from './App.tsx';

const appId = 'helloReact';

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

class HelloReact extends HTMLElement {
  config: UmbPropertyEditorConfigCollection | undefined;
  app: any;
  public value: any;

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
  connectedCallback() {
      const mountElem = this.shadowRoot?.querySelector(`#${appId}`) as HTMLElement;

      this.app = createRoot(mountElem!).render(
        <StrictMode>
          <ReactApp mountElem={mountElem} />
        </StrictMode>,
      )
  }
  disconnectedCallback() {
  }
}

customElements.define('hello-react', UmbElementMixin(HelloReact))