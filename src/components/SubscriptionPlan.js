import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { Close } from 'grommet-icons';
import {DateTime} from 'luxon';

const SubscriptionPlan = ({dataCY, title, subtitle, price, icon, selected, invoice, peruser, permonth, peryear, onClick, quantity, pad, trial}) => {

  let content
  if (invoice) {
    console.log(invoice)
    quantity = invoice.lines.data[0].quantity
    peryear = invoice.lines.data[0].plan.interval === 'year'
    permonth = invoice.lines.data[0].plan.interval === 'month'
    const amount = invoice.lines.data[0].amount / 100
    price = invoice.lines.data[0].plan.amount / 100
    const discount = invoice.lines.data[0].discount_amounts.length > 0
    const amount_due = invoice.amount_due
    
    content = (
        <Box
          pad={ pad || "medium"}
          hoverIndicator
          round="medium"
          border={{color: selected ? "selected" : "border", size: "small"}}
          direction="row-responsive"
          justify="between"
          align="center"
          data-cy={dataCY}
          onClick={onClick}
        >
          <Box direction="row"  align="center" gap="medium">
            {icon}
            <Box gap="small">
              <Heading level={2} size="small" margin="none">{title}</Heading>
              <Text>{subtitle}</Text>
              {trial && (<Box alignSelf="start" background="selected" round="small" pad={{horizontal: "small"}}><Text size="small" weight="bold">30 day free trial</Text></Box>)}
            </Box>
          </Box>
          <Box direction="row" align="start" gap="medium" justify="start">
            <Box align="center">
              <Box justify="end" direction="row" align="baseline">
                <Text size="xsmall">$</Text>
                <Text size="xxlarge">{price}</Text>
              </Box>
              {(permonth && <Text size="xsmall">per month</Text>)}
              {(peryear && <Text size="xsmall">per year</Text>)}
            </Box>
            {
              quantity && (
                <Box direction="row" align="center" gap="medium">
                  <Box align="center">
                    <Close />
                  </Box>
                  <Box align="center">
                    <Box justify="end" direction="row" align="baseline">
                      <Text size="xxlarge">{quantity}</Text>
                    </Box>
                    <Text size="xsmall">users</Text>
                  </Box>
                  <Box align="center">
                    <Text size="xlarge">=</Text>
                  </Box>
                  <Box align="center">
                    {
                      discount ? 
                      <Box justify="end" direction="row" align="baseline" gap="medium">
                        <Box direction="row" align="baseline">
                          <Text size="xsmall">$</Text>
                          <Text style={{textDecoration: "line-through"}} size="xxlarge">{amount}</Text>
                        </Box>
                        <Box direction="row" align="baseline">
                          <Text size="xsmall">$</Text>
                          <Text size="xxlarge">{amount_due}</Text>
                        </Box>
                      </Box> :  
                      <Box justify="end" direction="row" align="baseline">
                        <Text size="xsmall">$</Text>
                        <Text size="xxlarge">{amount}</Text>
                      </Box>
                    }
                    
                    {(permonth && <Text size="xsmall">per month</Text>)}
                    {(peryear && <Text size="xsmall">per year</Text>)}
                  </Box>
                </Box>
              )
            }
          </Box>
          <Text color="text-weak">Next invoice on {DateTime.fromSeconds(invoice.next_payment_attempt).toLocaleString()}</Text>

        </Box>
    )
  } else {
    content = (
        <Box
          pad={ pad || "medium"}
          hoverIndicator
          round="medium"
          border={{color: selected ? "selected" : "border", size: "small"}}
          direction="row-responsive"
          justify="between"
          align="center"
          data-cy={dataCY}
          onClick={onClick}
        >
          <Box direction="row"  align="center" gap="medium">
            {icon}
            <Box gap="small">
              <Heading level={2} size="small" margin="none">{title}</Heading>
              <Text>{subtitle}</Text>
              {trial && (<Box alignSelf="start" background="selected" round="small" pad={{horizontal: "small"}}><Text size="small" weight="bold">30 day free trial</Text></Box>)}
            </Box>
          </Box>
          <Box direction="row" align="end" gap="medium" justify="center">
            <Box align="center">
              <Box justify="end" direction="row" align="baseline">
                <Text size="xsmall">$</Text>
                <Text size="xxlarge">{price}</Text>
              </Box>
              {(permonth && <Text size="xsmall">per month</Text>)}
              {(peryear && <Text size="xsmall">per year</Text>)}
            </Box>
            {
              quantity && (
                <Box direction="row" align="center" gap="medium">
                  <Box align="center">
                    <Close />
                  </Box>
                  <Box align="center">
                    <Box justify="end" direction="row" align="baseline">
                      <Text size="xxlarge">{quantity}</Text>
                    </Box>
                    <Text size="xsmall">users</Text>
                  </Box>
                  <Box align="center">
                    <Text size="xlarge">=</Text>
                  </Box>
                  <Box align="center">
                    <Box justify="end" direction="row" align="baseline">
                      <Text size="xsmall">$</Text>
                      <Text size="xxlarge">{price*quantity}</Text>
                    </Box>
                    {(permonth && <Text size="xsmall">per month</Text>)}
                    {(peryear && <Text size="xsmall">per year</Text>)}
                  </Box>
                </Box>
              )
            }
          </Box>
        </Box>
    )
  }
  
  return (
        content
    )
}

export default SubscriptionPlan;