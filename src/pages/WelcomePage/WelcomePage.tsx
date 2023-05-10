import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';
import style from './WelcomePage.module.scss';
import { Button, CircularProgress, Paper, styled } from '@mui/material';
import 'firebase/auth';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Typed from 'react-typed';
const WelcomePage = (props) => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className={style.welcomePage}>
      <div className={style.buttonContainer}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {loading ? (
            <CircularProgress />
          ) : user ? (
            <Link to="/main">
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'grey',
                  color: 'white',
                  margin: '10px',
                }}
              >
                {props.t('go to main page')}
              </Button>
            </Link>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/signIn">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'grey',
                    color: 'white',
                    margin: '10px',
                  }}
                >
                  {props.t('sign in')}
                </Button>
              </Link>
              <Link to="/signUp">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: 'grey',
                    color: 'white',
                    margin: '10px',
                  }}
                >
                  {props.t('sign up')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={style.firstSection}>
        <div style={{ flexBasis: '50%' }}>{props.t('welcom page part 1')}</div>
        <div style={{ flexBasis: '25%' }}>
          <Typed
            strings={[
              `<pre> <strong style="color: red" >type</strong> <span style="color: white">Project</span> {\n  <span style="color: blue">name</span>: <span style="color: orange">String</span>\n  <span style="color: blue">tagline</span>: <span style="color: orange">String</span>\n  <span style="color: blue">contributers</span>: [<span style="color: orange">User</span>]\n}</pre>`,
            ]}
            contentType={'html'}
            typeSpeed={40}
            backSpeed={20}
            backDelay={2000}
            showCursor={false}
            loop
          />
        </div>
      </div>
      <div className={style.secondSection}>{props.t('welcom page part 2')}</div>
      <div className={style.thirdSection}>{props.t('welcom page part 3')}</div>
    </div>
  );
};

export default WelcomePage;
