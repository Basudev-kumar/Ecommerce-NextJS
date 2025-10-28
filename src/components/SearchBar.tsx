// import Link from 'next/link';

// export default function Header() {
//   return (
//     <header className="bg-blue-600 text-white shadow-lg">
//       <nav className="container mx-auto px-4 py-4">
//         <div className="flex justify-between items-center">
//           <Link href="/" className="text-2xl font-bold">
//             E-Commerce Store
//           </Link>
//           <div className="space-x-6">
//             <Link href="/" className="hover:text-blue-200">
//               Home
//             </Link>
//             <Link href="/dashboard" className="hover:text-blue-200">
//               Dashboard
//             </Link>
//             <Link href="/admin" className="hover:text-blue-200">
//               Admin
//             </Link>
//             <Link href="/recommendations" className="hover:text-blue-200">
//               Recommendations
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }


















'use client';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export default function SearchBar({
  onSearch,
  onCategoryChange,
  categories,
}: SearchBarProps) {
  return (
    <div className="mb-8 flex gap-4 flex-wrap">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}