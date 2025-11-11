import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import styles from './ItemCard.module.css';

export type ItemView = 'front' | 'back' | 'label' | 'details';

interface Item {
  id: string;
  title: string;
  images: {
    front: string;
    back: string;
    label: string;
  };
  price: number;
  stock: number;
  sizes: string[];
}

interface ItemCardProps {
  item: Item;
  onWishlist: (itemId: string) => void;
  onAddToCart: (itemId: string, size?: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onWishlist,
  onAddToCart
}) => {
  const [currentView, setCurrentView] = useState<ItemView>('front');
  const [showHotspotHints, setShowHotspotHints] = useState(true);
  const { isAuthenticated, loginRedirect } = useAuth();

  const handleHotspotClick = (view: ItemView) => {
    setCurrentView(view);
    setShowHotspotHints(false);
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      loginRedirect({
        type: 'ADD_WISHLIST',
        payload: { itemId: item.id },
        timestamp: Date.now()
      });
      return;
    }
    onWishlist(item.id);
  };

  const handleAddToCart = (size?: string) => {
    if (!isAuthenticated) {
      loginRedirect({
        type: 'ADD_CART',
        payload: { itemId: item.id, size },
        timestamp: Date.now()
      });
      return;
    }
    onAddToCart(item.id, size);
  };

  const getImageForView = (view: ItemView) => {
    switch (view) {
      case 'front': return item.images.front;
      case 'back': return item.images.back;
      case 'label': return item.images.label;
      case 'details': return item.images.front;
    }
  };

  return (
    <div className={styles.itemCard} role="region" aria-label={`Product: ${item.title}`}>
      <div className={styles.cardContainer}>
        {/* Hotspots */}
        <button
          className={`${styles.hotspot} ${styles.hotspotCenter}`}
          onClick={() => handleHotspotClick('front')}
          aria-label="View front of product"
        />
        <button
          className={`${styles.hotspot} ${styles.hotspotTop}`}
          onClick={() => handleHotspotClick('back')}
          aria-label="View back of product"
        />
        <button
          className={`${styles.hotspot} ${styles.hotspotLeft}`}
          onClick={() => handleHotspotClick('label')}
          aria-label="View product label"
        />
        <button
          className={`${styles.hotspot} ${styles.hotspotRight}`}
          onClick={() => handleHotspotClick('details')}
          aria-label="View product details"
        />

        {/* Main Image */}
        <div className={styles.imageContainer}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentView}
              src={getImageForView(currentView)}
              alt={`${item.title} - ${currentView} view`}
              className={styles.itemImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Hotspot Hints */}
          {showHotspotHints && (
            <div className={styles.hotspotHints}>
              <div className={styles.hintTop}>Back</div>
              <div className={styles.hintLeft}>Label</div>
              <div className={styles.hintRight}>Details</div>
              <div className={styles.hintCenter}>Front</div>
            </div>
          )}

          {/* Action Icons */}
          <div className={styles.actionIcons}>
            <button
              className={styles.wishlistIcon}
              onClick={handleWishlist}
              aria-label="Add to wishlist"
            >
              ♡
            </button>
            <button
              className={styles.cartIcon}
              onClick={() => handleAddToCart()}
              aria-label="Add to cart"
            >
              +
            </button>
          </div>
        </div>

        {/* Details View */}
        {currentView === 'details' && (
          <motion.div
            className={styles.detailsPanel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className={styles.itemTitle}>{item.title}</h3>
            <p className={styles.itemPrice}>${item.price}</p>
            <div className={styles.sizes}>
              {item.sizes.map(size => (
                <button
                  key={size}
                  className={styles.sizeOption}
                  onClick={() => handleAddToCart(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ARIA Live Announcements */}
        <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>
          {`Now showing ${currentView} view of ${item.title}`}
        </div>
      </div>
    </div>
  );
};