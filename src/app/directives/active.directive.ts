import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appActive]',
})
export class ActiveDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'Green';
  }
}
