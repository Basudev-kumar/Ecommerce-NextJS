// 'use client';

// import { useState } from 'react';
// import { Product } from '@/lib/types';

// interface ProductFormProps {
//   product?: Product;
//   onSubmit: (product: Partial<Product>) => void;
//   onCancel?: () => void;
// }

// export default function ProductForm({
//   product,
//   onSubmit,
//   onCancel,
// }: ProductFormProps) {
//   const [formData, setFormData] = useState({
//     name: product?.name || '',
//     slug: product?.slug || '',
//     description: product?.description || '',
//     price: product?.price || 0,
//     category: product?.category || '',
//     inventory: product?.inventory || 0,
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       id: product?.id,
//     });
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'price' || name === 'inventory' ? Number(value) : value,
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Product Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Slug
//         </label>
//         <input
//           type="text"
//           name="slug"
//           value={formData.slug}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="product-slug"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Description
//         </label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           rows={4}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Price ($)
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//             min="0"
//             step="0.01"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Inventory
//           </label>
//           <input
//             type="number"
//             name="inventory"
//             value={formData.inventory}
//             onChange={handleChange}
//             required
//             min="0"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Category
//         </label>
//         <input
//           type="text"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="flex gap-4">
//         <button
//           type="submit"
//           className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           {product ? 'Update Product' : 'Create Product'}
//         </button>
//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }


























'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import Image from 'next/image';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Partial<Product>) => void;
  onCancel?: () => void;
}

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    inventory: product?.inventory || 0,
    image: product?.image || '',
  });

  const [imagePreview, setImagePreview] = useState(product?.image || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: product?.id,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'inventory' ? Number(value) : value,
    }));

    // Update image preview when image URL changes
    if (name === 'image') {
      setImagePreview(value);
    }
  };

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    setFormData((prev) => ({
      ...prev,
      name,
      slug,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Wireless Headphones"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug (auto-generated) *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="product-slug"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL-friendly version of the name
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your product..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="99.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inventory *
              </label>
              <input
                type="number"
                name="inventory"
                value={formData.inventory}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange as any}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://images.unsplash.com/photo-..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Use Unsplash or placeholder URLs
            </p>
            <div className="mt-2 flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  const url = `https://placehold.co/600x600/3b82f6/ffffff?text=${encodeURIComponent(formData.name || 'Product')}`;
                  setFormData(prev => ({ ...prev, image: url }));
                  setImagePreview(url);
                }}
                className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                Generate Placeholder
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Image Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Preview
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            {imagePreview ? (
              <div className="space-y-2">
                <div className="relative aspect-square w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={() => {
                      setImagePreview('');
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, image: '' }));
                    setImagePreview('');
                  }}
                  className="w-full text-sm text-red-600 hover:text-red-800"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🖼️</div>
                <p className="text-gray-500 text-sm">
                  No image selected
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Enter an image URL to see preview
                </p>
              </div>
            )}
          </div>

          {/* Quick Image Suggestions */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              📌 Quick Image Sources:
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>
                • <strong>Unsplash:</strong> https://unsplash.com/s/photos/product
              </li>
              <li>
                • <strong>Placeholder:</strong> Click "Generate Placeholder" button
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          {product ? '✓ Update Product' : '+ Create Product'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}