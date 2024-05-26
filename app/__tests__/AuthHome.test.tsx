import 'react-native';
import React from 'react';

import {beforeEach, describe, it, jest} from '@jest/globals';
import renderer from 'react-test-renderer';

import AuthHome from '../src/pages/Auth/AuthHome.tsx';

describe('', () => {
  let props: any;

  const createTestProps = (props: Object) => ({
    navigation: {
      navigate: jest.fn(),
    },
    ...props,
  });

  beforeEach(() => {
    props = createTestProps({});
  });

  it('renders correctly', () => {
    renderer.create(<AuthHome {...props} />);
  });
});
