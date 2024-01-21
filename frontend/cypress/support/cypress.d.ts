import { MountOptions, MountReturn } from 'cypress/react';

import { EnhancedStore } from '@reduxjs/toolkit';

import { RootState } from './src/StoreState';

declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { reduxStore?: EnhancedStore<RootState> }
      ): Cypress.Chainable<MountReturn>;
    }
  }
}
