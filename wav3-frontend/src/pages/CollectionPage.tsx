import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SpiritZone } from '../components/SpiritZone/SpiritZone';
import { ItemCard } from '../components/ItemCard/ItemCard';
import { apiClient, Item } from '../services/api';
import { useCart } from '../contexts/CartContext';
import styles from './CollectionPage.module.css';

interface CollectionData {
  id: string;
  slug: string;
  title: string;
  description: string;
  theme: string;
  items: Item[];
}

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<CollectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const { addItem } = useCart();

  useEffect(() => {
    if (slug) {
      loadCollection(slug);
    }
  }, [slug]);

  const loadCollection = async (collectionSlug: string) => {
    try {
      const data = await apiClient.getCollection(collectionSlug);
      setCollection(data);
    } catch (error) {
      console.error('Failed to load collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = (itemId: string) => {
    console.log('Add to wishlist:', itemId);
    // TODO: Implement wishlist logic
  };

  const handleAddToCart = (itemId: string, size?: string) => {
    addItem(itemId, size);
  };

  const handleNextItem = () => {
    if (collection) {
      setCurrentItemIndex(prev => 
        prev < collection.items.length - 1 ? prev + 1 : prev
      );
    }
  };

  const handlePrevItem = () => {
    setCurrentItemIndex(prev => prev > 0 ? prev - 1 : prev);
  };

  if (loading) {
    return (
      <div className={styles.collectionPage}>
        <SpiritZone />
        <div className={styles.loading}>Loading collection...</div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className={styles.collectionPage}>
        <SpiritZone />
        <div className={styles.error}>Collection not found</div>
      </div>
    );
  }

  const currentItem = collection.items[currentItemIndex];

  return (
    <div className={styles.collectionPage}>
      {/* Updated Spirit Zone with collection context */}
      <SpiritZone
        title={collection.title}
        subtitle={collection.description}
        ctaLabel="Explore Collection"
      />

      {/* Collection Items Carousel */}
      <section className={styles.itemsSection} aria-label="Collection items">
        <div className={styles.carouselContainer}>
          <button
            className={styles.navButton}
            onClick={handlePrevItem}
            disabled={currentItemIndex === 0}
            aria-label="Previous item"
          >
            ‹
          </button>

          <div className={styles.carousel}>
            <AnimatePresence mode="wait">
              {currentItem && (
                <motion.div
                  key={currentItem.id}
                  className={styles.itemContainer}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemCard
                    item={currentItem}
                    onWishlist={handleWishlist}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className={styles.navButton}
            onClick={handleNextItem}
            disabled={currentItemIndex === collection.items.length - 1}
            aria-label="Next item"
          >
            ›
          </button>
        </div>

        {/* Progress Indicator */}
        <div className={styles.progress} role="progressbar" aria-valuenow={currentItemIndex + 1} aria-valuemin={1} aria-valuemax={collection.items.length}>
          <div 
            className={styles.progressBar}
            style={{ 
              width: `${((currentItemIndex + 1) / collection.items.length) * 100}%` 
            }}
          />
          <span className={styles.progressText}>
            {currentItemIndex + 1} / {collection.items.length}
          </span>
        </div>
      </section>
    </div>
  );
};