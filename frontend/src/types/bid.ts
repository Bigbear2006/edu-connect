export interface Bid {
  id: string;
  role: string;
  user: {
		id: string
    username: string;
		role: string
  };
}