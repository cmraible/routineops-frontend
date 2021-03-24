import React from 'react';
import Page from '../../components/Page';
import { useSelector, useDispatch } from 'react-redux';
import { selectTaskInstanceById } from './taskInstancesSlice';
import { selectTaskLayerById } from '../taskLayers/taskLayersSlice';
import { selectChecksForTask } from '../checks/checksSlice';
import Checklist from '../checks/Checklist';
import { selectTaskById } from '../tasks/tasksSlice';
import { push } from 'connected-react-router';

const TaskInstance = ({match}) => {
    const dispatch = useDispatch()
    const { params } = match
    const { taskInstanceId } = params
    const taskInstance = useSelector(state => selectTaskInstanceById(state, taskInstanceId))
    const taskLayer = useSelector(state => selectTaskLayerById(state, taskInstance.taskLayer))
    const task = useSelector(state => selectTaskById(state, taskLayer.task))
    const checks = useSelector(state => selectChecksForTask(state, taskLayer.task))

    return (
        <Page title={task.name} pad="medium">
            <Checklist checks={checks} taskInstance={taskInstance} onComplete={() => dispatch(push('/'))} />
        </Page>
    )
}

export default TaskInstance;