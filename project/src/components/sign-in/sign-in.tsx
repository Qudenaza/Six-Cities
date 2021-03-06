import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus, locations } from '../../const';
import { changeLocation } from '../../store/action';

function SignIn(): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [randomLocation] = useState(locations[(locations.length * Math.random()) | 0]);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email !== null && password !== null) {
      dispatch(
        loginAction({
          email: email,
          password: password,
        }),
      );

      history.goBack();
    }
  };

  const handleCityChange = () => {
    dispatch(changeLocation(randomLocation));
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    history.push('./');
  }

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                pattern="^(?=.*[aA-zZ])(?=.*\d)[aA-zZ\d]{1,}$"
              />
            </div>
            <button className="login__submit form__submit button" type="submit">
              Sign in
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link to="./" className="locations__item-link" onClick={handleCityChange}>
              <span>{randomLocation.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SignIn;
