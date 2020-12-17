import React from 'react';
import { useSelector } from 'react-redux';
import AccountBillingFree from './AccountBillingFree';
import AccountBillingPro from './AccountBillingPro';
import { selectUserAccount } from './accountsSlice';

const AccountBilling = () => {
  const account = useSelector(selectUserAccount)

  switch (account.type) {
    case 'Free':
      return (
        <AccountBillingFree />
      )
    case 'Pro':
      return (
        <AccountBillingPro />
      )
    default:
    return (
      'hello'
    )
  }
};

export default AccountBilling;
