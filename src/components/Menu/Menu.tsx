import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import style from './Menu.module.scss';

const Menu = (props) => {
  const url = 'https://rickandmortyapi.com/graphql';
  const buttonStyle = {
    '&:focus': {
      outline: 'none',
    },
  };
  async function makeRequest(query: string, variables?: string) {
    const requestBody = variables
      ? JSON.stringify({ query, variables: JSON.parse(variables) })
      : JSON.stringify({ query });
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: requestBody,
    }).then((res) => res.json());
  }

  return (
    <div className={style.menu}>
      <IconButton
        sx={buttonStyle}
        onClick={() => {
          makeRequest(props.query, props.variables).then((res) =>
            props.setResponse(JSON.stringify(res)),
          );
        }}
      >
        <PlayCircleFilledIcon />
      </IconButton>
      <IconButton
        sx={buttonStyle}
        onClick={() => {
          props.setQuery('');
          props.setVariables('');
        }}
      >
        <CleaningServicesIcon />
      </IconButton>
    </div>
  );
};

export default Menu;
