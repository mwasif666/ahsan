/**
 * RevealText — splits a string into masked words so GSAP can slide each
 * word up into view (`.rt-word` inside overflow-hidden `.rt-line`).
 * Sections animate it themselves with:
 *   gsap.from(q('.rt-word'), { yPercent: 110, stagger: 0.035, ... })
 */
export default function RevealText({ text, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={className}>
      {text.split(' ').map((word, i) => (
        <span className="rt-line" key={i}>
          <span className="rt-word">
            {word}
            {'\u00A0'}
          </span>
        </span>
      ))}
    </Tag>
  );
}
