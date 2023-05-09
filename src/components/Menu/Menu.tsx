import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import style from './Menu.module.scss';


const Menu = () => {
  return (
    <div className={style.menu}>
      <IconButton>
        <PlayCircleFilledIcon />
      </IconButton>
      <IconButton>
        <CleaningServicesIcon />
      </IconButton>
    </div>
  );
};

export default Menu;
