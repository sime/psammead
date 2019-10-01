import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import {
  UsefulLink,
  UsefulLinksLi,
  UsefulLinksUl,
  UsefulLinkItem,
} from './index';
import notes from '../README.md';

const usefulCaptions = [
  'Mitocinmu da sauko da sautin labarai',
  'Labaran BBC Hausa a text',
  'Abokan huldar BBC Hausa',
  'Timi Frank: Osinbajo ya maka mutum biyu',
  'Gwaninta ba ta karbi wani dan Nijeriya',
];

const urlSources = [
  'https://www.bbc.com/igbo/afirika-49883577',
  'https://www.bbc.com/igbo/afirika-49872694',
  'https://www.bbc.com/igbo/afirika-49869003',
  'https://www.bbc.com/igbo/afirika-49883189',
  'https://www.bbc.com/igbo/afirika-49869001',
];

const generateStory = ({ usefulItems, url }) =>
  inputProvider({
    // eslint-disable-next-line react/prop-types
    componentFunction: ({ script, service }) => {
      return (
        <>
          {usefulItems.length === 1 ? (
            <UsefulLink script={script} service={service} url={url}>
              {usefulItems[0]}
            </UsefulLink>
          ) : (
            <UsefulLinksUl>
              {usefulItems.map((item, index) => {
                return (
                  <UsefulLinksLi key={usefulItems.indexOf(item)}>
                    <UsefulLinkItem
                      service={service}
                      script={script}
                      href={url[index]}
                    >
                      {item}
                    </UsefulLinkItem>
                  </UsefulLinksLi>
                );
              })}
            </UsefulLinksUl>
          )}
        </>
      );
    },
  });

storiesOf('Components|UsefulLinks', module)
  .addDecorator(withKnobs)
  .add(
    'one link',
    generateStory({
      usefulItems: usefulCaptions.slice(0, 1),
      url: urlSources.slice(0, 1),
    }),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  )
  .add(
    'multiple links',
    generateStory({
      usefulItems: usefulCaptions,
      url: urlSources,
    }),
    {
      notes,
      knobs: { escapeHTML: false },
    },
  );
