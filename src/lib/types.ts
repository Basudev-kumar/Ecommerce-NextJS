// export interface Product {
//   _id?: string;
//   id: string;
//   name: string;
//   slug: string;
//   description: string;
//   price: number;
//   category: string;
//   inventory: number;
//   lastUpdated: string;
//   image?: string;
// }

// export interface DashboardStats {
//   totalProducts: number;
//   lowStockProducts: number;
//   outOfStock: number;
//   totalValue: number;
//   lastUpdated: string;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }









export interface Product {
  _id?: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
  image?: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  outOfStock: number;
  totalValue: number;
  lastUpdated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}