import React, { useState, useEffect } from 'react';
import { SpiritZone } from '../components/SpiritZone/SpiritZone';
import { CollectionsRow } from '../components/CollectionsRow/CollectionsRow';
import { apiClient, Collection } from '../services/api';

export const Home: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const data = await apiClient.getCollections();
      setCollections(data);
    } catch (error) {
      console.error('Failed to load collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnterCollection = (slug: string) => {
    // TODO: Implement collection entry
    console.log('Enter collection:', slug);
  };

  const handleSpiritCta = () => {
    // TODO: Implement Spirit Zone CTA
    console.log('Spirit Zone CTA clicked');
  };

  return (
    <div className="home">
      <SpiritZone 
        onCta={handleSpiritCta}
        title="Wav3 World"
        subtitle="The Wave = trial. The Spirit = response."
        ctaLabel="Shop Now"
      />
      
      {!loading && (
        <CollectionsRow 
          collections={collections}
          onEnterCollection={handleEnterCollection}
        />
      )}
    </div>
  );
};