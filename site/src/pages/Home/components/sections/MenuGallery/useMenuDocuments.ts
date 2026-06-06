import { useEffect, useState } from 'react';
import { menuDocumentsAPI, MenuDocument, MenuDocumentType } from '@/api/menuDocuments.api';

type MenuDocumentsMap = Partial<Record<Lowercase<MenuDocumentType>, MenuDocument>>;

export const useMenuDocuments = () => {
  const [documents, setDocuments] = useState<MenuDocumentsMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuDocumentsAPI.getAll()
      .then((items) => {
        const mapped = items.reduce<MenuDocumentsMap>((acc, item) => {
          acc[item.type.toLowerCase() as Lowercase<MenuDocumentType>] = item;
          return acc;
        }, {});

        setDocuments(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  return { documents, loading };
};
