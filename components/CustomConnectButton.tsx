import { useTheme } from "@/hooks/useTheme";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { fetchNnsName } from "@/utils/fetchNNS";

export type CustomConnectButtonProps = {
  className: string;
};

const CustomConnectButton = ({ className }: CustomConnectButtonProps) => {
  const [theme] = useTheme();
  const [nnsName, setNnsName] = useState<string | null>(null);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Fetch the NNS name dynamically when account changes
        if (account?.address && account.address.startsWith("0x") && !nnsName) {
          fetchNnsName(account.address).then((name) => setNnsName(name));
        }

        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button
                    className={className}
                    onClick={openConnectModal}
                    type="button"
                  >
                    {theme.strings.connectWallet || "Login"}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className={className}
                    onClick={openChainModal}
                    type="button"
                  >
                    {theme.strings.wrongNetwork || "Wrong network"}
                  </button>
                );
              }

              return (
                <button
                  className={className}
                  onClick={openAccountModal}
                  type="button"
                >
                  {nnsName || account.displayName} {/* Show NNS name or fallback */}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
