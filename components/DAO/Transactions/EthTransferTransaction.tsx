import { ethers, BigNumber } from "ethers";
import FormatedTransactionValue from "./FormatedTransactionValue";
import TransactionCardWrapper from "./TransactionCardWrapper";

const EthTransferTransaction = ({
    toAddress,
    value,
}: {
    toAddress: `0x${string}`;
    value: BigInt | { hex: string } | undefined; // Support BigInt and hex
}) => {
    // Parse the `value` safely
    let bigNumberValue: BigNumber;

    try {
        if (value === undefined) {
            throw new Error("Value is undefined");
        }
        // Check if value is already a BigNumber or BigInt
        if (BigNumber.isBigNumber(value)) {
            bigNumberValue = value;
        } else if (typeof value === "bigint") {
            bigNumberValue = BigNumber.from(value.toString()); // Convert BigInt to BigNumber
        } else if (typeof value === "object" && "hex" in value) {
            bigNumberValue = BigNumber.from(value.hex); // Use hex representation
        } else {
            throw new Error("Value is not a valid BigNumber, BigInt, or hex object");
        }

        console.log("Parsed BigNumber Value:", bigNumberValue.toString());
    } catch (error) {
        console.error("Error parsing value:", error);
        bigNumberValue = BigNumber.from(0); // Default to 0 on error
    }

    return (
        <TransactionCardWrapper title="Ethereum Transfer">
            <div className="transaction-detail flex flex-col space-y-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">Value:</span>
                    <span className="text-lg font-bold text-blue-600">
                        {`${ethers.utils.formatEther(bigNumberValue)} ETH`}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-600">To:</span>
                    <FormatedTransactionValue address={toAddress} />
                </div>
            </div>
        </TransactionCardWrapper>
    );
};

export default EthTransferTransaction;
