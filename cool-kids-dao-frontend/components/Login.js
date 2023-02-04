import React, { useContext } from 'react'
import styles from '../styles/Login.module.css'
import { ApeDaoContext } from '../context/context'
import Image from 'next/image'
import logo from '../assets/logo.jpg'
import {BsLinkedin} from 'react-icons/bs';
import {BsInstagram} from 'react-icons/bs';
import {BsStackOverflow} from 'react-icons/bs';
import {BsTwitter} from 'react-icons/bs';
import {BsGithub} from 'react-icons/bs';
import {SiLeetcode} from 'react-icons/si'
import { ConnectWallet } from '@thirdweb-dev/react'

const Login = () => {
  const { connectWithMetamask , address } = useContext(ApeDaoContext)
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.title} text-cyan-200 flex flex-col`}>
        <Image
          className='rounded-full'
          height={80}
          width={80}
          src={
            logo
          }
          />
          <p className='font-thin'>CoolKids DAO </p>
      </div>
      <ConnectWallet accentColor='#00FFFF' colorMode='dark'/>
      <div className='fixed bottom-0 w-full flex  space-y-5 text-xs flex-col text-cyan-200 px-5 py-2 items-center justify-center'>
        <p>Copyright &copy; Dipen Kalsi, 2023. All rights reserved.</p>
        <div className='flex space-x-1'>
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
    </div>
  )
}

export default Login
