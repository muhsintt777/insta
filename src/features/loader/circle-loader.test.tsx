import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircleLoader } from './Circle-loader';

describe('CircleLoader', () => {
  it('renders circular progress element', () => {
    render(<CircleLoader />);

    const loader = document.querySelector('.MuiCircularProgress-root');
    expect(loader).toBeInTheDocument();
  });

  it('renders with default size when no size prop', () => {
    render(<CircleLoader />);

    const loader = document.querySelector('.MuiCircularProgress-root');
    expect(loader).toBeInTheDocument();
  });

  it('renders with small size', () => {
    render(<CircleLoader size="small" />);

    const loader = document.querySelector('.MuiCircularProgress-root');
    expect(loader).toBeInTheDocument();
  });

  it('renders with medium size', () => {
    render(<CircleLoader size="medium" />);

    const loader = document.querySelector('.MuiCircularProgress-root');
    expect(loader).toBeInTheDocument();
  });

  it('renders with large size', () => {
    render(<CircleLoader size="large" />);

    const loader = document.querySelector('.MuiCircularProgress-root');
    expect(loader).toBeInTheDocument();
  });
});
