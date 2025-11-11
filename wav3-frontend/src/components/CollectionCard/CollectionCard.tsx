import React from 'react';
import { motion } from 'framer-motion';
import styles from './CollectionCard.module.css';

interface Collection {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  theme: string;
}

interface CollectionCardProps {
  collection: Collection;
  onEnter: (slug: string) => void;
  index: number;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onEnter,
  index
}) => {
  return (
    <motion.div
      className={styles.collectionCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <button
        className={styles.cardButton}
        onClick={() => onEnter(collection.slug)}
        aria-label={`Enter ${collection.title} collection`}
      >
        <div className={styles.imageContainer}>
          <img
            src={collection.heroImage}
            alt={collection.title}
            className={styles.heroImage}
            loading="lazy"
          />
          <div className={styles.overlay}>
            <h3 className={styles.title}>{collection.title}</h3>
            <p className={styles.theme}>{collection.theme}</p>
          </div>
        </div>
      </button>
    </motion.div>
  );
};