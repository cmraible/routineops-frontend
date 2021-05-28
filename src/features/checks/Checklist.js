import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Form, List } from 'grommet';
import Check from './Check';
import { completeTask } from '../tasks/tasksSlice';

const Checklist = ({ checks, task, onComplete }) => {

    const dispatch = useDispatch();

    const [value, setValue] = useState();

    const disabled = (task.completed) ? true : false

    const handleSubmit = ({ value }) => {
        const results = Object.keys(value).map((id) => {
            return {
                check: id,
                result: value[id]
            }
        })
        dispatch(completeTask([task, results]));
        onComplete();
    }

    return (
        <Form
            onSubmit={handleSubmit}
            value={value}
            onChange={ nextValue => setValue(nextValue) }
        >
            <Box gap="medium">
            <List
            data={checks}
            children={(check, index) => (
                <Check check={check} disabled={disabled} index={index} />
            )}
            />
            {(!disabled && <Button disabled={disabled} label="Submit" primary type="submit" />)}
            </Box>
        </Form>
    )
}

export default Checklist;