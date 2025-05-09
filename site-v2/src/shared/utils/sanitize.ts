import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    ALLOWED_ATTR: ['a', 'p', 'span', 'br']
  });
