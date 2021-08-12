import { Component } from '@angular/core';
@Component({
  selector: 'app-track-by',
  templateUrl: './track-by.component.html',
  styleUrls: ['./track-by.component.css'],
})
export class TrackByComponent {
  array = [
    {
      hash: '14u0ea57-dh58–92bc-befe6-j8c4xsj410fb7',
      id: '0136',
      name: 'Robert De-Niro',
    },
    {
      hash: 'sj4i43n3–3ndj-3hcd-sj47-xdchjhrf74315f',
      id: '1469',
      name: 'Al-Pachino',
    },
    {
      hash: '9338bdjc-dh47–39hd-b6a6n-snbjsbdjw7',
      id: '2830',
      name: 'Martin Scorcesse',
    },
    {
      hash: '39dbjsd-du38–43dd-39dcbd-38bcdjncjjd',
      id: '1742',
      name: 'Terence Malik',
    },
  ];
  trackFunction(index: number, element: any) {
    return element ? element.hash : null;
  }
}
