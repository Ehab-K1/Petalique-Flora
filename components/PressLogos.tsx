const PRESS = [
  'Toronto Life',
  'BlogTO',
  'Chatelaine',
  'Cityline',
  'The Kit',
  'Style at Home',
];

export function PressLogos({ heading = 'As mentioned in' }: { heading?: string }) {
  return (
    <div className="press-strip" aria-label="Press mentions">
      <div className="press-strip-head marker">{heading}</div>
      <ul className="press-strip-list">
        {PRESS.map((name) => (
          <li key={name} className="press-strip-item">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
