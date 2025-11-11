import React, { useRef } from 'react';
import { CollectionCard } from '../CollectionCard/CollectionCard';
import styles from './CollectionsRow.module.css';

interface Collection {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  theme: string;
}

interface CollectionsRowProps {
  collections: Collection[];
  onEnterCollection: (slug: string) => void;
}

export const CollectionsRow: React.FC<CollectionsRowProps> = ({
  collections,
  onEnterCollection
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <section 
      className={styles.collectionsRow}
      aria-label="Collections"
      role="region"
      aria-roledescription="carousel"
    >
      <h2 className={styles.sectionTitle}>Collections</h2>
      
      <div 
        ref={scrollRef}
        className={styles.scrollContainer}
        onWheel={handleScroll}
      >
        <div className={styles.cardsContainer}>
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onEnter={onEnterCollection}
              index={index}
            />
          ))}
        </div>
        
        {/* Edge fade overlays */}
        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />
      </div>
    </section>
  );
};