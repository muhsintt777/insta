/// <reference types="vitest" />
import '@testing-library/jest-dom';

// Mock URL.createObjectURL which is not available in jsdom
if (typeof URL.createObjectURL === 'undefined') {
  Object.defineProperty(URL, 'createObjectURL', {
    value: () => 'mock-object-url',
    writable: true,
  });
}

if (typeof URL.revokeObjectURL === 'undefined') {
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: () => {},
    writable: true,
  });
}
