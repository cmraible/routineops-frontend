import { Box, CheckBox, Text } from 'grommet';
import React, { useState } from 'react';
import AccountPage from '../../components/AccountPage';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import { selectUserAccount } from '../accounts/accountsSlice';
import { useSelector } from 'react-redux'


const SelectPlan = ({selectFreePlan, selectTeamPlanMonthly, selectTeamPlanYearly}) => {

    const account = useSelector(selectUserAccount);
    const [yearly, setYearly] = useState(false);

    return (
        <AccountPage title="Choose a Plan">
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
                <Box gap="medium">
                    <SubscriptionPlan
                        title="Individual"
                        pad={{horizontal: "medium", vertical: "small"}}
                        subtitle="Track personal tasks and habits"
                        price={0}
                        onClick={selectFreePlan}
                    />
                    {!yearly && (
                        <SubscriptionPlan
                            title="Team"
                            pad={{horizontal: "medium", vertical: "small"}}
                            subtitle="Your team habit tracker"
                            price={9}
                            permonth
                            peruser
                            dataCY="upgrade-team"
                            onClick={selectTeamPlanMonthly}
                            trial={!account.has_ever_had_subscription}
                        />
                    )}
                    {yearly && (
                        <SubscriptionPlan
                            title="Team"
                            pad={{horizontal: "medium", vertical: "small"}}
                            subtitle="Your team habit tracker"
                            price={96}
                            peryear
                            peruser
                            dataCY="upgrade-team"
                            onClick={selectTeamPlanYearly}
                            trial={!account.has_ever_had_subscription}
                        />
                    )}

                </Box>
            </Box>
        </AccountPage>
    )
}

export default SelectPlan;