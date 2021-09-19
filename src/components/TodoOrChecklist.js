import { Box, RadioButtonGroup, Text } from 'grommet'
import { Task, FormCheckmark } from 'grommet-icons'
import React from 'react'


const TodoOrChecklist = ({ value, setValue }) => {

    return (
        <RadioButtonGroup
          name="radio"
          direction="row"
          gap="medium"
          options={['Todo', 'Checklist']}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          {(option, { checked, focus, hover }) => {
            const Icon = option === 'Todo' ? FormCheckmark : Task;
            const text = option === 'Todo' ? 'Todo' : 'Checklist';
            let background;
            if (checked) background = 'selected';
            else if (hover) background = 'light-4';
            else if (focus) background = 'light-4';
            else background = 'light-2';
            return (
              <Box pad="small" round="small" direction="row" gap="small" background={background}>
                  <Icon /><Text>{text}</Text>
              </Box>
            );
          }}
        </RadioButtonGroup>
    )
}

export default TodoOrChecklist;