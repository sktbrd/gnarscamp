import { BuilderSDK } from "@buildersdk/sdk";
import DefaultProvider from "@/utils/DefaultProvider";
import { BigNumber } from "ethers";
import { SubGraphProposal } from "@/utils/query";
import { fetchGraphQLData, NOUNSBUILD_PROPOSALS_QUERY } from "@/utils/query";

const { governor } = BuilderSDK.connect({ signerOrProvider: DefaultProvider });

export type Proposal = {
  proposalId: `0x${string}`;
  description: string;
  forVotes: number;
  againstVotes: number;
  abstainVotes: number;
  expiresAt: number | null;
  proposalNumber: number;
  proposer: `0x${string}`;
  quorumVotes: number;
  snapshotBlockNumber: number;
  status: string;
  title: string;
  transactionHash: `0x${string}`;
  voteEnd: number;
  voteStart: number;
};


export type ProposalDetails = {
  proposer: `0x${string}`;
  timeCreated: number;
  againstVotes: number;
  forVotes: number;
  abstainVotes: number;
  voteStart: number;
  voteEnd: number;
  proposalThreshold: number;
  quorumVotes: number;
  executed: boolean;
  canceled: boolean;
  vetoed: boolean;
};

export const getUserVotes = async ({
  address,
  user,
  timestamp,
}: {
  address: string;
  user: `0x${string}`;
  timestamp: number;
}) => {
  return governor({ address }).getVotes(user, BigNumber.from(timestamp));
};

export const getProposalThreshold = async ({
  address,
}: {
  address: string;
}) => {
  return governor({ address }).proposalThreshold();
};

export const getProposalState = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`;
  proposalId: `0x${string}`;
}) => {
  return governor({ address }).state(proposalId);
};

export const getProposalDetails = async ({
  address,
  proposalId,
}: {
  address: `0x${string}`;
  proposalId: `0x${string}`;
}): Promise<ProposalDetails> => {
  const {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  } = await governor({ address }).getProposal(proposalId);

  return {
    proposer,
    timeCreated,
    againstVotes,
    forVotes,
    abstainVotes,
    voteStart,
    voteEnd,
    proposalThreshold,
    quorumVotes,
    executed,
    canceled,
    vetoed,
  };
};

const subgraphUrl =
  "https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/gn";

export const getProposals = async ({
  daoAddress,
  first = 50,
}: {
  daoAddress: string;
  first?: number;
}): Promise<SubGraphProposal[]> => {
  try {
    const data = await fetchGraphQLData(subgraphUrl, NOUNSBUILD_PROPOSALS_QUERY, {
      where: {
        dao: "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
      },
      first,
    });

    if (!data || !data.proposals) {
      throw new Error("Failed to fetch proposals from the subgraph.");
    }

    return data.proposals.map((proposal: any) => ({
      proposalId: proposal.proposalId,
      title: proposal.title,
      proposer: proposal.proposer,
      status: proposal.executableFrom > Date.now() / 1000 ? "Active" : "Closed",
      description: proposal.description,
      forVotes: proposal.forVotes,
      againstVotes: proposal.againstVotes,
      abstainVotes: proposal.abstainVotes,
      proposalNumber: proposal.proposalNumber,
      quorumVotes: proposal.quorumVotes,
      voteStart: proposal.voteStart,
      voteEnd: proposal.voteEnd,
      expiresAt: proposal.expiresAt,
      snapshotBlockNumber: proposal.snapshotBlockNumber,
      transactionHash: proposal.transactionHash,
      votes: proposal.votes.map((vote: any) => ({
        voter: vote.voter,
        support: vote.support,
        weight: vote.weight,
        reason: vote.reason,
      })),
    }));
  } catch (error) {
    console.error("Error fetching proposals from the subgraph:", error);
    throw error;
  }
};