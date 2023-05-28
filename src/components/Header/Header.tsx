import style from './Header.module.scss';
import graphql from '../../assets/graphql.svg';
import rnm from '../../assets/rnm.svg';
import { Badge, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { Language, Logout } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState('en');
  const [isSticky, setSticky] = useState(false);

  const { user, loading, signout } = useAuth();

  const handleChangeLang = () => {
    const newLang = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  const handleScroll = () => {
    const windowScrollTop = window.scrollY;
    if (windowScrollTop > 64) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`${style.header__placeholder} ${isSticky ? style.visible : ''}`}></div>
      <header className={`${style.header} ${isSticky ? style.sticky : ''}`}>
        <div className={style.header__wrapper}>
          <div className={style.iconBlock}>
            <Link to="/welcome">
              <img src={graphql} />
            </Link>
            <a href="https://rickandmortyapi.com/graphql" target="_blank" rel="noreferrer">
              <img className={style.icon} src={rnm} />
            </a>
          </div>

          <div className={style.btnBlock}>
            <Typography
              className={style.username}
              color="primary"
              sx={{ fontSize: '1.5rem', fontWeight: 600, marginInline: '2rem' }}
            >
              {user ? `${user.email}` : ''}
            </Typography>
            {loading ? (
              <CircularProgress className="center" />
            ) : user ? (
              <>
                <Tooltip title={t('Logout')}>
                  <IconButton
                    color="inherit"
                    sx={{
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                    onClick={signout}
                  >
                    <Logout />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <> </>
            )}
            <Tooltip title={t(lang)}>
              <IconButton
                sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                }}
                color="inherit"
                onClick={handleChangeLang}
              >
                <Badge badgeContent={lang}>
                  <Language />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
