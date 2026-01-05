// Re-export everything from @testing-library/react for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// Export custom render utilities
export { renderWithProviders } from './render';
export type { AppStore, TestRootState } from './render';
