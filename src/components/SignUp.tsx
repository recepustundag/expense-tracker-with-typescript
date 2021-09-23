import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router';
import api from '../utils/api';
import showError from '../utils/showError';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};
/* eslint-enable no-template-curly-in-string */

function SignUp() {

  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await api().post('/users/register', values)
      history.push('/login', {newSignUp: true})
    } catch (error) {
      showError((error as any).response.data.errorMessage);
    }
  };

  return (
    <Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
      <h2 style={{textAlign: 'center', marginBottom: 40}}>Register</h2>
      <Form.Item name='username' label='Username' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Password' name='password' rules={[{ required: true, min: 8, message: 'Please input your password!' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item name='full_name' label='Full Name'>
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
