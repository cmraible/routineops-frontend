import { unwrapResult } from '@reduxjs/toolkit';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { goBack, push } from 'connected-react-router';
import { Box, Button, Form, Heading, Text } from 'grommet';
import { Add, FormNextLink, Subtract } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';
import Message from '../../components/Message';
import StripeCreditCardField from '../../components/StripeCreditCardField';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { addNewSubscription, previewUpcomingInvoice, getPrice } from '../subscriptions/subscriptionsSlice';
import { selectUserAccount } from './accountsSlice';


const AccountBillingUpgradeTeam = ({ close, match }) => {
    console.log(match)

    const dispatch = useDispatch();
    const account = useSelector(selectUserAccount);
    const { price } = match.params

    const [quantity, setQuantity] = useState(2);
    const [status, setStatus] = useState('idle-0');
    const [errors, setErrors] = useState({});
    const [invoiceStatus, setInvoiceStatus] = useState('idle')
    const [previewInvoice, setPreviewInvoice] = useState(false);
    const [priceDetails, setPriceDetails] = useState(null);

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
            setInvoiceStatus('pending')
            const actionResult = await dispatch(previewUpcomingInvoice({
                account: account.id,
                quantity: quantity,
                newPriceId: price
            }))
            unwrapResult(actionResult);
            setInvoiceStatus('idle')
            setPreviewInvoice(actionResult.payload.invoice);
        }
        fetchInvoice()
    }, [dispatch, price, quantity, account.id]);

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
            setStatus('idle-1')
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
                    <Button disabled={invoiceStatus === 'pending'} size="large" primary label="Continue" onClick={() => setStatus('idle-1')} />
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
                    {(previewInvoice && previewInvoice.lines.data.map(line => {
                        return (
                            <Box direction="row" align="center" gap="xsmall" key={line.id}>
                                <FormNextLink />{`${line.description}: $${(line.amount/100).toFixed(2)}`}
                            </Box>
                        )
                    }))}
                    <Box direction="row" align="center" gap="xsmall">
                        <FormNextLink />{`Due today: $${(previewInvoice.total/100).toFixed(2)}`}
                    </Box>
                    {account.has_ever_had_subscription && (
                        <Box direction="row" align="center" gap="xsmall">
                            <FormNextLink />{`$${(previewInvoice.total/100).toFixed(2)} will be charged ${priceDetails.recurring.interval}ly to the credit card on file.`}
                        </Box>
                    )}
                    { !account.has_ever_had_subscription && (
                        <Box direction="row" align="start" gap="xsmall">
                            <FormNextLink />{`$${(quantity*priceDetails.unit_amount/100).toFixed(2)} will be charged ${priceDetails.recurring.interval}ly to the credit card on file starting ${DateTime.fromSeconds(previewInvoice.lines.data[0].period.end).toLocaleString()}.`}
                        </Box>
                    )}
                    <StripeCreditCardField autoFocus label="" />
                </Box>
                <Box justify="center" gap="large" direction="row" pad="small">
                    <SubmitButton disabled={invoiceStatus === 'pending'} label="Upgrade" loadingIndicator={status === 'pending'} />
                </Box>
            </Form>
        )
    }

    return (
        <Box width="large" pad="medium" gap="medium">
            <Box
                style={{position: "relative"}}
                direction="row"
                justify="center"
                align="center"
                fill="horizontal"
                height="xxsmall"
            >
                <BackButton style={{position: "absolute", left: 0}} onClick={() => dispatch(goBack())} />
                <Heading level={2} size="small" fill textAlign="center" margin="none">Upgrade to Team</Heading>
            </Box>
            {content}
        </Box>
    )
}

export default AccountBillingUpgradeTeam;