import React from 'react';
import { Image } from 'grommet';
import { useSelector } from 'react-redux';

const Logo = () => {
    const darkMode = useSelector(state => state.ui.darkMode)
    return (
        <Image src={darkMode ? "/routineops-logo-white.svg" : "/routineops-logo-black.svg"} fit="contain" alt="logo-square"/>
    )
}
export default Logo