import React from 'react';
import { useSelector } from 'react-redux';
import AccountBillingFree from './AccountBillingFree';
import AccountBillingTeam from './AccountBillingTeam';
import { selectUserAccount } from './accountsSlice';


const AccountBillingCurrent = () => {
  const account = useSelector(selectUserAccount)

  switch (account.type) {
    case 'Free':
      return (
        <AccountBillingFree />
      )
    case 'Team':
      return (
        <AccountBillingTeam />
      )
    default:
      return (
        <AccountBillingFree />
      )
  }
};

export default AccountBillingCurrent;
