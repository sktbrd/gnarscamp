
import NFTTransferTransaction from "./Transactions/NFTTransferTransaction";
import TransferTransaction from "./Transactions/TransferTransaction";
import EthTransferTransaction from "./Transactions/EthTransferTransaction";
import { USDC_ADDRESS } from "constants/addresses";
import MintBatchTransaction from "./Transactions/MintBatchTransaction";
import DroposalTransaction from "./Transactions/DroposalTransaction";

export function ProposedTransactions({
  target,
  value,
  calldata,
}: {
  target: string;
  value: BigInt;
  calldata: string;
}) {
  // console.log(value, target, calldata);

  // Determine the type of transaction to render
  if (calldata === "0x") {
    // Render EthTransferTransaction for ETH transfers without calldata
    return <EthTransferTransaction toAddress={target as `0x${string}`} value={value} />;
  } else if (target === USDC_ADDRESS) {
    // Render NFTTransferTransaction for NFT transfers
    return <NFTTransferTransaction target={target} calldata={calldata} />;
  } else if (target === "0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17") {
    return <MintBatchTransaction target={target} calldata={calldata} />;
  }
  else if (target === "0x58c3ccb2dcb9384e5ab9111cd1a5dea916b0f33c") {
    return <DroposalTransaction target={target} calldata={calldata} />;
  }
  else {
    // Render TransferTransaction for other transfers
    return <TransferTransaction target={target} value={Number(value)} calldata={calldata} />;
  }
}

export default ProposedTransactions;
