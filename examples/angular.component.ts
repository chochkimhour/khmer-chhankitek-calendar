import { Component } from '@angular/core';
import { formatKhmerDate, toKhmerLunarDate } from 'khmer-chhankitek-calendar';

@Component({
  selector: 'app-khmer-date',
  template: `
    <section>
      <p>{{ label }}</p>
      <pre>{{ details | json }}</pre>
    </section>
  `,
})
export class KhmerDateComponent {
  readonly label = formatKhmerDate('2026-05-01');
  readonly details = toKhmerLunarDate('2026-05-01');
}
