export interface IPropsChildren {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  desc: string;
  tel: string;
  avatar: string;
  refetchHandler?: () => void;
}
