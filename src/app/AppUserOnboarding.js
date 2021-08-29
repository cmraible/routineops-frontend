import UserOnboarding from '../features/onboarding/UserOnboarding';
import React, { useEffect } from 'react';
import { fetchAccount } from '../features/accounts/accountsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const AppUserOnboarding = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(() => {
        const fetch = async () => {
            await dispatch(fetchAccount(user.account));
            await dispatch(fetchUsers());
        }
        fetch();
    }, [dispatch, user.account]);

    return (
        <UserOnboarding />
    )
};

export default AppUserOnboarding;