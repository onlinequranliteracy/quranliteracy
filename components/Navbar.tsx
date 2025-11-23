import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 md:px-16 bg-white shadow-sm">

      {/* LOGO */}
      <Link href="/" className="text-2xl font-bold text-green-700">
        Quran Literacy Academy
      </Link>

      {/* NAV LINKS */}
      <div className="flex items-center gap-4">

        <Link 
          href="/pricing"
          className="text-green-700 hover:text-green-800 font-medium"
        >
          Pricing
        </Link>
       <Link 
          href="/enroll"
          className="text-green-700 hover:text-green-800 font-medium"
        >
          Enroll
        </Link>
        <Link 
          href="/consultation"
          className="text-green-700 hover:text-green-800 font-medium"
        >
          Consultation
        </Link>

<Link href="/about" className="text-gray-700 hover:text-green-800 font-medium"
        >About</Link>
        <a
  href="https://wa.me/447446229840"
  target="_blank"
  className="px-3 py-1 border border-green-700 text-green-700 rounded-lg hover:bg-green-50 inline-flex items-center gap-2"
>
  {/* WhatsApp Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-4 h-4"
  >
    <path
      fill="#25D366"
      d="M16 .8C7.6.8.8 7.6.8 16c0 2.7.7 5.3 2.1 7.6L0 32l8.7-2.9c2.2 1.2 4.7 1.9 7.3 1.9 8.4 0 15.2-6.8 15.2-15.2C31.2 7.6 24.4.8 16 .8z"
    />
    <path
      fill="#FFF"
      d="M24.2 19.4c-.3-.1-2-.9-2.3-1s-.5-.2-.8.2-.9 1.3-1.2 1.5-.5.3-.9.1c-.5-.2-2-1-3.7-2.8C13 15.5 12.3 14 12 13.5c-.3-.5 0-.8.2-1 .2-.2.5-.6.7-.9.2-.3.3-.5.5-.8.2-.3.1-.5 0-.8s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.8.1-1.2.5-.4.4-1.6 1.5-1.6 3.6s1.6 4.2 1.8 4.5c.2.3 3 4.7 7.3 6.6 1 .4 1.8.7 2.4.9 1 .3 1.9.3 2.6.2.8-.1 2.5-1 2.8-2 .3-1 .3-1.8.2-2-.1-.2-.3-.3-.7-.5z"
    />
  </svg>

  +447446229840
</a>

        <Link href="/student/login" className="bg-white text-green-400 border border-green-400 hover:bg-green-30 px-2 py-1 text-lg">
    Student Login
</Link>

      </div>
    </nav>
  );
}
