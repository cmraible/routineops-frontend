import { Box } from 'grommet';
import { Upgrade, Visa, Mastercard, Amex } from 'grommet-icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditDescription from '../../components/EditDescription';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import AccountCreditCard from './AccountCreditCard';
import AccountCancel from './AccountCancel';
import { selectUserAccount } from './accountsSlice';



const AccountBillingPro = () => {

  const account = useSelector(selectUserAccount);

  let ccIcon;
  switch(account.cardbrand) {
    case 'visa':
      ccIcon = <Visa data-cy="visa" color='plain' />
      break;
    case 'mastercard':
      ccIcon = <Mastercard data-cy="mastercard" color='plain' />
      break;
    case 'amex':
      ccIcon = <Amex data-cy="amex" color='plain' />
      break;
    default:
      ccIcon = account.cardbrand[0].toUpperCase() + account.cardbrand.slice(1)
      break;
  }

  const [CC, setCC] = useState(false);
  const [cancel, setCancel] = useState(false);


  return (
    <>
    <Box gap="large" width="large" pad="medium">
      <Box gap="medium">
        <SubscriptionPlan
          title="Pro"
          selected
          subtitle="Extra features for power users"
          price={5}
          permonth
        />
        <SubscriptionPlan
          title="Upgrade to Team"
          subtitle="Pro features for everyone"
          icon={<Upgrade />}
          price={9}
          permonth
          peruser
        />
      </Box>
      <Box gap="large">
        <EditDescription
          size="large"
          title="Credit Card"
          description={
            <Box direction="row" gap="small">
              {ccIcon} {'\u2022\u2022\u2022\u2022 ' + account.cardlast4}
            </Box>
          }
          onClick={() => setCC(true)}
        />
        <EditDescription
          size="large"
          title="Cancel"
          description="Cancel Subscription"
          onClick={() => setCancel(true)} />
      </Box>
    </Box>

    {(CC && <AccountCreditCard close={() => setCC(false)} />)}
    {(cancel && <AccountCancel close={() => setCancel(false)} />)}



      </>
  )
};

export default AccountBillingPro;
