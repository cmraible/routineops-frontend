import { Box, RadioButtonGroup, Text, Tip } from 'grommet'
import { Group, User } from 'grommet-icons'
import React from 'react'


const IndividualOrShared = ({ value, setValue }) => {

    return (
        <RadioButtonGroup
          name="radio"
          direction="row"
          gap="medium"
          options={['Individual', 'Shared']}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {(option, { checked, focus, hover }) => {
            const Icon = option === 'Shared' ? Group : User;
            const text = option === 'Shared' ? 'Shared' : 'Individual';
            const tooltip = option === 'Shared' ? 'A shared task only needs to be done once by anyone in the role.' : 'An individual task has to be done by each person in the role.';
            let background;
            if (checked) background = 'selected';
            else if (hover) background = 'light-4';
            else if (focus) background = 'light-4';
            else background = 'light-2';
            return (
                <Tip content={<Text>{tooltip}</Text>}>
                    <Box pad="small" round="small" direction="row" gap="small" background={background}>
                        <Icon /><Text>{text}</Text>
                    </Box>
                </Tip>
            );
          }}
        </RadioButtonGroup>
    )
}

export default IndividualOrShared;