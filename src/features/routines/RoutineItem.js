import React, { useState } from 'react';
import { Box, Menu, Text } from 'grommet';
import { Checkmark, FormEdit, FormTrash, More } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoutineById } from './routinessSlice';
import { push } from 'connected-react-router';
import RoutineDelete from './RoutineDelete';


const RoutineItem = ({id}) => {
    const dispatch = useDispatch();
    const routine = useSelector(state => selectRoutineById(state, id));

    const [showDelete, setShowDelete] = useState(false);


    return (
      <Box
            direction="row"
            fill
            pad={{horizontal: "small"}}
            border="bottom"
            hoverIndicator
        >
            <Box
                pad="small"
                direction="row"
                align="center"
                gap="medium"
                fill
                onClick={() => dispatch(push(`/routines/${id}`))}
            >
                <Checkmark /><Text>{routine.name}</Text>
            </Box>
            <Menu
                size="small"
                icon={<More />}
                dropAlign={{"right": "right", "top": "bottom"}}
                alignSelf="end"
                items={[
                    {label: "Edit", icon: <FormEdit />, gap: "small", onClick: () => dispatch(push(`/routines/${id}/edit`))},
                    {label: "Delete", icon: <FormTrash />, gap: "small", size: "small", onClick: () => setShowDelete(true)}
                ]}
            />
            {(showDelete && <RoutineDelete id={id} close={() => setShowDelete(false)} />)}

        </Box>
    )
  }

export default RoutineItem;