import { push } from 'connected-react-router';
import { Box, Menu, Text } from 'grommet';
import { Compliance, FormEdit, FormTrash, More } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoutineDelete from './RoutineDelete';
import { selectRoutineById } from './routinesSlice';


const RoutineItem = ({id, actions}) => {
    const dispatch = useDispatch();
    const routine = useSelector(state => selectRoutineById(state, id));

    const [showDelete, setShowDelete] = useState(false);


    return (
      <Box
            direction="row"
            fill
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
                <Compliance /><Text>{routine.name}</Text>
            </Box>
            {(actions && 
                   ( <Menu
                    size="small"
                    data-cy={`action-menu-${id}`}
                    icon={<More />}
                    dropAlign={{"right": "right", "top": "bottom"}}
                    alignSelf="end"
                    items={[
                        {label: "Edit", icon: <FormEdit />, gap: "small", onClick: () => dispatch(push(`/routines/${id}/edit`))},
                        {label: "Delete", icon: <FormTrash />, gap: "small", size: "small", onClick: () => setShowDelete(true)}
                    ]}
                />
                   )
            )}
            
            {(showDelete && <RoutineDelete id={id} close={() => setShowDelete(false)} />)}

        </Box>
    )
  }

export default RoutineItem;