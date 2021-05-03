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
import { DateTime } from 'luxon';
import { getPrice } from '../subscriptions/subscriptionsSlice';

const ConfirmSubscription = ({ quantity, price }) => {

    const dispatch = useDispatch();
    const account = useSelector(selectUserAccount);

    const [errors, setErrors] = useState();
    const [priceDetails, setPriceDetails] = useState(null);
    const [status, setStatus] = useState('idle');
    const [invoiceStatus, setInvoiceStatus] = useState('idle');
    const [invoice, setInvoice] = useState(null);

    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        const fetchPrice = async () => {
            const actionResult = await dispatch(getPrice(price));
            unwrapResult(actionResult)
            setPriceDetails(actionResult.payload)
        }
        fetchPrice()
    }, [dispatch, price]);

    useEffect(() => {
        const fetchInvoice = async () => {
            setInvoiceStatus('pending');
            const actionResult = await dispatch(previewUpcomingInvoice({
                account: account.id,
                quantity: quantity,
                newPriceId: price
            }));
            unwrapResult(actionResult)
            setInvoiceStatus('idle');
            setInvoice(actionResult.payload.invoice)
        }
        fetchInvoice()
    }, [dispatch, quantity, account.id, price]);


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
                priceId: price,
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
    if (invoice && priceDetails) {
        console.log(invoice)
        console.log(priceDetails)
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
                                <FormNextLink /><Text size="medium">{`${line.description}: $${(line.amount/100).toFixed(2)}`}</Text>
                            </Box>
                        )
                    }))}
                    <Box direction="row" align="start" gap="xsmall">
                        <FormNextLink /><Text>{`Due today: $${(invoice.total/100).toFixed(2)}`}</Text>
                    </Box>
                    { account.has_ever_had_subscription && (
                        <Box direction="row" align="start" gap="xsmall">
                            <FormNextLink /><Text>{`$${(invoice.total/100).toFixed(2)} will be charged ${priceDetails.recurring.interval}ly to the credit card on file.`}</Text>
                        </Box>
                    )}

                    { !account.has_ever_had_subscription && (
                        <Box direction="row" align="start" gap="xsmall">
                            <FormNextLink /><Text>{`$${(quantity*priceDetails.unit_amount/100).toFixed(2)} will be charged ${priceDetails.recurring.interval}ly to the credit card on file starting ${DateTime.fromSeconds(invoice.lines.data[0].period.end).toLocaleString()}.`}</Text>
                        </Box>
                    )}

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