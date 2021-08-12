import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ElementRef,
  ViewContainerRef,
} from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';
import { environment } from './../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = environment.title;
  apiURL = environment.apiURL;
  show = false;

  titleBool = true;
  apiURLBool = true;
  currentStyles;
  currentClasses;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.styleAttribute();
    this.classAttribute();
  }

  styleAttribute() {
    this.currentStyles = {
      'font-style': this.titleBool === true ? 'italic' : 'normal',
      'font-weight': this.titleBool === true ? 'bold' : 'normal',
      'font-size': this.titleBool === true ? '12px' : '30px',
      color: this.titleBool === true ? 'blue' : 'green',
    };
  }
  classAttribute() {
    this.currentClasses = {
      class_1: this.apiURLBool === true,
      class_2: this.apiURLBool !== true,
    };
  }

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  add(): void {
    // create the component factory
    const dynamicComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(DynamicComponent);
    // add the component to the view
    const componentRef = this.container.createComponent(
      dynamicComponentFactory
    );
  }
}
