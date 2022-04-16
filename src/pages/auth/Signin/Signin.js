import { Form, Formik } from 'formik';
import { Navigate, useNavigate } from 'react-router';
import { AuthErrorCodes } from 'firebase/auth';
import { Button, Navbar, Typography, Input } from 'components';
import { validateLogin } from 'utils/formValidations';
import { signin } from 'services/firebaseApi';
import { useAuth } from 'providers/AuthProvider/AuthProvider';
import { authErrorMessage } from 'constants/authMessages';
import './Signin.css';

const Signin = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    let message = '';
    try {
      const res = await signin(values);

      if (res?.user) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      if (err?.code === AuthErrorCodes.INVALID_PASSWORD) {
        message = authErrorMessage.WRONG_PASSWORD;
      }
      if (err?.code === AuthErrorCodes.USER_DELETED) {
        message = authErrorMessage.USER_NOT_FOUND;
      }
    }
    resetForm({
      values: { ...values, password: '', confirmPassword: '' },
      errors: { message },
      touched: {
        password: true,
        confirmPassword: true,
      },
    });
  };

  if (authUser) {
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <div className="Signin__root">
      <Navbar />
      <div className="Signin__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary mt-1 mb-2" align="center" size="md">
          Signin to continue
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validateLogin()}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit: handleFormikSubmit,
            isSubmitting,
            values,
            errors,
            isValid,
            setValues,
          }) => {
            return (
              <>
                {errors?.message && (
                  <Typography
                    variant="p"
                    className="Typography--error mb-2"
                    align="center"
                    size="xs"
                  >
                    {errors.message || 'Oops! Some error occurred'}
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
                    className="Signin__button text-bold w-10 Typography--xs"
                    disabled={
                      isSubmitting ||
                      !isValid ||
                      Boolean(values.email === '' || values.password === '')
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Login'}
                  </Button>
                  <Button
                    component="button"
                    type="click"
                    variant="contained"
                    className="Signin__button text-bold w-10 Typography--xs"
                    onClick={() => {
                      setValues({
                        email: process.env.REACT_APP_TEST_EMAIL,
                        password: process.env.REACT_APP_TEST_PASSWORD,
                      });
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Sign in as Test User'}
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
