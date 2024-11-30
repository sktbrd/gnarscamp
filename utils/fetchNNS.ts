import axios from "axios";

export const fetchNnsName = async (address: string): Promise<string | null> => {
    if (!address) return null;
    try {
        const response = await axios.get(`/api/nns/${address}`); // Replace with actual API endpoint
        return response.data.name || null;
    } catch (error) {
        console.error("Error fetching NNS name:", error);
        return null;
    }
};
