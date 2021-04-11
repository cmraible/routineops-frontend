import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAccount, updateAccount } from '../features/accounts/accountsSlice';
import ConfirmSubscription from '../features/onboarding/ConfirmSubscription';
import SelectPlan from '../features/onboarding/SelectPlan';
import SelectQuantity from '../features/onboarding/SelectQuantity';

const AppOnboarding = () => {

    const dispatch = useDispatch();
    const account = useSelector(selectUserAccount);

    const [plan, setPlan] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const selectFreePlan = async () => {
        setPlan('Free');
        const resultAction = await dispatch(updateAccount({
            ...account,
            onboard_complete: DateTime.local().toISO()
        }))
        if (!updateAccount.fulfilled.match(resultAction)) {
            // somethings fucked, display an error

        }
    }

    const selectTeamPlan = () => {
        setPlan('Team');
    }


    let content
    if (!plan) {
        content = <SelectPlan selectFreePlan={selectFreePlan} selectTeamPlan={selectTeamPlan} />
    } else if (plan === 'Free') {
        content = null
    } else if (plan === 'Team') {
        // Let user choose number of users
        if (!quantity) {
            content = <SelectQuantity selectQuantity={(quantity) => setQuantity(quantity)} />
        } else {
            content = <ConfirmSubscription quantity={quantity} />
        }
    }

    return content
};

export default AppOnboarding;