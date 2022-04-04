import { Form, Formik } from 'formik';
import React from 'react';
import { Button, Navbar, Typography, Input } from '../../../components';
import './Signin.css';

const Signin = () => {
  return (
    <div className="Signin__root">
      <Navbar />
      <div className="Signin__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary my-2 text-center">
          Signin to continue
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          //   validationSchema={validateLogin()}
          //   onSubmit={handleSubmit}
        >
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, isValid }) => {
            return (
              <>
                {errors?.error && (
                  <Typography variant="p" className="Typography--error Typography--xs text-center">
                    {errors.error || 'This is a error'}
                  </Typography>
                )}
                <Form autoComplete="off" onSubmit={handleFormikSubmit}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    hasLabel
                    placeholder="johndoe@test.com"
                    value={values.email}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    hasLabel
                    placeholder="******"
                    value={values.password}
                  />
                  <Button
                    component="button"
                    type="submit"
                    variant="contained"
                    className="Signin__button text-bold w-10 text-10"
                    disabled={
                      isSubmitting ||
                      !isValid ||
                      Boolean(values.email === '' || values.password === '')
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Login'}
                  </Button>
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
