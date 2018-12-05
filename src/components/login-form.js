import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.username, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="landing-login-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        {/* <label htmlFor="username">Username</label> */}
        <Field
          className="login-input"
          component={Input}
          type="text"
          name="username"
          id="username"
          placeholder="username"
          validate={[required, nonEmpty]}
        />
        {/* <label htmlFor="password">Password</label> */}
        <Field
          className="login-input"
          component={Input}
          type="password"
          name="password"
          id="password"
          placeholder="password"
          validate={[required, nonEmpty]}
        />
        {error}
        <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
