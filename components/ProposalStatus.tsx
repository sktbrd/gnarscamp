import { Proposal } from "@/services/nouns-builder/governor";
import { Fragment } from "react";

export default function ProposalStatus({ proposal }: { proposal: Proposal }) {
  const state = proposal.status;

  switch (state) {
    case "pending":
      return (
        <div className="bg-gray-100 text-gray-700 p-1 px-2 rounded-md w-24 text-center">
          Pending
        </div>
      );
    case "active":
      return (
        <div className="bg-green-100 text-green-700 p-1 px-2 rounded-md w-24 text-center">
          Active
        </div>
      );
    case "canceled":
      return (
        <div className="bg-red-100 text-red-700 p-1 px-2 rounded-md w-24 text-center">
          Canceled
        </div>
      );
    case "defeated":
      return (
        <div className="bg-red-100 text-red-700 p-1 px-2 rounded-md w-24 text-center">
          Defeated
        </div>
      );
    case "succeeded":
      return (
        <div className="bg-green-100 text-green-700 p-1 px-2 rounded-md w-24 text-center">
          Succeeded
        </div>
      );
    case "queued":
      return (
        <div className="bg-blue-100 text-blue-700 p-1 px-2 rounded-md w-24 text-center">
          Queued
        </div>
      );
    case "expired":
      return (
        <div className="bg-gray-100 text-gray-700 p-1 px-2 rounded-md w-24 text-center">
          Expired
        </div>
      );
    case "executed":
      return (
        <div className="bg-purple-100 text-purple-700 p-1 px-2 rounded-md w-24 text-center">
          Executed
        </div>
      );
    case "vetoed":
      return (
        <div className="bg-gray-100 text-gray-700 p-1 px-2 rounded-md w-24 text-center">
          Vetoed
        </div>
      );
      return (
        <div className="bg-gray-100 text-gray-700 p-1 px-2 rounded-md w-24 text-center">
          Vetoed
        </div>
      );
    default:
      return <Fragment />;
  }
}
