import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import style from './Menu.module.scss';

const Menu = (props) => {

  const url = 'https://rickandmortyapi.com/graphql';

  function makeRequest(query) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({query})
    }).then(res => res.json());
  }

  return (
    <div className={style.menu}>
      <IconButton onClick={() => {
        makeRequest(props.query).then(res => props.setResponse(JSON.stringify(res)));
      }}>
        <PlayCircleFilledIcon />
      </IconButton>
      <IconButton onClick={() => {
        props.setQuery('');
      }}>
        <CleaningServicesIcon />
      </IconButton>
    </div>
  );
};

export default Menu;
