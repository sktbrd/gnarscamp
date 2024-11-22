import { formatUnits } from "viem";
import { BASE_USDC_TOKEN_ADDRESS, BASE_SENDIT_TOKEN_ADDRESS } from "constants/gnarsDao";

const TokenValueRender = ({ address, value }: { address: string; value: bigint }) => {
    if (address === BASE_USDC_TOKEN_ADDRESS.toLocaleLowerCase()) {
        // USDC has 6 decimals
        return (
            <div className="flex items-center gap-1">
                <span>$</span>
                <span>{Number(formatUnits(value, 6)).toLocaleString()}</span>
            </div>
        );
    } else if (address === BASE_SENDIT_TOKEN_ADDRESS) {
        // SENDIT token has 14 decimals
        return (
            <div className="flex items-center gap-1">
                <span>↗</span>
                <span>{Number(formatUnits(value, 14)).toLocaleString()}</span>
            </div>
        );
    }

    // Default fallback for unknown tokens (assuming 18 decimals)
    return (
        <div className="flex items-center gap-1">
            <span>🔹</span>
            <span>{Number(formatUnits(value, 18)).toLocaleString()}</span>
        </div>
    );
};

export default TokenValueRender;
