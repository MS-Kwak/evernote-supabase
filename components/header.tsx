import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-emerald-600 text-white p-4">
      <Image
        src={`/supanote-logo.png`}
        alt="SupaNote Logo"
        width={150}
        height={50}
        className="!h-6 !w-auto"
      />
    </header>
  );
}
