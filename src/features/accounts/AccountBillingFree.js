import { Box, CheckBox, Text } from 'grommet';
import { Upgrade } from 'grommet-icons';
import React, { useState } from 'react';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAccount } from './accountsSlice';

const AccountBillingFree = () => {

  const account = useSelector(selectUserAccount);
  const dispatch = useDispatch();
  const [yearly, setYearly] = useState(false);


  return (
    <Box pad="medium" gap="medium" width="large">
      <Box gap="medium">
        <Box direction="row" gap="medium" justify="center">
            <Text>Monthly</Text>
            <CheckBox
                checked={yearly}
                onChange={event => setYearly(event.target.checked)}
                toggle
            />
            <Text>Yearly</Text>
        </Box>
        <SubscriptionPlan
          title="Free"
          subtitle="Track personal tasks and habits"
          price={0}
          selected
        />
        { !yearly && (
          <SubscriptionPlan
            title="Upgrade to Team"
            subtitle="Pro features for everyone"
            icon={<Upgrade />}
            price={9}
            permonth
            peruser
            dataCY="upgrade-team"
            onClick={() => dispatch(push(`/account/billing/upgradeTeam/${process.env.REACT_APP_TEAM_PRICE_MONTHLY}`))}
            trial={!account.has_ever_had_subscription}
          />
        )}

        { yearly && (
          <SubscriptionPlan
            title="Upgrade to Team"
            subtitle="Pro features for everyone"
            icon={<Upgrade />}
            price={96}
            peryear
            peruser
            dataCY="upgrade-team"
            onClick={() => dispatch(push(`/account/billing/upgradeTeam/${process.env.REACT_APP_TEAM_PRICE_YEARLY}`))}
            trial={!account.has_ever_had_subscription}
          />
        )}

      </Box>
    </Box>
  )
};

export default AccountBillingFree;
