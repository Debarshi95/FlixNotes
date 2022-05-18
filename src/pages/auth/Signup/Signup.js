import { AuthErrorCodes } from 'firebase/auth';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router';
import { Button, Typography, Input, Wrapper } from 'components';
import { checkUserNameTaken, createUser, signup } from 'services/firebaseApi';
import { validateRegister } from 'utils/formValidations';
import { authErrorMessage } from 'constants/authMessages';
import withAuthRoute from 'hoc/withAuthRoute';
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
    <Wrapper hasNavbar={false}>
      <div className="Signup__formContainer d-flex flex-col">
        <Typography variant="h5" className="Typography--primary mt-1 mb-2" align="center" size="md">
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
                    className="Typography--error mb-2"
                    align="center"
                    size="xs"
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
    </Wrapper>
  );
};

export default withAuthRoute(Signup);
