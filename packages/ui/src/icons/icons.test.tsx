import { describe, expect, it } from 'vitest';
import { render } from 'test';
import { ConstructionIcon as RootConstructionIcon } from '../index';
import {
  AddImageIcon,
  BackIcon,
  ChatIcon,
  CloseIcon,
  CommentIcon,
  ConstructionIcon,
  EditIcon,
  FriendsIcon,
  HomeIcon,
  LikeIcon,
  LikedIcon,
  NotificationsIcon,
  VerticalDotIcon,
} from './index';

const icons = [
  { name: 'AddImageIcon', component: AddImageIcon },
  { name: 'BackIcon', component: BackIcon },
  { name: 'ChatIcon', component: ChatIcon },
  { name: 'CloseIcon', component: CloseIcon },
  { name: 'CommentIcon', component: CommentIcon },
  { name: 'ConstructionIcon', component: ConstructionIcon },
  { name: 'EditIcon', component: EditIcon },
  { name: 'FriendsIcon', component: FriendsIcon },
  { name: 'HomeIcon', component: HomeIcon },
  { name: 'LikeIcon', component: LikeIcon },
  { name: 'LikedIcon', component: LikedIcon },
  { name: 'NotificationsIcon', component: NotificationsIcon },
  { name: 'VerticalDotIcon', component: VerticalDotIcon },
];

describe('UI icons', () => {
  it('exports ConstructionIcon from the package root', () => {
    const { container } = render(<RootConstructionIcon />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it.each(icons)(
    '$name renders with configurable size and color',
    ({ component }) => {
      const color = '#123abc';
      const Icon = component;
      const { container } = render(<Icon color={color} size="32px" />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '32px');
      expect(svg).toHaveAttribute('height', '32px');
      expect([
        svg?.getAttribute('fill'),
        svg?.getAttribute('stroke'),
      ]).toContain(color);
    },
  );
});
