import style from './Header.module.scss';
import graphql from '../../assets/graphql.svg';
import rnm from '../../assets/rnm.svg';
import { Badge, CircularProgress, IconButton } from '@mui/material';
import * as React from 'react';
import { Language, Logout } from '@mui/icons-material';
import { auth, logout } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Header = (props) => {
  const [lang, setLang] = React.useState('en');
  const [user, loading] = useAuthState(auth);
  const handleChangeLang = (e) => {
    const newLang = lang === 'ru' ? 'en' : 'ru';
    setLang(newLang);
    props.changeLanguage(newLang);
  };
  return (
    <header className={style.header}>
      <div className={style.iconBlock}>
        <img src={graphql} />
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
              onClick={logout}
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
