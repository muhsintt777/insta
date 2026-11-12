import { EventBus, MFE_EVENT_NAMES } from '@insta/events';
import { PrimaryButton } from '@insta/ui/buttons';
import { ConstructionIcon } from '@insta/ui/icons';

export const Friends = () => (
  <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
    <div style={{ display: 'grid', justifyItems: 'center', gap: '16px' }}>
      <ConstructionIcon size="32px" />
      <PrimaryButton
        text="Test MFE toast"
        onClick={() =>
          EventBus.emit(MFE_EVENT_NAMES.toast.success, {
            message: 'Toast event received from Friends MFE',
          })
        }
      />
    </div>
  </main>
);

export default Friends;
