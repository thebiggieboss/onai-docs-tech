export interface HttpState<T> {
  entity: T | null;
  loading: boolean;
  error: any | null;
}

export const defaultHttpState: HttpState<any> = {
  entity: null,
  loading: false,
  error: null,
};
