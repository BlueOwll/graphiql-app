import { Typography } from '@mui/material';
import style from './Footer.module.scss';
import SpeedDialGit from './speedDialGit';
import graphql from '../../assets/logo-rs.svg';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__wrapper}>
        <div className={style.iconBlock}>
          <a href="https://rs.school/">
            <img className={style.imgBlock} src={graphql} />
          </a>
        </div>
        <Typography variant="h6" component="div">
          2023
        </Typography>
        <div className={style.gitContainer}>
          <SpeedDialGit />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
