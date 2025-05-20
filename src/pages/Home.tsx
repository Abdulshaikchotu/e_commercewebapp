import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../utils/api';
import styles from '../styles/Home.module.css';

type SortOption = 'price_asc' | 'price_desc' | 'rating_desc' | 'default';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get stable filter values from URL
  const selectedCategories = useMemo(
    () => searchParams.getAll('category'),
    [searchParams.toString()]
  );
  const sortOption = useMemo(
    () => (searchParams.get('sort') as SortOption) || 'default',
    [searchParams.toString()]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(selectedCategories, sortOption, signal),
          fetchCategories(signal),
        ]);
        
        if (!signal.aborted) {
          setProducts(productsData);
          setCategories(categoriesData);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error('Failed to load data:', error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [selectedCategories, sortOption]);

  const updateURLParams = (updates: { category?: string; sort?: string }) => {
    const newParams = new URLSearchParams(searchParams);

    // Handle category updates
    if (updates.category !== undefined) {
      newParams.delete('category');
      if (updates.category) {
        newParams.append('category', updates.category);
      }
    }

    // Handle sort updates
    if (updates.sort !== undefined) {
      if (updates.sort) {
        newParams.set('sort', updates.sort);
      } else {
        newParams.delete('sort');
      }
    }

    setSearchParams(newParams, { replace: true });
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      // Remove all instances of this category
      const newCategories = selectedCategories.filter(c => c !== category);
      const newParams = new URLSearchParams();
      newCategories.forEach(c => newParams.append('category', c));
      if (sortOption !== 'default') {
        newParams.set('sort', sortOption);
      }
      setSearchParams(newParams, { replace: true });
    } else {
      // Add new category while preserving others
      updateURLParams({ category });
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateURLParams({ sort: e.target.value });
  };

  if (loading) {
    return <div className={styles.loading}></div>;
  }

  return (
    <div className={styles.home}>
      <div className={styles.controls}>
        <div className={styles.filters}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`${styles.filterButton} ${
                selectedCategories.includes(category) ? styles.active : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.sortContainer}>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Top Rated</option>
          </select>
        </div>
      </div>

      <div className={styles.productGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className={styles.noResults}>
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
};