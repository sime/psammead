import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import notes from '../README.md';
import AmpFallback from './index';

storiesOf('Components|AmpFallback', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', () => <AmpFallback />, { notes });
