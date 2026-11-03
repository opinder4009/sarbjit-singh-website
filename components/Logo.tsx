export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <img
      src="/images/logo-ss-shield.webp"
      alt="Sarabjit Singh"
      width={size}
      height={Math.round(size * (400 / 370))}
      style={{ height: size * (400 / 370), width: size, display: 'block' }}
    />
  );
}
