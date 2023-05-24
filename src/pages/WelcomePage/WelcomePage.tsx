import { Link } from 'react-router-dom';
import style from './WelcomePage.module.scss';
import { Button, CircularProgress } from '@mui/material';
import 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import { TFunction } from 'i18next';

type WelcomePageProps = {
  t: TFunction<'translation', undefined, 'translation'>;
};

const WelcomePage = (props: WelcomePageProps) => {
  const { user, loading } = useAuth();

  return (
    <section className={style.welcomePage}>
      <div className={style.welcome__wrapper}>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingInline: '2vw',
                  paddingBlock: '10px',
                  gap: '2vw',
                }}
              >
                <Link to="/signIn">
                  <Button variant="contained">{props.t('sign in')}</Button>
                </Link>
                <Link to="/signUp">
                  <Button variant="contained" color="secondary">
                    {props.t('sign up')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={style.firstSection}>
          <div style={{ flexBasis: '50%' }}>{props.t('welcom page part 1')}</div>
          <div style={{ flexBasis: '25%' }}></div>
        </div>
        <div className={style.secondSection}>{props.t('welcom page part 2')}</div>
        <div className={style.thirdSection}>{props.t('welcom page part 3')}</div>
      </div>
    </section>
  );
};

export default WelcomePage;
