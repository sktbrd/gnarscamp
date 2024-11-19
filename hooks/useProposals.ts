import { useState, useEffect } from "react";
import { getProposals } from "@/services/nouns-builder/governor";
import { SubGraphProposal } from "@/utils/query";

export const useProposals = (daoAddress: string, first = 50) => {
    const [proposals, setProposals] = useState<SubGraphProposal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProposals = async () => {
            setLoading(true);
            try {
                const data = await getProposals({ daoAddress, first });
                setProposals(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, [daoAddress, first]);

    return { proposals, loading, error };
};
