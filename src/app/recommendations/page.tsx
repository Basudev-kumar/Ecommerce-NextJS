import { getDatabase } from '@/lib/mongodb';
import { Product } from '@/lib/types';
import AddToWishlist from '@/components/AddToWishlist';
import Image from 'next/image';

// This is a Server Component by default in App Router
async function getRecommendedProducts(): Promise<Product[]> {
  const db = await getDatabase();
  const products = await db
    .collection<Product>('products')
    .aggregate([
      { $match: { inventory: { $gt: 0 } } },
      { $sample: { size: 6 } },
    ])
    .toArray();

  return JSON.parse(JSON.stringify(products));
}

export default async function RecommendationsPage() {
  const recommendations = await getRecommendedProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Recommended Products</h1>
        <p className="text-gray-600">
          Personalized recommendations just for you (Server Components with
          Client Interactivity)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 bg-gray-200">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-6xl">⭐</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  In Stock
                </span>
              </div>
              <div className="space-y-2">
                {/* This is a Client Component for interactivity */}
                <AddToWishlist
                  productId={product.id}
                  productName={product.name}
                />
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h2 className="text-xl font-semibold mb-2">
          🎨 Rendering Strategy: Hybrid Server + Client Components
        </h2>
        <p className="text-gray-700 mb-2">
          This page demonstrates the modern App Router architecture:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>
            <strong>Server Component:</strong> Product data is fetched on the
            server
          </li>
          <li>
            <strong>Client Component:</strong> "Add to Wishlist" button
            provides interactivity
          </li>
          <li>
            <strong>Benefit:</strong> Fast initial load with dynamic user
            interactions
          </li>
        </ul>
      </div> */}
    </div>
  );
}