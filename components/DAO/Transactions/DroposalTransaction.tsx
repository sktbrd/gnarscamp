import { ethers } from "ethers";
import React from "react";
import DroposalABI from "@/utils/DroposalAbi";
import TransactionCardWrapper from "./TransactionCardWrapper";

type DroposalTransactionProps = {
    target: string;
    calldata: string;
};

const DroposalTransaction = ({ target, calldata }: DroposalTransactionProps) => {

    let decodedData: any = {};
    try {
        if (!calldata || calldata.length <= 10) {
            throw new Error("Invalid calldata provided.");
        }

        // Create an interface instance from the contract ABI
        const contractInterface = new ethers.utils.Interface(DroposalABI);

        // Decode the calldata using the interface
        const decodedCall = contractInterface.parseTransaction({ data: calldata });

        // Extract arguments and function name
        const { args, name } = decodedCall;

        // Parse the description (args[7]) correctly
        const description = args[7];
        const animationURI = args[8];
        const imageURI = args[9];

        // Map arguments to readable data
        decodedData = {
            functionName: name,
            name: args[0],
            symbol: args[1],
            editionSize: args[2].toString(),
            royaltyBPS: args[3].toString(),
            fundsRecipient: args[4],
            defaultAdmin: args[5],
            description: description || "N/A",
            imageURI: formatURI(imageURI),
            animationURI: formatURI(animationURI),
        };

    } catch (error) {
        console.error("Failed to decode DroposalTransaction calldata:", error);
        decodedData = null;
    }

    // Helper function for formatting URIs
    function formatURI(uri: string): string {
        if (typeof uri === "string" && uri.startsWith("ipfs://")) {
            return `https://ipfs.io/ipfs/${uri.slice(7)}`;
        }
        return uri || "N/A";
    }

    // Display error if decoding fails
    if (!decodedData) {
        return (
            <TransactionCardWrapper title="Error">
                <div className="flex flex-col items-center text-center">
                    <div className="object-contain w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white">
                        !
                    </div>
                    <span className="text-red-500 font-medium">
                        Failed to decode transaction. Please verify the calldata.
                    </span>
                </div>
            </TransactionCardWrapper>
        );
    }

    // Render decoded data
    return (
        <TransactionCardWrapper title="Droposal Transaction">
            <div className="video-container mb-4">
                <video
                    src={decodedData.animationURI}
                    className="w-full rounded-md"
                    controls
                />
            </div>
            <div className="transaction-detail mb-2">
                <h4 className="font-bold text-lg mb-2 text-black dark:text-yellow-400">
                    {decodedData.name} ({decodedData.symbol})
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {decodedData.description}
                </p>
            </div>
            <div className="transaction-meta text-sm mt-4">
                <div className="mb-2">
                    <span className="font-semibold text-black dark:text-white">
                        Funds Recipient:
                    </span>{" "}
                    <a
                        href={`https://etherscan.io/address/${decodedData.fundsRecipient}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {decodedData.fundsRecipient.slice(0, 6)}...
                        {decodedData.fundsRecipient.slice(-4)}
                    </a>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-black dark:text-white">
                        Default Admin:
                    </span>{" "}
                    <a
                        href={`https://etherscan.io/address/${decodedData.defaultAdmin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        {decodedData.defaultAdmin.slice(0, 6)}...
                        {decodedData.defaultAdmin.slice(-4)}
                    </a>
                </div>
                <div className="mb-2">
                    <span className="font-semibold text-black dark:text-white">
                        Royalty:
                    </span>{" "}
                    <span className="text-yellow-400 dark:text-yellow-300">
                        {decodedData.royaltyBPS / 100}%
                    </span>
                </div>
            </div>
        </TransactionCardWrapper>
    );
};

export default DroposalTransaction;
