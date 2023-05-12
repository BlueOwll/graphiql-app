import Select from '@mui/material/Select';
import style from './Header.module.scss';
import graphql from '../../assets/graphql.svg';
import rnm from '../../assets/rnm.svg';
import { Button, MenuItem, SelectChangeEvent } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import * as React from 'react';

const Header = (props) => {
  const [lang, setLang] = React.useState('en');

  const handleChangeLang = (e: SelectChangeEvent) => {
    props.changeLanguage(e.target.value);
    setLang(e.target.value);
  };

  return (
    <header className={style.header}>
      <div className={style.iconBlock}>
        <img src={graphql} />
        <a href="https://rickandmortyapi.com/graphql" target="_blank" rel="noreferrer">
          <img className={style.icon} src={rnm} />
        </a>
      </div>
      <div className={style.btnBlock}>
        <Select
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          value={lang}
          onChange={handleChangeLang}
        >
          <MenuItem value={'ru'}>RU</MenuItem>
          <MenuItem value={'en'}>ENG</MenuItem>
        </Select>
        <Button size="large" style={{ color: 'black' }} endIcon={<LogoutIcon />}>
          {props.t('logout')}
        </Button>
      </div>
    </header>
  );
};

export default Header;
