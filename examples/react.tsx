import { formatKhmerDate, toKhmerLunarDate } from 'khmer-chhankitek-calendar';

export function KhmerDateCard() {
  const label = formatKhmerDate('2026-05-01');
  const details = toKhmerLunarDate('2026-05-01');

  return (
    <section>
      <p>{label}</p>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </section>
  );
}
