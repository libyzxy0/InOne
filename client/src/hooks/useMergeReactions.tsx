type ReactionType = {
  reaction: string;
  userID: string;
  fullName: string;
}

type ReturnType = {
  length: number;
  topReaction: string;
  reactions: ReactionType[];
}

export function useMergeReactions(reactions: ReactionType[]): ReturnType {
  const reactionCounts: Record<string, number> = {};

  reactions.forEach(({ reaction }) => {
    reactionCounts[reaction] = (reactionCounts[reaction] || 0) + 1;
  });

  const topReaction = Object.keys(reactionCounts).reduce((a, b) => 
    reactionCounts[a] > reactionCounts[b] ? a : b
  );

  return {
    length: reactions.length,
    uniqueReactions
    topReaction,
    reactions
  }
}