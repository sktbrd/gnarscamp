import { Address } from "viem";
import { shortenAddress } from "@/utils/shortenAddress";
import Link from "next/link";
import Image from "next/image";
import TransactionCardWrapper from "./TransactionCardWrapper";
import { AbiCoder } from "ethers/lib/utils.js";

const MintBatchTransaction = ({
    target,
    calldata,
}: {
    target: string;
    calldata: string;
}) => {
    console.log("MintBatchTransaction calldata:", calldata);

    let decodedData;
    let amount: string | undefined;
    let recipient: Address | undefined;

    try {
        const abiCoder = new AbiCoder();
        // Ensure calldata excludes the first 4 bytes (method selector)
        const dataToDecode = calldata.startsWith("0x")
            ? calldata.slice(10) // Remove selector and keep the rest
            : calldata;

        // Decode calldata (adjust types as per your contract ABI)
        decodedData = abiCoder.decode(["uint256", "address"], `0x${dataToDecode}`);
        console.log("Decoded Data:", decodedData);

        amount = decodedData[0]?.toString(); // Ensure amount is a string
        recipient = decodedData[1] as Address;
    } catch (error) {
        console.error("Error decoding calldata:", error);
    }

    return (
        <TransactionCardWrapper title="Create Gnar">
            <div className="flex justify-center items-center gap-2 mb-2">
                <Image
                    className="object-contain"
                    width={64}
                    height={64}
                    src="/loading.gif"
                    alt="Gnar logo"
                />
            </div>
            <div className="transaction-detail">
                <span className="font-semibold mr-2">Amount:</span>
                <span>{amount || "N/A"}</span>
            </div>
            <div className="transaction-detail">
                <span className="font-semibold mr-2">For: </span>
                {recipient ? (
                    <Link href={`/address/${recipient}`} passHref>
                        {shortenAddress(recipient)}
                    </Link>
                ) : (
                    <span className="text-gray-500">Address not available</span>
                )}
            </div>
        </TransactionCardWrapper>
    );
};

export default MintBatchTransaction;
