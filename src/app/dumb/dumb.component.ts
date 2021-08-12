import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dumb',
  templateUrl: './dumb.component.html',
  styleUrls: ['./dumb.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DumbComponent implements OnInit {
  @Input() list: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
