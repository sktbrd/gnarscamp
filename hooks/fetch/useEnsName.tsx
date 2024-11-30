import useSWR from "swr";
import { Address } from "viem";

// Define the fetcher function
async function fetchNnsName(address: Address): Promise<string | null> {
    const response = await fetch("https://api.nns.xyz/resolve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address,
            fallback: true, // Ensure a default CLD is used if no lookup is found
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to resolve NNS name");
    }

    const { name } = await response.json();
    return name || null;
}

// SWR hook
export default function useNnsName(address?: Address) {
    const fetcher = () => (address ? fetchNnsName(address) : Promise.resolve(null));
    return useSWR<string | null>(address ? `/nns/name/${address}` : null, fetcher);
}
