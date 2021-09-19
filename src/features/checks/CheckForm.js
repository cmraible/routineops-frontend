import { Box, FormField, Text, TextInput } from 'grommet';
import React from 'react';

const CheckForm = ({name, number, value}) => {
    return (
    <Box direction="row" align="baseline" fill> 
        <Text>{number}.</Text>
        <FormField name={name} fill>
            <TextInput name={name} value={value} />
        </FormField>
    </Box>)
}

export default CheckForm;