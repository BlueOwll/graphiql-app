import { Link } from 'react-router-dom';
import style from './WelcomePage.module.scss';
import { Button } from '@mui/material';
import 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  return (
    <section className={style.welcomePage}>
      <div className={style.welcome__wrapper}>
        <div className={style.buttonContainer}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {loading ? (
              <div />
            ) : user ? (
              <Link to="/main">
                <Button
                  variant="contained"
                  style={{
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
        <div className={style.firstSection}>{t('welcom page part 1')}</div>
        <div className={style.secondSection}>{t('welcom page part 2')}</div>
        <div className={style.thirdSection}>{t('welcom page part 3')}</div>
      </div>
    </section>
  );
};

export default WelcomePage;
