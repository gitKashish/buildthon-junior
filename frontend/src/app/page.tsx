"use client"
import React, { useEffect, useState } from 'react'
import { useKalpApi } from '@/hooks/useKalpAPI'

const Home: React.FC = () => {

  const { claim, balanceOf, totalSupply, transferToken, loading } = useKalpApi();
  const [walletAddress, setWalletAddress] = useState("");
  const [receiverWalletAddress, setReceiverWalletAddress] = useState("");
  const [senderWalletAddress, setSenderWalletAddress] = useState("");
  const [transferValue, setTransferValue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalAirdrop, setTotalAirdrop] = useState(0);

  const handleClaim = async () => {
    try {
      const data = await claim(walletAddress);
      await handleTotalSupply();
      console.log('Claim successful:', data);
    } catch (err) {
      console.error('Claim error:', err);
    }
  };

  const handleTransfer = async () => {
    try {
      const data = await transferToken(senderWalletAddress, receiverWalletAddress, transferValue);
      await handleTotalSupply();
      console.log('Transfer successful:', data);
    } catch (err) {
      console.error('Transfer error', err);
    }
  };

  const handleBalanceOf = async () => {
    try {
      const data = await balanceOf(walletAddress);
      setBalance(data.result.result)
      console.log('Balance:', data);
    } catch (err) {
      console.error('BalanceOf error:', err);
    }
  };

  const handleTotalSupply = async () => {
    try {
      const data = await totalSupply();
      setTotalAirdrop(data.result.result)
      console.log('Total Supply:', data);
    } catch (err) {
      console.error('TotalSupply error:', err);
    }
  };

  useEffect(() => {
    handleTotalSupply()
  }, [handleClaim]);

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 font-sans p-4'>

      {/* Header */}
      <div className='text-4xl font-semibold mb-10 text-gray-900'>
        Airdrop Machine
      </div>

      {/* Container for all sections */}
      <div className='w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6'>

        {/* Claim Section */}
        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
          <h2 className='text-xl font-medium text-gray-800 mb-4'>Claim Airdrop</h2>
          <input
            placeholder='Wallet Address'
            type="text"
            className='w-full border border-gray-300 text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4'
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <button
            className='w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-400 transition-all disabled:bg-indigo-300'
            onClick={handleClaim}
            disabled={loading}
          >
            {loading ? "Processing..." : "Claim Tokens"}
          </button>
        </div>

        {/* Transfer Section */}
        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
          <h2 className='text-xl font-medium text-gray-800 mb-4'>Transfer Tokens</h2>
          <input
            placeholder='Sender Address'
            type="text"
            className='w-full border text-black border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3'
            onChange={(e) => setSenderWalletAddress(e.target.value)}
          />
          <input
            placeholder='Receiver Address'
            type="text"
            className='w-full border text-black border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-3'
            onChange={(e) => setReceiverWalletAddress(e.target.value)}
          />
          <input
            placeholder='Amount'
            type="number"
            className='w-full border border-gray-300 text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4'
            onChange={(e) => setTransferValue(e.target.valueAsNumber)}
          />
          <button
            className='w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-400 transition-all disabled:bg-indigo-300'
            onClick={handleTransfer}
            disabled={loading}
          >
            {loading ? "Processing..." : "Transfer Tokens"}
          </button>
        </div>

        {/* Total Airdrop */}
        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
          <h3 className='text-xl font-medium text-gray-800 mb-4'>Total Airdrop Claimed</h3>
          <p className='text-5xl text-indigo-500 font-bold'>{totalAirdrop}</p>
        </div>

        {/* Wallet Balance */}
        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
          <h3 className='text-xl font-medium text-gray-800 mb-4'>My Balance</h3>
          <input
            placeholder='Wallet Address'
            type="text"
            className='w-full border border-gray-300 text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4'
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <button
            className='w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-400 transition-all'
            onClick={handleBalanceOf}
            disabled={loading}
          >
            {loading ? "Processing..." : "Check Balance"}
          </button>
          <p className='text-4xl text-indigo-500 font-bold mt-4'>{balance}</p>
        </div>

      </div>

    </div>
  )
}

export default Home;
