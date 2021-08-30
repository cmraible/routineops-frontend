import { push } from 'connected-react-router';
import { Box, Menu, Text } from 'grommet';
import { Compliance, FormEdit, FormTrash, More } from 'grommet-icons';
import { DateTime } from 'luxon';
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
            align="center"
        >
            <Box
                pad="small"
                direction="row"
                align="center"
                gap="medium"
                fill
                onClick={() => dispatch(push(`/routines/${id}`))}
            >
                <Compliance />
                <Box>
                    <Text style={{lineHeight: '18px'}} margin="none">{routine.name}</Text>
                    <Text style={{lineHeight: '10px'}} color="text-xweak" size="xsmall">Created {DateTime.fromISO(routine.created).toLocaleString()}</Text>

                </Box>
            </Box>
            {(actions && 
                   ( 
                    <Box align="center" justify="center">

                        <Menu
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
                    </Box>
                   )
            )}
            
            {(showDelete && <RoutineDelete id={id} close={() => setShowDelete(false)} />)}

        </Box>
    )
  }

export default RoutineItem;