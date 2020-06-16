import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import { saveUser } from '../actions/actions'


const Roles = ({ organization }) => {

  return (
    <Main pad="medium">
      <Heading>Roles</Heading>
      
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    organization: state.organization,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
