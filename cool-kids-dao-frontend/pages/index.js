import { useContext, useEffect, useState } from 'react'
import { ApeDaoContext } from '../context/context'

import styles from '../styles/Home.module.css'
import Login from '../components/Login'
import Header from '../components/Header'
import ProposalCard from '../components/ProposalCard'
import { ToastContainer, toast } from 'react-toastify';

import {BsLinkedin} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsStackOverflow} from 'react-icons/bs';
import {BsTwitter} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs';
import {SiLeetcode} from 'react-icons/si'

export default function Home() {
  const [proposals, setProposals] = useState(null)
  const [proposalInput, setProposalInput] = useState('')
  const [ userBalance , setUserBalance] = useState(0)
  let [i , setI] = useState()
  const [dummyData] = useState([{
    proposer: "0xA35991d95111a4e6172d720eB92B718C2BD04B78",
    votes: [{ type: 0, label: 'Against', count: 30443 },
    { type: 1, label: 'For', count: 43232 },
    { type: 2, label: 'Abstain', count: 3432 }],
    state: 1,
    description: "This is a Dummy proposal!"
  }])

  const {
    getAllProposals,
    isExecutable,
    vote,
    address,
    createProposal,
    token,
    getUserBalance
  } = useContext(ApeDaoContext)

  const getUserData =async(proposalId  , address )=>{
    const res = await vote.hasVoted(proposalId, address);
    return res;
  }

  useEffect(() => {
    getAllProposals()
      .then(proposals => {
        
          setProposals(proposals.reverse())
          
          setI(proposals.length+1)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  return (
    <div className={`${styles.wrapper}`}>
      {address ? (
        <>
          <Header proposals={proposals} />
          <ToastContainer />

          {proposals ? (

<div className='flex items-start justify-center space-x-16 absolute top-28 w-full'>
  <div className='fixed left-0 px-2 text-cyan-200 border-t border-r border-b border-cyan-200 py-2 bg-gray-900 '>
    <div className='fixed bottom-0 left-0'>
        <a href="https://mumbai.polygonscan.com/address/0x894aEe0dDFE7DCD52437677ac6f5748A1b4f779c" target="_blank">
          <img src="https://polygonscan.com/images/svg/brands/poly.png?v=1.3" alt="" className='w-10 invert h-10 ml-2 mb-5' />
        </a>
    </div>
    <div className='fixed bottom-14 left-0'>
        <a href="https://thirdweb.com/mumbai/0xE400913A2311178D5B2Cd1D3966FF90c93CB0749" target="_blank">
          <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/junrqwfvds7vuowcovsv" alt="" className='w-10 invert h-10 ml-2 mb-5 rounded-full' />
        </a>
    </div>
  <div className='flex flex-col space-y-1'>
      <a href="https://github.com/dipenkalsi" target="_blank" rel="noopener noreferrer" className='p-2 rounded-full hover:bg-white/[0.1] transition-all ease-in duration-100'>
          <BsGithub size="25px"/>
        </a>
        <a href="https://www.linkedin.com/in/dipen-kalsi-4448b5205/" className='p-2 rounded-full hover:bg-white/[0.1] transition-all ease-in duration-100' target="_blank" rel="noopener noreferrer">
          <BsLinkedin size="25px"/>
        </a>
        <a href="https://www.instagram.com/_dipen02/" className='p-2 rounded-full hover:bg-white/[0.1] transition-all ease-in duration-100' target="_blank" rel="noopener noreferrer">
          <BsInstagram size="25px"/>
        </a>
        <a href="https://twitter.com/DipenKalsi" className='p-2 rounded-full hover:bg-white/[0.1] transition-all ease-in duration-100' target="_blank" rel="noopener noreferrer">
          <BsTwitter size="25px"/>
        </a>
        <a href="https://stackoverflow.com/users/20255900/dipen-kalsi" className='p-2 rounded-full hover:bg-white/[0.1] transition-all ease-in duration-100' target="_blank" rel="noopener noreferrer">
          <BsStackOverflow size="25px"/>
        </a>
        <a href="https://leetcode.com/kalsidipen/" className='p-2 rounded-full hover:bg-white/[0.1] transition-all ease-in duration-100' target="_blank" rel="noopener noreferrer">
          <SiLeetcode size="25px"/>
        </a>
        </div>
  </div>
  <div>
<div className='flex flex-col space-y-8 border bg-gray-900 px-10 border-cyan-200 py-10 items-center justify-center left-40'>
  <div className='text-cyan-200 text-center border-cyan-200 text-3xl'>Make a Proposal</div>
  <input
    className='bg-transparent w-full py-2 placeholder:text-cyan-00 px-2 border border-cyan-200 focus:outline-none text-cyan-200'
    placeholder=''
    value={proposalInput}
    onChange={e => {
      setProposalInput(e.target.value)
    }}
  />
  <button
    className='border w-1/2  border-cyan-200 font-semibold px-10 py-2 text-base transition-all ease-in duration-100 text-cyan-200 cursor-pointer hover:bg-cyan-200 hover:text-[#211f24]'
    disabled={!proposalInput}
    onClick={() => {
              createProposal(proposalInput)
              setProposalInput('')
            }}
  >
    Submit
  </button>
</div>
<div className='bg-gray-900 border border-cyan-200 my-5 px-5 py-5 w-[370px]'>
  <p className='text-2xl text-center text-cyan-200'>About CoolKids</p>
  <p className='text-center text-sm mt-3 text-cyan-400'>CoolKids DAO is a personal project made by Dipen Kalsi on 4th february, 2023 for learning purposes. The DAO Smart Contract is deployed on the Mumbai testnet of the polygon blockchain and uses <span className='italic'>CoolKids DAO (CKD)</span> as a native currency. The CKD token is an ERC20 Standard token also deployed on the polygon blockchain.</p>
  <p className='text-yellow-300  text-center mt-4 text-lg'>DAO Smart Contract</p>
  
  <a href="https://thirdweb.com/mumbai/0xE400913A2311178D5B2Cd1D3966FF90c93CB0749?utm_source=contract_badge" target="_blank" className='flex items-center justify-center mt-2'>
      <img width="200" height="45" src="https://badges.thirdweb.com/contract?address=0xE400913A2311178D5B2Cd1D3966FF90c93CB0749&theme=dark&chainId=80001" alt="View contract" />
    </a>
  <p className='text-yellow-300  text-center mt-4 text-lg'>Token Smart Contract</p>
  
  <a href="https://thirdweb.com/mumbai/0x894aEe0dDFE7DCD52437677ac6f5748A1b4f779c?utm_source=contract_badge" target="_blank" className='flex items-center justify-center mt-2'>
      <img width="200" height="45" src="https://badges.thirdweb.com/contract?address=0x894aEe0dDFE7DCD52437677ac6f5748A1b4f779c&theme=dark&chainId=80001" alt="View contract" />
    </a>
</div>
<div className='bg-gray-900 border border-cyan-200 my-5 px-5 py-5 w-[370px]'>
  <p className='text-2xl text-center text-cyan-200'>What is a DAO?</p>
  <p className='text-center text-sm mt-3 text-cyan-400'>A decentralized Autonomous Organisation or DAO is a Blockchain based governance body in which users can create proposals and the decisions to those proposals are determined by the process of voting among the DAO members. The result of the voting process is determined by the comparing the sum of the total ownership of the native token of the DAO each voter holds. The votes in the favour of a proposal are the sum of the total ownership of the native token the voters who voted in favour of the proposal hold. So naturally, members who hold more of the native token have more impact on the decision making of the DAO.</p>
</div>
<p className='w-[310px] text-cyan-200 my-3'>Here's a short video explaining the same</p>
<iframe width="370" height="190" src="https://www.youtube.com/embed/tbO-tfZX3sc" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
</div>

<div className=''>
{proposals &&
                    proposals.map (proposal =>{
                    const proposalId = i;   
                    i--;
                    return (
                      <ProposalCard key={Math.random()} proposal={proposal} data={i}/>
                    )
                  })}
</div>
</div>
          ) : (
            <div className='flex h-[100vh] w-full justify-center items-center'>
              <div role="status">
    <svg aria-hidden="true" className="w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-gray-800 fill-cyan-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
            </div>
          )}
        </>
      ) : (
        <Login  />
      )}
    </div>
  )
}