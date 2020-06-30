import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { render } from '@testing-library/react';
import AmpFallback from './index';

describe('AmpFallback', () => {
  shouldMatchSnapshot('should render correctly', <AmpFallback />);

  it('should test example template', () => {
    const { container } = render(<AmpFallback />);
    expect(container.querySelector('h1').textContent).toEqual('Hello World');
  });
});
