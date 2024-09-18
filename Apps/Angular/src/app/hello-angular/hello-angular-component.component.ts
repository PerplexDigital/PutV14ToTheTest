import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input } from '@angular/core';
import { UMB_CURRENT_USER_CONTEXT } from '@umbraco-cms/backoffice/current-user';

@Component({
  standalone: true,
  selector: 'hello-angular',
  templateUrl: './hello-angular-component.component.html',
  styles: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HelloAngularComponent {
  @Input() name: string = '';

  constructor(elementRef: ElementRef) {

    const host = elementRef.nativeElement as any;

    // host.consumeContext(UMB_CURRENT_USER_CONTEXT, (context: any) => {
    //   context.currentUser.subscribe((user: any) => {
    //     this.name = user?.name ?? "";
    //   });
    // });

    // console.log(elementRef.nativeElement);
  }
}
