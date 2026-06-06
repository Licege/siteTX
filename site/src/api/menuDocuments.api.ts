import request from '../lib/request';
import { baseUrl } from './config';

export type MenuDocumentType = 'MENU' | 'BAR' | 'BANQUET';

export type MenuDocument = {
  id?: number;
  type: MenuDocumentType;
  files: string[];
};

export const menuDocumentsAPI = {
  getAll(): Promise<MenuDocument[]> {
    return request.get(`${baseUrl}/menu-documents/`)
      .then(payload => payload)
      .catch(reason => {
        console.error(reason);
        return [];
      });
  },
};
