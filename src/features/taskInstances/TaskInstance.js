import React from 'react';
import Page from '../../components/Page';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskInstanceById } from './taskInstancesSlice';
import { selectLayerById } from '../layers/layersSlice';
import { selectChecksForRoutine } from '../checks/checksSlice';
import Checklist from '../checks/Checklist';
import { selectRoutineById } from '../routines/routinessSlice';
import { push, goBack } from 'connected-react-router';

const TaskInstance = ({match}) => {
    const dispatch = useDispatch()
    const { params } = match
    const { taskInstanceId } = params
    const taskInstance = useSelector(state => selectTaskInstanceById(state, taskInstanceId))
    const layer = useSelector(state => selectLayerById(state, taskInstance.layer))
    const routine = useSelector(state => selectRoutineById(state, layer.routine))
    const checks = useSelector(state => selectChecksForRoutine(state, layer.routine))

    return (
        <Page title={routine.name} pad="medium" previous={() => dispatch(goBack())}>
            <Checklist checks={checks} taskInstance={taskInstance} onComplete={() => dispatch(push('/'))} />
        </Page>
    )
}

export default TaskInstance;