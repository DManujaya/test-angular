import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  providers: [LogService],
})
export class HelloComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  constructor(private log: LogService) {
    alert('1. on changes called');
  }
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    alert('1. on changes called');
  }
  ngOnInit(): void {
    alert('2. on init is called');
  }
  ngDoCheck(): void {
    alert('3. do check is called');
  }
  ngAfterContentInit(): void {
    alert('4. after content init is called');
  }
  ngAfterContentChecked(): void {
    alert('5. after content checked is called');
  }
  ngAfterViewInit(): void {
    alert('6. after view init is called');
  }
  ngAfterViewChecked(): void {
    alert('7. after view checked is called');
  }
  ngOnDestroy(): void {
    alert('8. on destroy called');
  }
}
