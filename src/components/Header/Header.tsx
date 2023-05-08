import Select from '@mui/material/Select';
import style from './Header.module.scss';
import graphql from '../../assets/graphql.svg';
import rnm from '../../assets/rnm.svg';
import { Button, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const handleChangeLang = (e) => {
    console.log(e.target.value);
  };

  return (
    <header className={style.header}>
      <div className={style.iconBlock}>
        <img src={graphql} />
        <a href='https://rickandmortyapi.com/graphql' target="_blank"><img className={style.icon} src={rnm} /></a>
      </div>
      <div className={style.btnBlock}>
        <Select
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          value={'ENG'}
          onChange={handleChangeLang}
        >
          <MenuItem value={'RU'}>RU</MenuItem>
          <MenuItem value={'ENG'}>ENG</MenuItem>
        </Select>
        <Button  size="large" style={{color: 'black'}} endIcon={<LogoutIcon />}>Logout</Button>
      </div>
    </header>
  );
};

export default Header;
