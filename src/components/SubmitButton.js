import { Button } from 'grommet';
import React from 'react';
import Spinner from './Spinner';

const SubmitButton = ({ label, loadingIndicator, size, color, disabled, ...rest }) => {

    if (!label) {
        label = 'Submit'
    }

    return (
        <Button
            primary
            color={color || "brand"}
            label={(loadingIndicator) ? '' : label}
            icon={<Spinner isFetching={loadingIndicator} />}
            type="submit"
            disabled={loadingIndicator || disabled}
            size={size || "large"}
            {...rest}
        />
    )
}

export default SubmitButton;