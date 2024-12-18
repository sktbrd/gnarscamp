import { Proposal } from "@/services/nouns-builder/governor";
import React, { Fragment, useState } from "react";
import { useUserVotes } from "@/hooks/fetch/useUserVotes";
import ModalWrapper from "../ModalWrapper";
import VoteModal from "../VoteModal";

export const VoteButton = ({
    proposal,
    proposalNumber,
}: {
    proposal: Proposal;
    proposalNumber: number;
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { data: userVotes } = useUserVotes({
        // TODO: review this should be proposal.timeStamp
        timestamp: proposal.voteStart,
    });

    // if (proposal.state !== 1 || !userVotes || userVotes < 1) return <Fragment />;

    return (
        <Fragment>
            <ModalWrapper
                className="w-full max-w-lg bg-skin-muted"
                open={modalOpen}
                setOpen={setModalOpen}
            >
                <VoteModal
                    proposal={proposal}
                    proposalNumber={proposalNumber}
                    setOpen={setModalOpen}
                />
            </ModalWrapper>
            <button
                className="bg-skin-button-accent text-skin-inverted rounded-xl px-4 py-3 font-semibold w-full sm:w-auto mt-8 sm:mt-0 border border-black min-w-36"
                onClick={() => setModalOpen(true)}
            >
                Submit vote
            </button>
        </Fragment>
    );
};

export default VoteButton;