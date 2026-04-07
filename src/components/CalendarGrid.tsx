type CalendarGridProps = {
  weddingDate: string;
};

export function CalendarGrid({ weddingDate }: CalendarGridProps) {
  const d = new Date(weddingDate);
  const year = d.getFullYear();
  const month = d.getMonth();
  const weddingDay = d.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = d.toLocaleString('vi-VN', { month: 'long' });

  const cells: (number | null)[] = [];
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);

  return (
    <div className="calendar">
      <p className="calendar-month">
        Tháng {month + 1} &mdash; {monthName} {year}
      </p>
      <div className="calendar-header">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="calendar-body">
        {cells.map((day, i) => (
          <span
            key={i}
            className={`cal-cell ${
              day === weddingDay ? 'wedding-day' : ''
            } ${!day ? 'empty' : ''}`}
          >
            {day ?? ''}
            {day === weddingDay && <span className="heart-mark">♥</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
