export interface Tweet {
  id: number;
  tweet: string;
  imageUrl?: string;         // opcional si el tweet no tiene imagen
  postedBy: {
    id: number;
    username: string;
  };
  createdAt: string;
  reactions?: {
    [reactionType: string]: number; // ejemplo: { "REACTION_LIKE": 4, "REACTION_HATE": 1 }
  };
  comments?: {
    id: number;
    content: string;
    username: string;
    createdAt: string;
  }[];
}
