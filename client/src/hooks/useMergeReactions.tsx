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
  if (reactions === null || !reactions) return null;
  const reactionCounts: Record<string, number> = {};
  const uniqueReactions: ReactionType[] = [];

  reactions.forEach((reaction) => {
    if (!reactionCounts[reaction.reaction]) {
      uniqueReactions.push(reaction);
    }
    reactionCounts[reaction.reaction] =
      (reactionCounts[reaction.reaction] || 0) + 1;
  });

  const topReaction = Object.keys(reactionCounts).reduce((a, b) =>
    reactionCounts[a] > reactionCounts[b] ? a : b,
  );

  return {
    length: reactions.length,
    uniqueReactions,
    topReaction,
    reactions,
  };
}
