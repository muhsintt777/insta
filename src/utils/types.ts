export interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IconsProps {
  color?: string;
  size?: string;
}
