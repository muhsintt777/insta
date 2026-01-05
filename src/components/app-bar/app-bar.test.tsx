import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// Mock local CSS module
vi.mock('./app-bar.module.scss', () => ({
  default: {
    container: 'container',
    iconWrap: 'iconWrap',
  },
}));

// Mock PrimaryIconButton to render a simple button
vi.mock('components/buttons/primary-icon-button', () => ({
  PrimaryIconButton: ({ children, onClick }: any) => (
    <button data-testid="primary-icon-button" onClick={onClick}>
      {children}
    </button>
  ),
}));

// Mock BackIcon to a simple element
vi.mock('assets/icons-components/back-icon', () => ({
  BackIcon: () => <span data-testid="back-icon" />,
}));

let AppBar: any;

beforeEach(async () => {
  const mod = await import('./app-bar');
  AppBar = mod.AppBar;
});

describe('AppBar', () => {
  it('renders title', () => {
    const onBack = vi.fn();
    const markup = renderToStaticMarkup(
      // dynamic import ensures mocks are applied
      <AppBar title="My Title" onBackClick={onBack} />,
    );

    expect(markup).toContain('My Title');
  });
});
