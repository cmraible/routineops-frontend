import React from 'react';
import Page from '../../components/Page';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskById } from './tasksSlice';
import { selectLayerById } from '../layers/layersSlice';
import { selectChecksForRoutine } from '../checks/checksSlice';
import Checklist from '../checks/Checklist';
import { selectRoutineById } from '../routines/routinesSlice';
import { push, goBack } from 'connected-react-router';

const Task = ({match}) => {
    const dispatch = useDispatch()
    const { params } = match
    const { taskId } = params
    const task = useSelector(state => selectTaskById(state, taskId))
    const layer = useSelector(state => selectLayerById(state, task.layer))
    const routine = useSelector(state => selectRoutineById(state, layer.routine))
    const checks = useSelector(state => selectChecksForRoutine(state, layer.routine))

    return (
        <Page title={routine.name} pad="medium" previous={() => dispatch(goBack())}>
            <Checklist checks={checks} task={task} onComplete={() => dispatch(push('/'))} />
        </Page>
    )
}

export default Task;