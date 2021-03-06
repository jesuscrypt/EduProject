import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import authenticationService from './../../services/authentication';

import { setAlert, removeAlert } from './../../store/actions/alert';
import { getUser } from './../../store/actions/user';
import { Validator } from './../../helpers/validator';
import propTypes from 'prop-types';

import { Form } from './../generic/Form';
import { Input } from './../generic/Input';
import { Button } from './../generic/Button';
import Alert from './../layout/Alert';

const AuthForm = ({ history, setAlert, removeAlert, getUser }) => {
  const [formData, setFormData] = useState({
    authorized: false,
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный Email',
      valid: true,
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Пароль из минимум 6 символов',
      valid: true,
    },
  });

  const validator = new Validator(formData, setFormData);
  const { email, password, authorized } = formData;
  const validateForm = () => {
    validator.email();
    validator.password();

    if (email.valid && password.valid) {
      const userData = {
        email: email.value,
        password: password.value,
      };

      authenticationService.login(userData).then((res) => {
        if (res !== true) {
          setAlert(res.msg, 'danger');
        } else {
          setFormData({ ...formData, authorized: true });
        }
      });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    let form = { ...formData };
    form[name].value = value;
    setFormData({ ...form });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    validateForm();
  };

  useEffect(() => {
    if (authorized) {
      getUser();
      history.push('/account');
    }
    
    removeAlert();
  });

  return (
    <Fragment>
      <Form onSubmit={onSubmitHandler}>
        <Input
          name={email.type}
          label={email.label}
          value={email.value}
          error={!email.valid && email.errorMessage}
          onChange={(e) => onChangeHandler(e)}
        />
        <Input
          name={password.type}
          label={password.label}
          value={password.value}
          type="password"
          error={!password.valid && password.errorMessage}
          onChange={(e) => onChangeHandler(e)}
        />
        <Alert />
        <Button>Войти</Button>
      </Form>
      <NavLink to="/signup">Перейти к регистрации</NavLink>
    </Fragment>
  );
};

AuthForm.propTypes = {
  setAlert: propTypes.func.isRequired,
};

export default connect(null, { setAlert, removeAlert, getUser })(AuthForm);
