import { useDAOAddresses, useGetAllProposals } from "@/hooks/fetch";
import useNnsName from "@/hooks/fetch/useEnsName";
import { Proposal } from "@/services/nouns-builder/governor";
import { shortenAddress } from "@/utils/shortenAddress";
import { TOKEN_CONTRACT } from "constants/addresses";
import Image from "next/image";
import { useState } from "react";
import Loading from "../Loading";
import ProposalStatus from "../ProposalStatus";
import UserAvatar from "../UserAvatar";
import Link from "next/link";

const ProposalCards = () => {
    const { data: addresses } = useDAOAddresses({
        tokenContract: TOKEN_CONTRACT || "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17",
    });
    const { data: proposals } = useGetAllProposals({
        governorContract: addresses?.governor || "0x3dd4e53a232b7b715c9ae455f4e732465ed71b4c",
    });
    // Filter out canceled proposals
    const activeProposals = proposals ? proposals.filter(proposal => proposal.status === "Active") : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {proposals
                ? proposals.slice(0, 3).map((proposal, index) => (
                    <ProposalCard key={index} proposal={proposal} />
                ))
                : [...Array(3)].map((_, index) => <ProposalCardLoading key={index} />)}
        </div>
    );
};

function extractFirstImageFromMarkdown(markdown: string) {
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = markdown.match(imageRegex);
    return match ? match[1] : null;
}

interface ProposalCardProps {
    proposal: Proposal;
}

function ProposalCardLoading() {
    return (
        <div className="relative rounded-lg overflow-hidden h-full aspect-video border border-zinc-200">
            <div className={`absolute inset-0 flex justify-center items-center`}>
                <Loading />
            </div>
        </div>
    );
}

function ProposalCard({ proposal }: ProposalCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const thumbnail = extractFirstImageFromMarkdown(proposal.description) || "";
    const proposer = proposal.proposer;
    const { data: nnsName } = useNnsName(proposer); // Updated hook for NNS name resolution

    return (
        <Link
            className="relative rounded-lg overflow-hidden shadow-lg h-full aspect-video"
            href={`/vote/${proposal.proposalId}`}
        >
            {/* Image Container */}
            <div className={`${imageLoaded ? "hidden" : "absolute"} inset-0 flex justify-center items-center`}>
                <Loading />
            </div>
            <Image
                onLoad={() => setImageLoaded(true)}
                className="w-full h-full object-cover"
                src={thumbnail || "/sktloading.gif"}
                alt="proposal thumbnail"
                width={16}
                height={9}
            />

            {/* Overlay Container */}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-4">
                <div className="flex justify-between items-start gap-2 bg-opacity-20 tracking-wide">
                    {/* Title and Status */}
                    <p className="text-lg text-white">{proposal.title}</p>
                </div>
                <div className="flex justify-between items-center">
                    {/* Proposer Information */}
                    <div className="flex items-center">
                        <UserAvatar address={proposal.proposer} className="rounded-full" diameter={32} />
                        <p className="ml-2 text-sm text-white">
                            {nnsName || shortenAddress(proposer)}
                        </p>
                    </div>
                    <ProposalStatus proposal={proposal} />
                </div>
            </div>
        </Link>
    );
}

export default ProposalCards;
