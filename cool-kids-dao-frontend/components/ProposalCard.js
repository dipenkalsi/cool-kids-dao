import { useContext, useEffect, useMemo, useState } from 'react'
import styles from '../styles/ProposalCard.module.css'
import { ethers } from 'ethers'
import { FaUserTie } from 'react-icons/fa'
import { AiOutlineNumber } from 'react-icons/ai'

import { ApeDaoContext } from '../context/context'
import truncateEthAddress from 'truncate-eth-address'

const ProposalCard = ({ proposal , data }) => {
  var converter = require('hex2dec');
  const { address, voteFor, executeProposal ,checkIfVoted } = useContext(ApeDaoContext)
  const [statusText, setStatusText] = useState('')
  const [statusColor, setStatusColor] = useState('cyan-200')

  const setStatus = () => {
    switch (proposal.state) {
      case 0:
        setStatusText('Pending')
        setStatusColor('#48494a')
      case 1:
        setStatusText('Active')
        setStatusColor('#21b66f')
        break
      case 3:
        setStatusText('Defeated')
        setStatusColor('#f44336')
        break
      case 7:
        setStatusText('Executed')
        setStatusColor('#0011ff')
        break
      case 4:
        setStatusText('Successful')
        setStatusColor('#21b66f')
        break
      default:
        setStatusText('Unknown')
        setStatusColor('#fff')
    }
  }

  useMemo(() => {
    setStatus()
  }, [statusText, statusColor, proposal.state])
  return (
    <div className='flex items-start justify-start w-[600px]'>
    <div className={`border p-10 mb-5 bg-gray-900`} style={{ borderColor: statusColor }}>
      <div className={styles.top}>
        <div className=''>
          <div className='flex items-center justify-start space-x-8'>
          <div className='text-cyan-200 mb-5 flex justify-start items-center  space-x-3'>
            <FaUserTie size={30}/>
             <p className='text-xl'>{truncateEthAddress(proposal.proposer)}</p>
          </div>
          <div className='text-cyan-200 mb-5 flex justify-start items-center  space-x-1'>
            <AiOutlineNumber size={30}/>
             <p className='text-3xl'>{data}</p>
          </div>
          </div>
          <div className='text-2xl text-cyan-500 mb-3'>{proposal.description}</div>
        </div>
        <div className='h-9 px-6 py-1.5 rounded-full' style={{ backgroundColor: statusColor }}>
          {statusText}
        </div>
      </div>
      {proposal.votes.map(vote => {
        return (
          <div key={Math.random()}>
            <button
              className={`border pl-4 font-mono ${vote.label == "Against" ? "text-red-600" : vote.label == "For" ? "text-green-600" : "text-yellow-300"  } ${vote.label == "Against" ? "border-red-600" : vote.label == "For" ? "border-green-600" : "border-yellow-300"  } w-full text-start pl-2 py-2 my-2 transition-all ease-in duration-100 font-semibold ${vote.label == "Against" ? "hover:bg-red-600" : vote.label == "For" ? "hover:bg-green-600" : "hover:bg-yellow-300"  } hover:text-[#2d2d2d]`}
              key={Math.random()}
              onClick={() => {
                voteFor(proposal.proposalId, vote.label, '')
              }}
            >
              {vote.label}
            </button>
          </div>
        )
      })}
      <div className={styles.bottom}>
        <div className={styles.results}>
          {proposal.votes.map(vote => {
            const voteCount = ethers.utils.formatEther(vote.count)

            return (
              <div key={Math.random()}>
                <div>
                  {vote.label}: {Math.trunc(voteCount)} CKD
                </div>
              </div>
            )
          })}
        </div>
        {
          proposal.state === 4 && (
            <button
              className='border w-1/2 mx-auto font-mono border-blue-500 text-blue-500 py-2 hover:bg-blue-500 font-semibold text-lg hover:text-[#2d2d2d] transition-all ease-in duration-100'
              onClick={() => {
                executeProposal(proposal.proposalId)
              }}
            >
              Execute
            </button>
          )}
      </div>
    </div>
    </div>
  )
}

export default ProposalCard
