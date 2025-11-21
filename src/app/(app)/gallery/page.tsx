import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GalleryGrid from '@/components/emotikey/gallery-grid';

export default function GalleryPage() {
  return (
    <div className="space-y-6">
      <GalleryGrid />
    </div>
  );
}
