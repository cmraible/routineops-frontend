import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import { push } from 'connected-react-router';
import { Box, Button, Form, Text} from 'grommet';
import { FormNextLink, Add, Subtract } from 'grommet-icons';
import SubmitButton from '../../components/SubmitButton';
import { previewUpcomingInvoice, updateSubscription } from '../subscriptions/subscriptionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAccount } from './accountsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { flattenErrors } from '../../utils';
import { DateTime } from 'luxon';
import { useElements, useStripe } from '@stripe/react-stripe-js';


const AccountBillingModify = ({ close }) => {

    const dispatch = useDispatch();
    const account = useSelector(selectUserAccount);

    const [quantity, setQuantity] = useState(account.subscription.quantity);
    const [status, setStatus] = useState('idle-0');
    const [errors, setErrors] = useState({});
    const [invoiceStatus, setInvoiceStatus] = useState('idle')
    const [previewInvoice, setPreviewInvoice] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchInvoice = async () => {
            setInvoiceStatus('pending')
            const actionResult = await dispatch(previewUpcomingInvoice({
                account: account.id,
                quantity: quantity,
                newPriceId: process.env.REACT_APP_TEAM_PRICE_ID
            }))
            unwrapResult(actionResult);
            setInvoiceStatus('idle')
            setPreviewInvoice(actionResult.payload.invoice);
        }
        fetchInvoice()
    }, [dispatch, quantity, account.id]);

    const handleSubmit = async () => {
        setStatus('pending');
        if (!stripe || !elements) {
            return
        }
        const subscriptionData = {
            account: account.id,
            newPriceId: process.env.REACT_APP_TEAM_PRICE_ID,
            quantity: quantity
        }
        const resultAction = await dispatch(updateSubscription(subscriptionData));
        if (updateSubscription.fulfilled.match(resultAction)) {
            setStatus('success');
            close()
        } else {
            setStatus('failed');
            if (resultAction.payload) {
                setErrors(flattenErrors(resultAction.payload))
            } else {
                setErrors({'non_field_errors': resultAction.error.message})
            }
        }
    }

    const current_period_end = account.subscription.current_period_end
    var immediate_total = 0
    var next_invoice_sum = 0

    if (previewInvoice) {
        console.log(previewInvoice)
        previewInvoice.lines.data.forEach((lineItem) => {
            if (DateTime.fromSeconds(lineItem.period.end).equals(DateTime.fromISO(current_period_end))) {
                immediate_total += lineItem.amount;
            } else {
                next_invoice_sum += lineItem.amount;
            }
        });
        console.log('Immediate Total: ' + immediate_total)
        console.log('Next Invoice: ' + next_invoice_sum)
    }



    let content;
    if (status === 'success') {
        content = ('')
    } else if (status === 'idle-0') {
        content = (
            <Box align="center" gap="medium">
                <Text>How many people are on your team?</Text>
                <Box align="center">
                    <Box direction="row" justify="center" gap="large" align="center">
                        <Button size="small" primary data-cy="remove-user" icon={<Subtract size="small" />} onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)} />
                        <Text weight="bold" size="48px">{quantity}</Text>
                        <Button size="small" data-cy="add-user" primary icon={<Add size="small" />} onClick={() => setQuantity(quantity+1)} />
                    </Box>
                    <Text>{quantity > 1 ? "users" : "user"}</Text>
                </Box>
                <Box align="end">
                    <Button disabled={invoiceStatus === 'pending' || quantity === account.subscription.quantity} size="large" primary label="Continue" onClick={() => setStatus('idle-1')} />
                </Box>
            </Box>
        )
    } else if (status === 'idle-1' || status === 'failed' || status === 'pending') {
        content = (
            <Form
                data-cy="upgrade-form"
                errors={errors}
                onSubmit={handleSubmit}
            >
                <Box pad="medium" gap="medium">
                    <Box direction="row" align="start" gap="xsmall">
                        <FormNextLink />{`You are ${quantity - account.subscription.quantity > 0 ? "adding" : "removing" } ${Math.abs(quantity - account.subscription.quantity)} seat${Math.abs(quantity - account.subscription.quantity) > 1 ? "s" : ""}.`}
                    </Box>
                    <Box direction="row" align="start" gap="xsmall">
                        <FormNextLink />
                        {(immediate_total > 0) ?
                            `The card on file will be charged $${(Math.abs(immediate_total/100)).toFixed(2)} today for the remainder of the current billing period.` :
                            `Your account will be credited $${(Math.abs(immediate_total/100)).toFixed(2)} today for the remainder of the current billing period.`
                        }
                    </Box>
                    <Box direction="row" align="start" gap="xsmall">
                        <FormNextLink />{"$" + (next_invoice_sum/100).toFixed(2)} will be charged monthly to the credit card on file.
                    </Box>
                </Box>
                <Box justify="center" gap="large" direction="row" pad="small">
                    <SubmitButton disabled={invoiceStatus === 'pending' || quantity === account.subscription.quantity} label="Confirm Changes" loadingIndicator={status === 'pending' || quantity === account.subscription.quantity} />
                </Box>
            </Form>
        )
    }

    return (
        <Modal title="Add / Remove Seats" close={close}>
            <Box width="large" pad="medium" gap="medium">
                {content}
            </Box>
        </Modal>
    )
}

export default AccountBillingModify;