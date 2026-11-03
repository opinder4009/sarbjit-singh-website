import { brand } from '@/lib/brand';

export default function WhatsAppButton() {
  const digits = brand.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent("Hi Sarabjit, I'd like to talk about a mortgage.");

  return (
    <a
      href={`https://wa.me/${digits}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-float"
    >
      <span className="wa-pulse" aria-hidden="true" />
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.89L4 20l4.2-1.1a7.93 7.93 0 0 0 3.84.98h.003a7.95 7.95 0 0 0 7.94-7.94 7.9 7.9 0 0 0-2.37-5.62zM12.05 18.53a6.6 6.6 0 0 1-3.37-.92l-.24-.14-2.5.66.67-2.44-.16-.25a6.6 6.6 0 1 1 12.25-3.5 6.61 6.61 0 0 1-6.65 6.59zm3.6-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.23.14-.43.05a5.42 5.42 0 0 1-1.6-.99 6.02 6.02 0 0 1-1.11-1.38c-.12-.2 0-.3.09-.4.09-.1.2-.24.3-.36.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.33h-.38c-.13 0-.34.05-.52.25-.18.2-.68.67-.68 1.63 0 .96.7 1.9.8 2.03.1.13 1.37 2.1 3.33 2.94.47.2.83.32 1.11.41.47.15.9.13 1.23.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.18-.13-.38-.23z" />
      </svg>

      <style>{`
        .wa-float {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 500;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .wa-float:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 12px 30px rgba(0,0,0,0.45); }
        .wa-float svg { position: relative; width: 29px; height: 29px; fill: #fff; }
        .wa-pulse {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(37,211,102,0.65);
          animation: wa-pulse 2.4s ease-out infinite;
        }
        @keyframes wa-pulse {
          0% { transform: scale(1); opacity: 0.75; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @media (max-width: 640px) {
          .wa-float { right: 14px; bottom: 14px; width: 52px; height: 52px; }
          .wa-float svg { width: 26px; height: 26px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wa-pulse { animation: none; display: none; }
        }
      `}</style>
    </a>
  );
}
