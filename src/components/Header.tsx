import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            E-Commerce Store
          </Link>
          <div className="space-x-6">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link href="/dashboard" className="hover:text-blue-200">
              Dashboard
            </Link>
            <Link href="/admin" className="hover:text-blue-200">
              Admin
            </Link>
            <Link href="/recommendations" className="hover:text-blue-200">
              Recommendations
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}