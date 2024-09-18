import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { ApplicationRef } from '@angular/core';
import { HelloAngularComponent } from './app/hello-angular/hello-angular-component.component';

import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

(async () => {
  const app: ApplicationRef = await createApplication(appConfig);

  // Define Web Components
  const helloAngularComponent = createCustomElement(HelloAngularComponent, { injector: app.injector });
  customElements.define('hello-angular', UmbElementMixin(helloAngularComponent));
})();