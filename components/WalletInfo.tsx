import { Fragment } from "react";
import { useTheme } from "@/hooks/useTheme";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { getAddress } from "viem";
import useNnsName from "@/hooks/fetch/useEnsName";
import UserAvatar from "./UserAvatar";

export const WalletInfo = ({ address }: { address?: `0x${string}` }) => {
  const { data: nnsName } = useNnsName(address); // Use the correct NNS hook
  const [theme] = useTheme();

  if (!address) return <Fragment />;

  const name = nnsName || shortenAddress(address ? getAddress(address) : ethers.constants.AddressZero, 4);

  return (
    <div className="flex items-center">
      <div className="flex items-center mt-2">
        <UserAvatar className="h-6 rounded-full mr-2" address={address} />
        <div className="text-skin-base">{name}</div>
      </div>
    </div>
  );
};
