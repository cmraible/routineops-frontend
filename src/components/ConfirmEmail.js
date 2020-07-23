import { Box, Heading, Main } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../actions/auth.actions';
import { goToCheckout } from '../actions/ui.actions';
import Spinner from './Spinner';
import Success from './Success';


const ConfirmEmail = ({ match, verifyEmail, isFetching, user }) => {

  const key = match.params.key;

  useEffect(() => {
    verifyEmail(key);
  }, [verifyEmail, key]);

  const confirmed = (user) ? true : false;

  return (
    <Main align="center" justify="start">
      <Box align="stretch" width="large" margin={{vertical: "large"}}>
        <Heading>Routine Ops</Heading>
        <Spinner isFetching={isFetching} />
        {confirmed && <Success message="Thanks for confirming your email!" />}

       
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: state.auth.signupFlow.user
});

export default connect(mapStateToProps, { goToCheckout, verifyEmail })(ConfirmEmail);
