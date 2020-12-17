import { Button } from 'grommet';
import React from 'react';
import Spinner from './Spinner';

const SubmitButton = ({ label, loadingIndicator, size, color }) => {

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
            disabled={loadingIndicator}
            size={size || "large"}
        />
    )
}

export default SubmitButton;