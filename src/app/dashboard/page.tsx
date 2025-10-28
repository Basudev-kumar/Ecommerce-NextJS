import { getDatabase } from '@/lib/mongodb';
import { Product, DashboardStats } from '@/lib/types';
import Link from 'next/link';

// Force dynamic rendering (SSR)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getDashboardStats(): Promise<DashboardStats> {
  const db = await getDatabase();
  const products = await db.collection<Product>('products').find({}).toArray();

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.inventory < 10 && p.inventory > 0).length;
  const outOfStock = products.filter((p) => p.inventory === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.inventory, 0);

  return {
    totalProducts,
    lowStockProducts,
    outOfStock,
    totalValue,
    lastUpdated: new Date().toISOString(),
  };
}

async function getProducts(): Promise<Product[]> {
  const db = await getDatabase();
  const products = await db
    .collection<Product>('products')
    .find({})
    .sort({ inventory: 1 })
    .toArray();

  return JSON.parse(JSON.stringify(products));
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const products = await getProducts();
  const lastUpdated = new Date(stats.lastUpdated).toLocaleString();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Inventory Dashboard</h1>
        <p className="text-gray-600">
          Real-time product inventory and statistics (Server-Side Rendering - SSR)
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Last updated: {lastUpdated}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Products
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.totalProducts}
              </p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <span className="text-3xl">📦</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Low Stock</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.lowStockProducts}
              </p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <span className="text-3xl">⚠️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Out of Stock</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {stats.outOfStock}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <span className="text-3xl">❌</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Inventory Value
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${stats.totalValue.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <span className="text-3xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Product Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      ${product.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {product.inventory}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.inventory > 10
                          ? 'bg-green-100 text-green-800'
                          : product.inventory > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.inventory > 10
                        ? 'In Stock'
                        : product.inventory > 0
                        ? 'Low Stock'
                        : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mt-8 p-6 bg-green-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          🔄 Rendering Strategy: Server-Side Rendering (SSR)
        </h2>
        <p className="text-gray-700">
          This dashboard uses SSR to fetch fresh data on every request. This
          ensures you always see the most up-to-date inventory statistics and
          product information.
        </p>
      </div> */}
    </div>
  );
}