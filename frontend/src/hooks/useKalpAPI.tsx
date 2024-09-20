"use client"
import { useState } from 'react';

export const useKalpApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const callApi = async (endpoint: string, args : { [key: string]: any }) => {
    setError(null);
    const params = {
      network: 'TESTNET',
      blockchain: 'KALP',
      walletAddress: 'b1036fdd6fa97e145dac4b874056aaefdb7da1e3',
      args: args,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setLoading(false);
      return data;
    } catch (err : any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const claim = async (address : string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/DTa39OJe9qpWpUOFsblReuL0uuV5oLHO1726828129533/Claim';
    const args = {
      amount: 100,
      address: address,
    };
    return callApi(endpoint, args);
  };

  const balanceOf = async (account : string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/DTa39OJe9qpWpUOFsblReuL0uuV5oLHO1726828129533/BalanceOf';
    const args = {
      account: account,
    };
    return callApi(endpoint, args);
  };

  const totalSupply = async () => {
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/DTa39OJe9qpWpUOFsblReuL0uuV5oLHO1726828129533/TotalSupply';
    const args = {};
    return callApi(endpoint, args);
  };

  const transferToken = async (from : string, to : string, value : number) => {
    setLoading(true);
    const endpoint = 
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/DTa39OJe9qpWpUOFsblReuL0uuV5oLHO1726828129533/TransferFrom';
    const args = {
      from: from,
      to: to,
      value: value
    };
    return callApi(endpoint, args);
  };

  return { claim, balanceOf, totalSupply, transferToken, loading, error };
};


