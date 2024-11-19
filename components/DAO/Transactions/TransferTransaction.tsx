import { BigNumber, ethers } from "ethers";
import { AbiCoder, hexDataSlice, isHexString } from "ethers/lib/utils.js";
import { Address } from "viem";
import FormatedTransactionValue from "./FormatedTransactionValue";
import TokenDataRender from "./TokenDataRender";
import TokenValueRender from "./TokenValueRender";
import TransactionCardWrapper from "./TransactionCardWrapper";

export function TransferTransaction({
    target,
    value,
    calldata,
}: {
    target: string;
    value: number;
    calldata: string;
}) {
    const abiCoder = new AbiCoder();

    // Validate calldata before decoding
    let toAddress: Address | null = null;
    let transferValue: bigint | null = null;

    if (isHexString(calldata) && calldata.length >= 10) {
        try {
            const decodedData = abiCoder.decode(["address", "uint256"], hexDataSlice(calldata, 4));
            toAddress = decodedData[0] as Address;
            transferValue = BigInt(decodedData[1]);
        } catch (error) {
            console.error("Error decoding calldata:", error);
        }
    } else {
        console.warn("Invalid calldata provided:", calldata);
    }

    return (
        <TransactionCardWrapper title="Transfer">
            <div className="transaction-detail">
                <span className="font-semibold">Token:</span>
                <TokenDataRender address={target} />
            </div>
            <div className="transaction-detail">
                <span className="font-semibold">Value:</span>
                {calldata && transferValue !== null ? (
                    <TokenValueRender address={target} value={transferValue} />
                ) : (
                    value && (
                        <span>
                            {`${ethers.utils.formatEther(
                                // Convert value to string before passing to BigNumber
                                BigNumber.from(value.toString())
                            )} ETH`}
                        </span>
                    )
                )}
            </div>
            <div className="transaction-detail">
                <span className="font-semibold">To:</span>
                {toAddress ? (
                    <FormatedTransactionValue address={toAddress} />
                ) : (
                    <span className="text-gray-500">Address not available</span>
                )}
            </div>
        </TransactionCardWrapper>
    );
}

export default TransferTransaction;
