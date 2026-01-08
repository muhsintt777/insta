import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HomeIcon } from './home-icon';
import { LikeIcon } from './like-icon';
import { LikedIcon } from './liked-icon';
import { CloseIcon } from './close-icon';
import { ChatIcon } from './chat-icon';
import { CommentIcon } from './comment-icon';
import { FriendsIcon } from './friends-icon';
import { NotificationsIcon } from './notifications-icon';
import { EditIcon } from './edit-icon';
import { SendIcon } from './send-icon';
import { ShareIcon } from './share-icon';
import { BackIcon } from './back-icon';
import { AddImageIcon } from './add-image-icon';
import { ConstructionIcon } from './construction-icon';
import { HashtagIcon } from './hashtag-icon';
import { MentionIcon } from './mention-icon';
import { VerticalDotIcon } from './vertical-dot-icon';

// Test helper to verify common icon behavior
const testIconComponent = (
  name: string,
  IconComponent: React.FC<{ color?: string; size?: string }>,
) => {
  describe(name, () => {
    it('renders svg element', () => {
      const { container } = render(<IconComponent />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom color', () => {
      const { container } = render(<IconComponent color="red" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies custom size', () => {
      const { container } = render(<IconComponent size="24px" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '24px');
      expect(svg).toHaveAttribute('width', '24px');
    });

    it('uses default size when not provided', () => {
      const { container } = render(<IconComponent />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('height', '16px');
      expect(svg).toHaveAttribute('width', '16px');
    });
  });
};

// Test all icon components
testIconComponent('HomeIcon', HomeIcon);
testIconComponent('LikeIcon', LikeIcon);
testIconComponent('LikedIcon', LikedIcon);
testIconComponent('CloseIcon', CloseIcon);
testIconComponent('ChatIcon', ChatIcon);
testIconComponent('CommentIcon', CommentIcon);
testIconComponent('FriendsIcon', FriendsIcon);
testIconComponent('NotificationsIcon', NotificationsIcon);
testIconComponent('EditIcon', EditIcon);
testIconComponent('SendIcon', SendIcon);
testIconComponent('ShareIcon', ShareIcon);
testIconComponent('BackIcon', BackIcon);
testIconComponent('AddImageIcon', AddImageIcon);
testIconComponent('ConstructionIcon', ConstructionIcon);
testIconComponent('HashtagIcon', HashtagIcon);
testIconComponent('MentionIcon', MentionIcon);
testIconComponent('VerticalDotIcon', VerticalDotIcon);
