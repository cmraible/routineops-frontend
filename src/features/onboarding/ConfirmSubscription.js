import React, { useEffect, useState } from 'react';
import { Box, Form, Text } from 'grommet';
import { FormNextLink } from 'grommet-icons';
import SubmitButton from '../../components/SubmitButton';
import AccountPage from '../../components/AccountPage';
import StripeCreditCardField from '../../components/StripeCreditCardField';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Spinner from '../../components/Spinner';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addNewSubscription, previewUpcomingInvoice } from '../subscriptions/subscriptionsSlice';
import { selectUserAccount } from '../accounts/accountsSlice';
import { flattenErrors } from '../../utils';

const ConfirmSubscription = ({ quantity }) => {

    const dispatch = useDispatch();
    const account = useSelector(selectUserAccount);


    const [errors, setErrors] = useState();
    const [status, setStatus] = useState('idle');
    const [invoiceStatus, setInvoiceStatus] = useState('idle');
    const [invoice, setInvoice] = useState(null);


    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const fetchInvoice = async () => {
            setInvoiceStatus('pending');
            const actionResult = await dispatch(previewUpcomingInvoice({
                account: account.id,
                quantity: quantity,
                newPriceId: process.env.REACT_APP_TEAM_PRICE_ID
            }))
            unwrapResult(actionResult)
            setInvoiceStatus('idle');
            setInvoice(actionResult.payload.invoice)
        }
        fetchInvoice()
    }, [dispatch, quantity, account.id]);


    const handleSubmit = async () => {
        setStatus('pending');
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });
        if (error) {
            console.log(error)
            setStatus('failed');
            setErrors({'credit-card': error.message})
        } else {
            const subscriptionData = {
                account: account.id,
                paymentMethodId: paymentMethod.id,
                priceId: process.env.REACT_APP_TEAM_PRICE_ID,
                quantity: quantity,
                type: 'Team'
            }
            const resultAction = await dispatch(addNewSubscription(subscriptionData));
            if (!addNewSubscription.fulfilled.match(resultAction)) {
                setStatus('failed')
                if (resultAction.payload) {
                    setErrors(flattenErrors(resultAction.payload))
                } else {
                    setErrors({'non_field_errors': resultAction.error.message})
                }
            }
        }
    }

    let content
    if (invoice) {
        content = (

            <Form
                data-cy="upgrade-form"
                errors={errors}
                onSubmit={handleSubmit}
            >
                <Box gap="medium">
                    {(invoice && invoice.lines.data.map(line => {
                        return (
                            <Box direction="row" align="start" gap="xsmall" key={line.id}>
                                <FormNextLink /> <Text size="medium">{`${line.description}: $${(line.amount/100).toFixed(2)}`}</Text>
                            </Box>
                        )
                    }))}
                    <Box direction="row" align="start" gap="xsmall">
                        <FormNextLink /><Text>{`Due today: $${(invoice.total/100).toFixed(2)}`}</Text>
                    </Box>
                    <Box direction="row" align="start" gap="xsmall">
                        <FormNextLink /><Text>{`$${(invoice.total/100).toFixed(2)} will be charged monthly to the credit card on file.`}</Text>
                    </Box>
                    <StripeCreditCardField autoFocus label="" />
                </Box>
                <Box justify="center" direction="row" pad="small">
                    <SubmitButton disabled={invoiceStatus === 'pending'} label="Confirm Subscription" loadingIndicator={status === 'pending'} />
                </Box>
            </Form>
        )
    } else {
        content = <Spinner isFetching={true} />
    }


    return (
        <AccountPage title="Confirm Subscription">
            {content}
        </AccountPage>
    )
}

export default ConfirmSubscription;