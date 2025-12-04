export type DocumentDto = {
  id: number;
  title: string;
  author: string;
  status: 'DRAFT' | 'SIGNED' | 'ARCHIVED';
  updatedAt: string;
  content: string;
};
