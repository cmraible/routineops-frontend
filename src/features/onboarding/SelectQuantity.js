import React, { useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Add, Subtract } from 'grommet-icons';
import AccountPage from '../../components/AccountPage';


const SelectQuantity = ({ selectQuantity }) => {

    const [quantity, setQuantity] = useState(2);

    const handleSubmit = () => {
        selectQuantity(quantity);
    }

    return (
        <AccountPage title="How many users?">
            <Box gap="medium">
                <Box align="center">
                    <Box direction="row" justify="center" gap="large" align="center">
                        <Button primary data-cy="remove-user" icon={<Subtract size="small" />} onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)} />
                        <Text weight="bold" size="48px">{quantity}</Text>
                        <Button data-cy="add-user" primary icon={<Add size="small" />} onClick={() => setQuantity(quantity+1)} />
                    </Box>
                    <Text>{quantity > 1 ? "users" : "user"}</Text>
                </Box>
                <Box align="center">
                    <Button size="large" primary label="Continue" onClick={handleSubmit} />
                </Box>
            </Box>

        </AccountPage>
    )
}

export default SelectQuantity;