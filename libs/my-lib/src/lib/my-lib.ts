import { myLib2 } from '@my-nx-ws/my-lib2';

export function myLib(): string {
  return `my-lib used ${myLib2()}`;
}
