// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import ProductForm from '@/components/ProductForm';
// import { Product } from '@/lib/types';

// export default function AdminPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [apiKey, setApiKey] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchProducts();
//     }
//   }, [isAuthenticated]);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('/api/products');
//       const result = await response.json();
//       if (result.success) {
//         setProducts(result.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       alert('Failed to fetch products');
//     }
//   };

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('/api/auth', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ apiKey }),
//       });

//       const result = await response.json();
//       if (result.success) {
//         setIsAuthenticated(true);
//         localStorage.setItem('adminApiKey', apiKey);
//       } else {
//         alert('Invalid API key');
//       }
//     } catch (error) {
//       alert('Authentication failed');
//     }
//   };

//   const handleSubmit = async (productData: Partial<Product>) => {
//     setLoading(true);
//     try {
//       const method = editingProduct ? 'PUT' : 'POST';
//       const response = await fetch('/api/products', {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': apiKey,
//         },
//         body: JSON.stringify(productData),
//       });

//       const result = await response.json();
//       if (result.success) {
//         alert(
//           `Product ${editingProduct ? 'updated' : 'created'} successfully!`
//         );
//         setShowForm(false);
//         setEditingProduct(null);
//         fetchProducts();
//       } else {
//         alert('Failed to save product: ' + result.error);
//       }
//     } catch (error) {
//       alert('Error saving product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (product: Product) => {
//     setEditingProduct(product);
//     setShowForm(true);
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setEditingProduct(null);
//   };

//   // Authentication screen
//   if (!isAuthenticated) {
//     return (
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-lg shadow-md p-8">
//             <h1 className="text-3xl font-bold mb-6 text-center">
//               Admin Access
//             </h1>
//             <form onSubmit={handleAuth} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   API Key
//                 </label>
//                 <input
//                   type="password"
//                   value={apiKey}
//                   onChange={(e) => setApiKey(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter admin API key"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Login
//               </button>
//             </form>
//             <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
//               <strong>Hint:</strong> Use the API key from .env.local file
//               (default: admin123secret)
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
//           <p className="text-gray-600">
//             Manage products (Client-Side Rendering - CSR)
//           </p>
//         </div>
//         <button
//           onClick={() => setIsAuthenticated(false)}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="mb-6">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           {showForm ? 'Cancel' : '+ Add New Product'}
//         </button>
//       </div>

//       {showForm && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-2xl font-semibold mb-4">
//             {editingProduct ? 'Edit Product' : 'Add New Product'}
//           </h2>
//           <ProductForm
//             product={editingProduct || undefined}
//             onSubmit={handleSubmit}
//             onCancel={handleCancel}
//           />
//         </div>
//       )}

//       {/* <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold">Products List</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Slug
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Price
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Inventory
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Category
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {products.map((product) => (
//                 <tr key={product.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-gray-900">
//                       {product.name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {product.slug}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-semibold text-gray-900">
//                     ${product.price}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-900">
//                     {product.inventory}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {product.category}
//                   </td>
//                   <td className="px-6 py-4 text-sm">
//                     <button
//                       onClick={() => handleEdit(product)}
//                       className="text-blue-600 hover:text-blue-900 font-medium"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

     
//     </div>
//   );
// } */}
// <div className="bg-white rounded-lg shadow-md overflow-hidden">
//   <div className="px-6 py-4 border-b border-gray-200">
//     <h2 className="text-xl font-semibold">Products List</h2>
//   </div>
//   <div className="overflow-x-auto">
//     <table className="w-full">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Image
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Name
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Slug
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Price
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Inventory
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Category
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//             Actions
//           </th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {products.map((product) => (
//           <tr key={product.id} className="hover:bg-gray-50">
//             <td className="px-6 py-4">
//               <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
//                 {product.image ? (
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     className="object-cover"
//                     sizes="64px"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-2xl">
//                     📦
//                   </div>
//                 )}
//               </div>
//             </td>
//             <td className="px-6 py-4">
//               <div className="text-sm font-medium text-gray-900">
//                 {product.name}
//               </div>
//             </td>
//             <td className="px-6 py-4 text-sm text-gray-600">
//               {product.slug}
//             </td>
//             <td className="px-6 py-4 text-sm font-semibold text-gray-900">
//               ${product.price}
//             </td>
//             <td className="px-6 py-4 text-sm text-gray-900">
//               {product.inventory}
//             </td>
//             <td className="px-6 py-4 text-sm text-gray-600">
//               {product.category}
//             </td>
//             <td className="px-6 py-4 text-sm">
//               <button
//                 onClick={() => handleEdit(product)}
//                 className="text-blue-600 hover:text-blue-900 font-medium"
//               >
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   <div className="mt-8 p-6 bg-purple-50 rounded-lg">
//   <h2 className="text-xl font-semibold mb-2">
//     💻 Rendering Strategy: Client-Side Rendering (CSR)
//   </h2>
//   <p className="text-gray-700">
//     This admin panel uses client-side rendering for dynamic interactions.
//     Data is fetched after authentication and forms are handled entirely on
//     the client side for a smooth user experience.
//   </p>
// </div>
// </div>






























'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/lib/types';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      if (result.success) {
        setProducts(result.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });

      const result = await response.json();
      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminApiKey', apiKey);
      } else {
        alert('Invalid API key');
      }
    } catch (error) {
      alert('Authentication failed');
    }
  };

  const handleSubmit = async (productData: Partial<Product>) => {
    setLoading(true);
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const response = await fetch('/api/products', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      if (result.success) {
        alert(
          `Product ${editingProduct ? 'updated' : 'created'} successfully!`
        );
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert('Failed to save product: ' + result.error);
      }
    } catch (error) {
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Authentication screen
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">
              Admin Access
            </h1>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin API key"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
            <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
              <strong>Hint:</strong> Use the API key from .env.local file
              (default: admin123secret)
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Manage products (Client-Side Rendering - CSR)
          </p>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add New Product'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Products List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Inventory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-2xl">
                          📦
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.slug}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {product.inventory}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mt-8 p-6 bg-purple-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">
          💻 Rendering Strategy: Client-Side Rendering (CSR)
        </h2>
        <p className="text-gray-700">
          This admin panel uses client-side rendering for dynamic interactions.
          Data is fetched after authentication and forms are handled entirely on
          the client side for a smooth user experience.
        </p>
      </div> */}
    </div>
  );
}