---
applyTo: '**'
---

# Unit Testing Instructions

## Test Stack

- **Test Runner**: Vitest
- **DOM Environment**: jsdom
- **Testing Library**: @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- **Assertions**: Vitest's `expect` with jest-dom matchers

## File Structure

- Place test files alongside the component: `component-name.test.tsx`
- Use the `test-utils` alias for imports

## Standard Test Pattern

```tsx
import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('does something', async () => {
    const user = userEvent.setup();

    renderWithProviders(<MyComponent />, {
      preloadedState: {
        /* optional Redux state */
      },
      route: '/optional-route',
    });

    expect(screen.getByRole('button')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
  });
});
```

## Testing Best Practices

- Target 90% code coverage overall.
- Targget minimum 80% coverage per file.

### Rendering

- Use `renderWithProviders` from `test-utils` for components that need Redux or Router context
- Use standard `render` from `test-utils` for simple components without context needs

### Queries (Priority Order)

1. `getByRole` - Accessible queries (buttons, textboxes, headings)
2. `getByLabelText` - Form fields with labels
3. `getByPlaceholderText` - Input placeholders
4. `getByText` - Text content
5. `getByTestId` - Last resort, when no semantic query works

### User Interactions

- Always use `userEvent` over `fireEvent` for realistic interactions
- Setup userEvent at the start: `const user = userEvent.setup()`
- Use `await` for all user interactions

```tsx
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');
```

### Assertions

- Use jest-dom matchers: `toBeInTheDocument()`, `toHaveValue()`, `toBeDisabled()`, etc.
- For style assertions on inline styles: `element.style.propertyName`
- For MUI classes: `toHaveClass('MuiButton-fullWidth')`

### Mocking

- Use `vi.fn()` for function mocks
- Use `vi.mock()` for module mocks
- Prefer testing real behavior over mocking when possible

### Testing Disabled States

- MUI buttons have `pointer-events: none` when disabled
- Test disabled state with `toBeDisabled()` assertion instead of clicking

```tsx
// ✅ Correct
expect(button).toBeDisabled();

// ❌ Avoid - will throw error with MUI buttons
await user.click(disabledButton);
```

### Testing Loaders

- When `showLoader` is true, verify text is NOT in document
- Use `queryByText` for elements that may not exist

```tsx
expect(screen.queryByText('Submit')).not.toBeInTheDocument();
```

### Testing Custom Styles

- For inline styles via `style` prop:

```tsx
const element = container.firstChild as HTMLElement;
expect(element.style.backgroundColor).toBe('red');
```

## What NOT to Do

- ❌ No snapshot tests unless absolutely necessary
- ❌ Don't use `renderToStaticMarkup` for component tests
- ❌ Don't mock CSS modules or child components unless necessary
- ❌ Don't use dynamic imports in tests
- ❌ Avoid testing implementation details

## Running Tests

```bash
yarn test          # Watch mode
yarn test:run      # Single run
yarn test:coverage # With coverage
```
