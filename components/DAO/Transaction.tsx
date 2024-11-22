import { Address } from "viem";
import { BigNumber } from "ethers";
import useSWR from "swr";
import { ETHER_ACTOR_BASEURL, ETHERSCAN_BASEURL } from "constants/urls";
import Skeleton from "./Transactions/Skeleton";
import NFTTransferTransaction from "./Transactions/NFTTransferTransaction";
import TransferTransaction from "./Transactions/TransferTransaction";
import EthTransferTransaction from "./Transactions/EthTransferTransaction";
import { USDC_ADDRESS } from "constants/addresses";

export function ProposedTransactions({
  target,
  value,
  calldata,
}: {
  target: string;
  value: BigInt | undefined; // Allow undefined for safety
  calldata: string;
}) {

  if (calldata === "0x") {
    // ETH transfers without calldata
    return (
      <EthTransferTransaction
        toAddress={target as `0x${string}`}
        value={value || BigInt(0)} // Ensure value is not undefined
      />
    );
  } else if (target === USDC_ADDRESS) {
    // Handle USDC transactions
    return <TransferTransaction target={target} value={value || BigInt(0)} calldata={calldata} />;
  } else {
    // Handle other transactions
    return <TransferTransaction target={target} value={value || BigInt(0)} calldata={calldata} />;
  }
}

export default ProposedTransactions;
