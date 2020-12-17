import { FormField, MaskedInput } from 'grommet';
import React from 'react';

const DayMultipleSelect = () => {

  return (
    <FormField name="time" fill="horizontal">
      <MaskedInput
        mask={[
          {
            length: [1, 2],
            //options: Array.from({ length: 12 }, (v, k) => k + 1),
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: "hh"
          },
          { fixed: ":" },
          {
            length: 2,
            //options: ["00", "15", "30", "45"],
            regexp: /^[0-5][0-9]$|^[0-9]$/,
            placeholder: "mm"
          },
          { fixed: " " },
          {
            length: 2,
            //options: ["AM", "PM"],
            regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
            placeholder: "am/pm"
          }
        ]}
        name="time"
      />
    </FormField>
  )
};

export default DayMultipleSelect
