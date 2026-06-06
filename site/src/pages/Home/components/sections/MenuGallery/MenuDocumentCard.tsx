import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import ImageWithBackground from '@/components/core/ImageWithBackground';
import PhotoViewer from '@/components/Gallery/PhotoViewer';
import { Button } from '@/components/core';
import { fullLink } from '@/plugins/helpers';
import { MenuDocument } from '@/api/menuDocuments.api';

interface IProps {
  title: string;
  document: MenuDocument;
  withAgeGate?: boolean;
}

const MenuDocumentCard: FC<IProps> = ({
  title,
  document,
  withAgeGate = false,
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(withAgeGate);

  const images = useMemo(
    () => document.files.map(fullLink),
    [document.files]
  );

  const previewSrc = document.previewSrc
    ? fullLink(document.previewSrc)
    : images[0];
  const galleryImages = images;

  const onOpen = useCallback(() => {
    if (galleryImages.length) {
      setIsGalleryOpen(true);
    }
  }, [galleryImages.length]);

  const onCloseGallery = useCallback(() => setIsGalleryOpen(false), []);

  return (
    <Wrapper>
      {showAgeGate && (
        <AgeGate>
          <Button variant="contained" color="secondary" onClick={() => setShowAgeGate(false)}>
            Мне есть 18 лет
          </Button>
        </AgeGate>
      )}
      <CardTitle>{title}</CardTitle>
      <ImageWithBackground imageSrc={previewSrc} onClick={onOpen} />
      {galleryImages.length > 0 && (
        <PhotoViewer images={galleryImages} isOpen={isGalleryOpen} onClose={onCloseGallery} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const CardTitle = styled.div`
  margin-bottom: 12px;
  font-weight: 600;
  text-align: center;
`;

const AgeGate = styled.div`
  position: absolute;
  inset: 36px 0 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 4px;
`;

export default MenuDocumentCard;
