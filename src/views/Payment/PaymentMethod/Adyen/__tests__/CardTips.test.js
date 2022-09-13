import React from 'react';
import { render } from '@testing-library/react';
import CardTips from '../CardTips';

jest.mock('moment', () => {
  return () => {
    return {
      format: () => '11/22'
    };
  };
});

jest.mock('react-intl-phraseapp', () => {
  return {
    FormattedMessage: ({ id }) => <div>id</div>
  };
});

test('CardTips', async () => {
  await render(<CardTips />);

  await render(
    <CardTips expirationDate="2022/09/13" expireStatusEnum="EXPIRED" />
  );

  await render(
    <CardTips expirationDate="2022/09/13" expireStatusEnum="WILL_EXPIRE" />
  );

  await render(<CardTips expirationDate="2022/09/13" />);
});
