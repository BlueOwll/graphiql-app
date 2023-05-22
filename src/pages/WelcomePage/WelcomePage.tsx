import { Link } from 'react-router-dom';
import style from './WelcomePage.module.scss';
import { Button, CircularProgress } from '@mui/material';
import 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

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
                {t('go to main page')}
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
                <Button variant="contained">{t('sign in')}</Button>
              </Link>
              <Link to="/signUp">
                <Button variant="contained" color="secondary">
                  {t('sign up')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={style.firstSection}>
        <div style={{ flexBasis: '50%' }}>{t('welcom page part 1')}</div>
        <div style={{ flexBasis: '25%' }}></div>
      </div>
      <div className={style.secondSection}>{t('welcom page part 2')}</div>
      <div className={style.thirdSection}>{t('welcom page part 3')}</div>
    </div>
  );
};

export default WelcomePage;
