import React from 'react';
import { Keystatic as GenericKeystatic } from '@keystatic/core/ui';
// eslint-disable-next-line import/no-unresolved
import config from 'virtual:keystatic-config';
// eslint-disable-next-line import/no-unresolved
import basePath from 'virtual:keystatic-basepath';

const effectiveBasePath = basePath || '/dashboard';

const appSlug = {
  envName: 'PUBLIC_KEYSTATIC_GITHUB_APP_SLUG',
  value: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
};

export const Keystatic = function() {
  return React.createElement(GenericKeystatic, {
    config: config,
    appSlug: appSlug,
    basePath: effectiveBasePath
  });
};
