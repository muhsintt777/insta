import { EventBus, MFE_EVENT_NAMES } from '@insta/events';
import { PrimaryButton } from '@insta/ui/buttons';
import { ConstructionIcon } from '@insta/ui/icons';

export const Friends = () => (
  <div
    style={{
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
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
);

export default Friends;
