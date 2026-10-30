import { use } from 'react';

import { OnboardingContext } from '.';

export function useOnboarding() {
  const value = use(OnboardingContext);

  if (!value) {
    throw new Error('`useOnboarding` must be used within an `<OnboardingProvider/>`');
  }

  return value;
}
