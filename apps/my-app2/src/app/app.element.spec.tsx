import { render, screen } from '@solidjs/testing-library';
import { describe, it, expect } from 'vitest';
import AppElement from './app.element';

describe('AppElement', () => {
  it('renders Hello from Solid.js!', () => {
    render(() => <AppElement />);
    expect(screen.getByText('Hello from Solid.js!')).toBeDefined();
    expect(screen.getByText('Hello from Solid.js!')).toBeTruthy();
    expect(screen.getByText('Hello from Solid.js!')).toBeInTheDocument();
  });
});
