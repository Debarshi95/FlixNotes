import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { AuthErrorCodes } from 'firebase/auth';
import { Button, Navbar, Typography, Input } from 'components';
import { validateLogin } from 'utils/formValidations';
import { signin } from 'services/firebaseApi';
import { authErrorMessage } from 'constants/authMessages';
import './Signin.css';

const Signin = () => {
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

  return (
    <div className="Signin__root">
      <Navbar />
      <div className="Signin__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary mt-2 mb-1 text-center">
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
          {({ handleSubmit: handleFormikSubmit, isSubmitting, values, errors, isValid }) => {
            return (
              <>
                {errors?.message && (
                  <Typography
                    variant="p"
                    className="Typography--error Typography--xs text-center mb-1"
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
