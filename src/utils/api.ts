type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type SortOption = 'price_asc' | 'price_desc' | 'rating_desc' | 'default';

const API_BASE = 'https://fakestoreapi.com';

export const fetchProducts = async (
  categories: string[] = [],
  sortOption: SortOption = 'default',
  signal?: AbortSignal
): Promise<Product[]> => {
  try {
    // Start with base URL
    let url = `${API_BASE}/products`;
    
    // FakeStoreAPI only supports single-category filtering
    if (categories.length === 1) {
      url = `${url}/category/${encodeURIComponent(categories[0])}`;
    }

    // Fetch products
    const response = await fetch(url, { signal });
    let products: Product[] = await response.json();

    // Client-side filtering for multiple categories
    if (categories.length > 1) {
      products = products.filter(product => 
        categories.includes(product.category)
      );
    }

    // Client-side sorting
    switch (sortOption) {
      case 'price_asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating_desc':
        return products.sort((a, b) => b.rating.rate - a.rating.rate);
      default:
        return products;
    }
  } catch (error) {
    if (signal?.aborted) {
      console.log('Request was aborted');
      return [];
    }
    throw error;
  }
};

export const fetchCategories = async (signal?: AbortSignal): Promise<string[]> => {
  const response = await fetch(`${API_BASE}/products/categories`, { signal });
  return response.json();
};