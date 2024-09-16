type ReactionType = {
  reaction: string;
  userID: string;
  fullName: string;
};

type ReturnType = {
  length: number;
  topReaction: string;
  uniqueReactions: ReactionType[];
  reactions: ReactionType[];
} | null;

export function useMergeReactions(reactions: ReactionType[]): ReturnType {
  if (!reactions || reactions.length === 0) return null;

  const latestReactions = new Map<string, ReactionType>();

  reactions.forEach((reaction) => {
    latestReactions.set(reaction.userID, reaction); 
  });

  const uniqueReactions = Array.from(latestReactions.values());

  const reactionCounts: Record<string, number> = {};

  uniqueReactions.forEach((reaction) => {
    reactionCounts[reaction.reaction] = (reactionCounts[reaction.reaction] || 0) + 1;
  });

  const topReaction = Object.keys(reactionCounts).reduce((a, b) =>
    reactionCounts[a] > reactionCounts[b] ? a : b,
  );

  const filteredUniqueReactions = uniqueReactions.filter(
    (reaction, index, self) =>
      reaction.reaction === topReaction
        ? self.findIndex(r => r.reaction === reaction.reaction) === index
        : true
  );

  return {
    length: uniqueReactions.length,
    uniqueReactions: filteredUniqueReactions,
    topReaction,
    reactions, 
  };
}
