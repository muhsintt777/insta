import type { MfeEventContracts } from '@insta/contracts';
import { createEventBus } from '@insta/utils';

export const EventBus = createEventBus<MfeEventContracts>();
