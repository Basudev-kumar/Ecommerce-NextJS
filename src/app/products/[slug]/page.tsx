import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { getDatabase } from '@/lib/mongodb';

// Enable ISR with revalidation every 60 seconds
export const revalidate = 60;

// Generate static params for all products at build time
export async function generateStaticParams() {
  const db = await getDatabase();
  const products = await db.collection<Product>('products').find({}).toArray();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Fetch product data
async function getProduct(slug: string): Promise<Product | null> {
  const db = await getDatabase();
  const product = await db.collection<Product>('products').findOne({ slug });
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const lastUpdated = new Date(product.lastUpdated).toLocaleString();

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800"
      >
        ← Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image Section */}
          <div className="md:w-1/2 relative bg-gray-200">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            ) : (
              <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-12">
                <span className="text-white text-9xl">📦</span>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-700 font-semibold">
                  Availability:
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    product.inventory > 10
                      ? 'bg-green-100 text-green-800'
                      : product.inventory > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.inventory > 0
                    ? `${product.inventory} in stock`
                    : 'Out of Stock'}
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-6">
                Last updated: {lastUpdated}
              </div>
            </div>

            <div className="space-y-3">
              <button
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={product.inventory === 0}
              >
                {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                Add to Wishlist
              </button>
            </div>

            
          </div>
        </div>

        {/* Additional Product Details */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Product ID</h3>
              <p className="text-gray-600">{product.id}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">SKU</h3>
              <p className="text-gray-600">{product.slug}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}