import React from 'react';
import { Box, RadioButtonGroup, Text } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';

const Check = ({ check, index, disabled }) => {
    const number = (index >= 0) ? `${index + 1}. ` : '';

    return (
        <Box align="start" direction="column" gap="medium">
            <Text>{number}{check.prompt}</Text>
            <RadioButtonGroup
                name={check.id}
                disabled={disabled}
                direction="row"
                gap="xsmall"
                options={[
                    {
                      name: 'Yes',
                      value: true,
                      label: 'Yes'
                    },
                    {
                      name: 'No',
                      value: false,
                      label: 'No'
                    }
                ]}
            >
                {(option, { checked, hover }) => {
                    const Icon = option.name === "Yes" ? Checkmark : Close;
                    let background;
                    if (checked && option.name === "Yes") background = "status-ok";
                    else if (checked && option.name === "No") background = "status-critical";
                    else if (hover) background = "light-4";
                    else background = "light-2";
                    return (
                        <Box background={background} gap="small" pad="small" direction="row">
                        <Icon />
                        <Text size="medium">{option.label}</Text>
                        </Box>
                    );
                }}
            </RadioButtonGroup>
        </Box>
    )
}

export default Check;