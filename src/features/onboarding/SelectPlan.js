import { Box } from 'grommet';
import React from 'react';
import AccountPage from '../../components/AccountPage';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import { selectUserAccount } from '../accounts/accountsSlice';
import { useSelector } from 'react-redux'


const SelectPlan = ({selectFreePlan, selectTeamPlan}) => {

    const account = useSelector(selectUserAccount);

    return (
        <AccountPage title="Choose a Plan">
            <Box gap="medium">
                <SubscriptionPlan
                    title="Individual"
                    pad={{horizontal: "medium", vertical: "small"}}
                    subtitle="Track personal tasks and habits"
                    price={0}
                    onClick={selectFreePlan}
                />
                <SubscriptionPlan
                    title="Team"
                    pad={{horizontal: "medium", vertical: "small"}}
                    subtitle="Your team habit tracker"
                    price={9}
                    permonth
                    peruser
                    dataCY="upgrade-team"
                    onClick={selectTeamPlan}
                    trial={!account.has_ever_had_subscription}
                />
            </Box>
        </AccountPage>
    )
}

export default SelectPlan;