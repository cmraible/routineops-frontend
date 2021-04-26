import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { Close } from 'grommet-icons';

const SubscriptionPlan = ({dataCY, title, subtitle, price, icon, selected, peruser, onClick, quantity, pad, trial}) => {

  console.log(trial)

    return (
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
          <Box direction="column" align="end" gap="medium" justify="center">
            <Box align="center">
              <Box justify="end" direction="row" align="baseline">
                <Text size="xsmall">$</Text>
                <Text size="xxlarge">{price}</Text>
              </Box>
              {(peruser && <Text size="xsmall">per user</Text>)}
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
                    <Text size="xsmall">per month</Text>
                  </Box>
                </Box>
              )
            }
          </Box>
        </Box>
    )
}

export default SubscriptionPlan;