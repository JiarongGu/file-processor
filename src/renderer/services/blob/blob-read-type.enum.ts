import { FileType } from '@shared/models';

enum BlobReadTypeBase {
  Base64 = 'base64',
  URL = 'url',
}

export type BlobReadType = FileType | BlobReadTypeBase;
export const BlobReadType = { ...BlobReadTypeBase, ...FileType };
