import { createContext } from 'react'
import {
  useAddress,
  useMetamask,
  useDisconnect,
  useContract,
} from '@thirdweb-dev/react'
import { VoteType } from '@thirdweb-dev/sdk'
import { ethers } from 'ethers'

import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("mumbai");

export const ApeDaoContext = createContext()
export const ApeDaoProvider = ({ children }) => {
  const address = useAddress()
  const connectWithMetamask = useMetamask()
  const disconnectWallet = useDisconnect()
  const vote = useContract('0xE400913A2311178D5B2Cd1D3966FF90c93CB0749', 'vote').contract
  const token = useContract('0x894aEe0dDFE7DCD52437677ac6f5748A1b4f779c','token').contract

  const getAllProposals = async () => {
    const contract = await sdk.getContract("0xE400913A2311178D5B2Cd1D3966FF90c93CB0749", "vote");
    const proposals = await contract.getAll();
    return proposals
  }
  const isExecutable = async id => {
    const canExecute = await vote.canExecute(id)
    return canExecute
  }
  const checkIfVoted = async id => {
    const res = await vote.hasVoted(id, address)
    return res
  }
  const getUserBalance = async () =>{  
    const balance = await token.balance();
    return balance
  }
  const createProposal = async description => {
    const proposal = await vote.propose(description)
  }


  const executeProposal = async id => {
    const canExecute = await isExecutable(id)
    if (canExecute) {
      const res = await vote.execute(id)
      console.log(res)
    } else {
      console.log('Can not execute')
    }
  }

  const voteFor = async (id, type, reason) => {
    try {
      const delegation = await token.getDelegationOf(address)
      if (delegation === ethers.constants.AddressZero) {
        await token.delegateTo(address)
      }
      let voteType
      if (type === 'Against') {
        voteType = VoteType.Against
      } else if (type === 'For') {
        voteType = VoteType.For
      } else {
        voteType = VoteType.Abstain
      }
      const res = await checkIfVoted(id)
      if (!res) {
        await vote.vote(id, voteType, reason)
      } else {
        console.log('You have already voted for this proposal')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <ApeDaoContext.Provider
      value={{
        getAllProposals,
        isExecutable,
        voteFor,
        vote,
        createProposal,
        address,
        connectWithMetamask,
        disconnectWallet,
        executeProposal,
        checkIfVoted,
        getUserBalance,
        token
      }}
    >
      {children}
    </ApeDaoContext.Provider>
  )
}
