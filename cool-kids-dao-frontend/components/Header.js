import React, { useContext } from 'react'
import styles from '../styles/Header.module.css'
import { ApeDaoContext } from '../context/context'
import Image from 'next/image'
import logo from '../assets/logo.jpg'
import { ConnectWallet } from '@thirdweb-dev/react'
const Header = ({ proposals }) => {
    const { disconnectWallet , address } = useContext(ApeDaoContext)
    if (proposals) {
        return (
            <div className={`${styles.wrapper} bg-gray-900`}>
                
                <div className={styles.header}>
                    <Image
                
                        className='rounded-full'
                        height={50}
                        width={50}
                        src={
                            logo
                        }
                    />
                    <p>CoolKids DAO&trade;</p>
                </div>
                <ConnectWallet accentColor='#00EEEE' colorMode='dark'/>
            </div> 
        )
    } else {
        return (
            <div className={styles.wrapper}>
                
                <div className={styles.header}>
                    <Image
                
                        className='rounded-full'
                        height={40}
                        width={40}
                        src={
                            logo
                        }
                    />
                <p className=''>CoolKids DAO</p>
                </div>
                <button className='text-cyan-200 border border-cyan-200 px-5 py-2 font-mono hover:bg-cyan-200 transition-all ease-in duration-100 hover:text-[#211f24]' onClick={disconnectWallet}>
                    {address.slice(0,7)}...{address.slice(35)}
                </button>
            </div>
        )
    }
}

export default Header