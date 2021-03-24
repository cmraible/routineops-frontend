import React from 'react'
import { Box, Heading, Text } from 'grommet'

const SubscriptionPlan = ({dataCY, title, subtitle, price, icon, selected, peruser, permonth, onClick}) => {

    return (
        <Box
          pad="medium"
          hoverIndicator
          round="medium"
          border={{color: selected ? "selected" : "border", size: "small"}}
          direction="row"
          justify="between"
          align="center"
          data-cy={dataCY}
          onClick={onClick}
        >
          <Box direction="row"  align="center" gap="medium">
            {icon}
            <Box>
              <Heading level={2} size="small">{title}</Heading>
              <Text>{subtitle}</Text>
            </Box>
          </Box>
          <Box align="center" width="xsmall">
            <Box justify="end" direction="row" align="baseline">
              <Text size="xsmall">$</Text>
              <Text size="xxlarge">{price}</Text>
            </Box>
            {(peruser && <Text size="xsmall">per user</Text>)}
            {(permonth && <Text size="xsmall">per month</Text>)}
          </Box>
        </Box>
    )
}

export default SubscriptionPlan;