import style from './Header.module.scss';
import graphql from '../../assets/graphql.svg';
import rnm from '../../assets/rnm.svg';
import { Badge, CircularProgress, IconButton } from '@mui/material';
import * as React from 'react';
import { Language, Logout } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { TFunction } from 'i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type HeaderProps = {
  changeLanguage: (lang?: string) => void;
  t: TFunction<'translation', undefined, 'translation'>;
};

const Header = (props: HeaderProps) => {
  const [lang, setLang] = useState('en');
  const [isSticky, setSticky] = useState(false);

  const { user, loading, signout } = useAuth();

  const handleChangeLang = (e: React.MouseEvent) => {
    const newLang = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    props.changeLanguage(newLang);
  };

  const handleScroll = () => {
    const windowScrollTop = window.scrollY;
    if (windowScrollTop > 60) {
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
    <header className={`${style.header} ${isSticky ? style.sticky : ''}`}>
      <div className={style.iconBlock}>
        <Link to="/">
          <img src={graphql} />
        </Link>
        <a href="https://rickandmortyapi.com/graphql" target="_blank" rel="noreferrer">
          <img className={style.icon} src={rnm} />
        </a>
      </div>
      <div>{user ? `User E-mail: ${user.email}` : ''}</div>
      <div className={style.btnBlock}>
        {loading ? (
          <CircularProgress />
        ) : user ? (
          <>
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
          </>
        ) : (
          <> </>
        )}
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
      </div>
    </header>
  );
};

export default Header;
