import { Box } from 'grommet';
import { Connect, ContactInfo, CreditCard, SettingsOption, Group } from 'grommet-icons';
import React from 'react';
import Tab from './Tab';
import { selectUserAccount } from '../features/accounts/accountsSlice';
import { useSelector } from 'react-redux';


const DefaultTabs = () => {

    const pathname = window.location.pathname
    const account = useSelector(selectUserAccount)

    const individualTabs = [
        {icon: <ContactInfo />, title: 'My Profile', href: '/account/profile', active: (pathname === '/account/profile' || pathname === '/account')},
        {icon: <CreditCard />, title: 'Billing', href: '/account/billing', active: (pathname.startsWith('/account/billing'))},
        {icon: <Connect />, title: 'Connections', href: '/account/connections', active: (pathname === '/account/connections')},
        {icon: <SettingsOption />, title: 'Settings', href: '/account/settings', active: (pathname === '/account/settings')},
    ]

    const teamTabs = [
        {icon: <ContactInfo />, title: 'My Profile', href: '/account/profile', active: (pathname === '/account/profile' || pathname === '/account')},
        {icon: <Group />, title: 'Users', href: '/account/users', active: (pathname.startsWith('/account/users'))},
        {icon: <CreditCard />, title: 'Billing', href: '/account/billing', active: (pathname.startsWith('/account/billing'))},
        {icon: <Connect />, title: 'Connections', href: '/account/connections', active: (pathname === '/account/connections')},
        {icon: <SettingsOption />, title: 'Settings', href: '/account/settings', active: (pathname === '/account/settings')},
    ]

    const tabs = account.type === 'Free' ? individualTabs : teamTabs;

    return (
        <Box
            border={{"side": "bottom", "size": "xsmall", "color": "border"}}
            background="background-contrast"
            overflow={{"horizontal": "auto"}}
            direction="row"
            gap="large"
            pad={{horizontal: "small", top: "xsmall"}}
            data-cy="account-tabs"
        >
            {(tabs.map((tab) => (
                    <Tab key={tab.title} {...tab} />
            )))}
        </Box>

    )
}

export default DefaultTabs;