export const NOUNSBUILD_PROPOSALS_QUERY = `
query proposals(
  $where: Proposal_filter,
  $first: Int! = 100,
  $skip: Int = 0
) {
  proposals(
    where: $where
    first: $first
    skip: $skip
    orderBy: timeCreated
    orderDirection: desc
  ) {
    ...Proposal
    votes {
      ...ProposalVote
    }
  }
}

fragment Proposal on Proposal {
  abstainVotes
  againstVotes
  calldatas
  description
  descriptionHash
  executableFrom
  expiresAt
  forVotes
  proposalId
  proposalNumber
  proposalThreshold
  proposer
  quorumVotes
  targets
  timeCreated
  title
  values
  voteEnd
  voteStart
  snapshotBlockNumber
  transactionHash
  dao {
    governorAddress
    tokenAddress
  }
}

fragment ProposalVote on ProposalVote {
  voter
  support
  weight
  reason
}
`;
export const NOUNSBUILD_PROPOSAL_QUERY = `
  query Proposal($where: ProposalWhereInput) {
    proposals(where: $where) {
      proposalId
      title
      proposer
      status
      description
      forVotes
      againstVotes
      abstainVotes
      proposalNumber
      quorumVotes
      expiresAt
      snapshotBlockNumber
      transactionHash
      votes {
        voter
        support
        weight
        reason
      }
    }
  }
`;

export type SubGraphProposal = {
    proposalId: string; // The unique ID of the proposal
    title: string; // The title or name of the proposal
    proposer: string; // Address of the proposer
    status: string; // Status of the proposal (e.g., "Active", "Closed")
    description: string; // The full text description of the proposal
    forVotes: number; // Number of votes in favor
    againstVotes: number; // Number of votes against
    abstainVotes: number; // Number of abstained votes
    proposalNumber: number; // The sequential number of the proposal
    quorumVotes: number; // Minimum number of votes required for quorum
    voteStart: number; // Block number when voting starts
    voteEnd: number; // Block number when voting ends
    expiresAt: number; // Timestamp when the proposal expires
    snapshotBlockNumber: number; // Snapshot block for the proposal
    transactionHash: string; // Transaction hash of the proposal creation
    votes: {
        voter: string; // Address of the voter
        support: number; // Vote support type (e.g., 0 = Against, 1 = For, 2 = Abstain)
        weight: number; // Weight of the vote
        reason: string; // Optional reason for the vote
    }[]; // List of votes
};

export const fetchGraphQLData = async (
    url: string,
    query: string,
    variables: Record<string, any>,
): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors) {
            throw new Error(result.errors[0].message);
        }

        return result.data;
    } catch (error) {
        throw error;
    }
};

