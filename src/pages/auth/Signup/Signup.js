import { AuthErrorCodes } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { Button, Navbar, Typography, Input } from '../../../components';
import { checkUserNameTaken, createUser, signup } from '../../../services/firebaseApi';
import { validateRegister } from '../../../utils/formValidations';
import { authErrorMessage } from '../../../constants/authMessages';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm, setFieldError }) => {
    const { username, email, password, confirmPassword } = values;
    let message;

    if (password !== confirmPassword) {
      return setFieldError('confirmPassword', 'Passwords donot match');
    }

    try {
      const usernameTaken = await checkUserNameTaken(username);

      if (usernameTaken?.docs.length) {
        message = authErrorMessage.USERNAME_TAKEN;
      } else {
        const res = await signup({ email, password });
        if (res?.user) {
          const { user } = res;
          const doc = await createUser({ username, uid: user.uid, email });
          if (doc?.id) {
            navigate('/dashboard', { replace: true });
          }
        }
      }
    } catch (err) {
      if (err?.code === AuthErrorCodes.EMAIL_EXISTS) {
        message = authErrorMessage.EMAIL_IN_USE;
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
    return null;
  };

  return (
    <div className="Signup__root">
      <Navbar />
      <div className="Signup__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary mt-2 mb-1 text-center">
          Signup to get started
        </Typography>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validateRegister()}
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
                    label="Username"
                    name="username"
                    type="text"
                    hasLabel
                    placeholder="johndo99"
                    value={values.username}
                  />
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
                  <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    hasLabel
                    placeholder="******"
                    value={values.confirmPassword}
                  />
                  <Button
                    component="button"
                    type="submit"
                    variant="contained"
                    className="Signup__button text-bold w-10 text-10"
                    disabled={
                      isSubmitting ||
                      !isValid ||
                      Boolean(
                        values.username === '' ||
                          values.email === '' ||
                          values.password === '' ||
                          values.confirmPassword === ''
                      )
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Signup'}
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

export default Signup;
