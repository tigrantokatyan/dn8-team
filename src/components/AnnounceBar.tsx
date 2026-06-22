import { useLanguage } from '../i18n';

export default function AnnounceBar() {
  const { t } = useLanguage();
  const items = [
    { text: t('announce.newCollection'), gold: true },
    { text: t('announce.yerevan'), gold: false },
    { text: t('announce.openDaily'), gold: true },
    { text: t('announce.style'), gold: false },
  ];

  const content = (group: string) =>
    Array.from({ length: 5 }).flatMap((_, repeatIndex) =>
      items.flatMap((item, i) => [
        <span
          key={`${group}-t${repeatIndex}-${i}`}
          style={{
            fontSize: 11,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: item.gold ? '#c4a44a' : '#f3efe8',
            padding: '0 36px',
          }}
        >
          {item.text}
        </span>,
        <span key={`${group}-d${repeatIndex}-${i}`} style={{ color: '#c4a44a', opacity: 0.4, padding: '0 8px' }}>◆</span>,
      ])
    );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 96,
        height: 38,
        background: '#09091a',
        borderBottom: '1px solid rgba(196,164,74,.25)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          animation: 'announceScroll 90s linear infinite',
          whiteSpace: 'nowrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{content('a')}</div>
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{content('b')}</div>
      </div>
    </div>
  );
}
