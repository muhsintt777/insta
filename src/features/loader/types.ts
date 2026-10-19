export type LoaderStatus = 'LOADING' | 'SUCCESS' | 'FAILED' | 'IDLE';

export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderState {
  showBackdrop: boolean;
}
