import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Product } from '@/lib/types';

// GET /api/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const products = await db
      .collection<Product>('products')
      .find({})
      .toArray();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    // Check for admin API key
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const product: Product = {
      ...body,
      id: body.id || `prod_${Date.now()}`,
      lastUpdated: new Date().toISOString(),
    };

    const db = await getDatabase();
    const result = await db.collection<Product>('products').insertOne(product);

    return NextResponse.json({
      success: true,
      data: { ...product, _id: result.insertedId },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}

// PUT /api/products - Update product
export async function PUT(request: NextRequest) {
  try {
    // Check for admin API key
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    const db = await getDatabase();
    const result = await db.collection<Product>('products').updateOne(
      { id },
      {
        $set: {
          ...updateData,
          lastUpdated: new Date().toISOString(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id, ...updateData },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product',
      },
      { status: 500 }
    );
  }
}