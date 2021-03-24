import { unwrapResult } from '@reduxjs/toolkit';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Box, Form, Heading } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';
import Message from '../../components/Message';
import StripeCreditCardField from '../../components/StripeCreditCardField';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { addNewSubscription, previewUpcomingInvoice } from '../subscriptions/subscriptionsSlice';
import { selectUserAccount } from './accountsSlice';
import { push, goBack } from 'connected-react-router';

const AccountBillingUpgradePro = ({ close }) => {

    const dispatch = useDispatch();
    const account = useSelector(selectUserAccount);

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [invoiceStatus, setInvoiceStatus] = useState('idle')
    const [previewInvoice, setPreviewInvoice] = useState({total: 0});


    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchInvoice = async () => {
            setInvoiceStatus('pending')
            const actionResult = await dispatch(previewUpcomingInvoice({
                account: account.id,
                quantity: 1,
                newPriceId: process.env.REACT_APP_PRO_PRICE_ID
            }))
            unwrapResult(actionResult);
            setInvoiceStatus('idle')
            setPreviewInvoice(actionResult.payload.invoice);
        }
        fetchInvoice()
    }, [dispatch, account.id]);

    const handleSubmit = async () => {
        setStatus('pending');
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            console.log(error)
            setStatus('idle')
            setErrors({'credit-card': error.message})
        } else {
            const subscriptionData = {
                account: account.id,
                paymentMethodId: paymentMethod.id,
                priceId: process.env.REACT_APP_PRO_PRICE_ID,
                quantity: 1,
                type: 'Pro'
            }
            const resultAction = await dispatch(addNewSubscription(subscriptionData));
            if (addNewSubscription.fulfilled.match(resultAction)) {
                setStatus('success');
                setTimeout(() => {
                    dispatch(push('/account/billing'));
                }, 1500)
            } else {
                setStatus('failed');
                if (resultAction.payload) {
                    // Request completed successfully but returned field errors
                    setErrors(flattenErrors(resultAction.payload))
                } else {
                    // Request failed for unknown reason. Show the message.
                    setErrors({'non_field_errors': resultAction.error.message})
                }
            }
        }
    }

    let content
    if (status === 'success') {
        content = (<Message type="success" message="Account successfully upgraded" />)
    } else {
        content = (
            <Form
                data-cy="upgrade-form"
                errors={errors}
                onSubmit={handleSubmit}
            >
                <Box gap="medium">
                    <Box direction="row" align="center" gap="xsmall">
                        <FormNextLink /> Pro × 1 user
                    </Box>
                    <Box direction="row" align="center" gap="xsmall">
                        <FormNextLink />{"$" + (previewInvoice.total/100).toFixed(2)} due today
                    </Box>
                    <Box direction="row" align="center" gap="xsmall">
                        <FormNextLink />{"$" + (previewInvoice.total/100).toFixed(2)} will be charged monthly to the credit card on file.
                    </Box>
                    <StripeCreditCardField autoFocus label="" />
                </Box>
                <Box justify="center" gap="large" direction="row" pad="small">
                    <SubmitButton disabled={invoiceStatus === 'pending'} label="Upgrade" loadingIndicator={status === 'pending'} />
                </Box>
            </Form>
        )
    }

    return (
        <Box width="large" pad="medium" gap="large">
            <Box
                style={{position: "relative"}}
                direction="row"
                justify="center"
                align="center"
                fill="horizontal"
                height="xxsmall"
            >
                <BackButton style={{position: "absolute", left: 0}} onClick={() => dispatch(goBack())} />
                <Heading level={2} size="small" fill textAlign="center" margin="none">Upgrade to Pro</Heading>
            </Box>
            {content}
        </Box>

    )
}

export default AccountBillingUpgradePro;