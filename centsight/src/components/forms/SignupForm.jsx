import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserWithPassword } from '../../store/auth-actions';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
const validate = (values) => {
  const errors = {};
  if (values.email === '') {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.password === '') {
    errors.password = 'Required';
  }
  if (values.confirmPassword === '') {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
};

const SignupForm = ({ changeType }) => {
  const error = useSelector((state) => state.auth.error);
  const toast = useToast();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      dispatch(registerUserWithPassword(values.email, values.password));
    },
  });

  const handleError = (message) => {
    toast({
      title: message,
      position: 'top-right',
      status: 'error',
      isClosable: true,
    });
  };

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card className="w-96">
        <CardHeader>
          <p className="text-md">Signup</p>
        </CardHeader>
        <CardBody className="flex-col gap-4">
          <Input
            type="email"
            label="Email"
            isInvalid={formik.errors.email && formik.touched.email}
            errorMessage={formik.errors.email}
            onBlur={formik.handleBlur}
            onChange={(e) => {
              formik.setFieldValue('email', e.target.value);
            }}
            value={formik.values.email}
            name="email"
          />
          <Input
            type="password"
            label="Password"
            isInvalid={formik.errors.password && formik.touched.password}
            errorMessage={formik.errors.password}
            onChange={(e) => {
              formik.setFieldValue('password', e.target.value);
            }}
            value={formik.values.password}
            name="password"
          />
          <Input
            type="password"
            label="Confirm Password"
            isInvalid={
              formik.errors.confirmPassword && formik.touched.confirmPassword
            }
            errorMessage={formik.errors.confirmPassword}
            onChange={(e) => {
              formik.setFieldValue('confirmPassword', e.target.value);
            }}
            value={formik.values.confirPassword}
            name="confirmPassword"
          />
        </CardBody>
        <CardFooter className="grid gap-2 justify-center">
          <Button className="flex-1" type="submit">
            Register
          </Button>
          <p className="py-2">
            Already have an account? <Link onClick={changeType}>login!</Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default SignupForm;
