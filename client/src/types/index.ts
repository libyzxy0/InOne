export type ReactionType = {
  reaction: string;
  userID: string;
  fullName: string;
}

export type Message = {
  id: string;
  message: string | null;
  attachmentUrl: string | null;
  reactions: ReactionType[];
  user_id: string;
  created_at: string;
};

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: 'online' | 'offline';
  email_verified: boolean;
  authProvider: 'email' | 'google';
  created_at: string;
};
