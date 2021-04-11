import { Box } from 'grommet';
import React from 'react';
import AccountPage from '../../components/AccountPage';
import SubscriptionPlan from '../../components/SubscriptionPlan';



const SelectPlan = ({selectFreePlan, selectTeamPlan}) => {

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
                />
            </Box>

        </AccountPage>
    )
}

export default SelectPlan