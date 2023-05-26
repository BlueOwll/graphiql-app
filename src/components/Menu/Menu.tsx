import { IconButton } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import style from './Menu.module.scss';
import ErrorDialog from '../Playground/ErrorDialog';
import { useState } from 'react';
import { VarObject } from '../../types/Types';
type MenuProps = {
  query: string;
  variables: VarObject[] | [];
  setQuery: (arg: string) => void;
  setResponse: (arg: string | null) => void;
};
const Menu = (props: MenuProps) => {
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const url = 'https://rickandmortyapi.com/graphql';
  const buttonStyle = {
    '&:focus': {
      outline: 'none',
    },
  };
  async function makeRequest(
    query: MenuProps['query'],
    variables: { key: string; value: string }[],
  ) {
    let requestBody;
    if (variables?.length) {
      const variablesObject = variables.reduce(
        (obj: Record<string, string>, { key, value }: { key: string; value: string }) => {
          obj[key] = value;
          return obj;
        },
        {},
      );
      console.log(variablesObject);
      requestBody = JSON.stringify({ query, variables: variablesObject });
    } else {
      requestBody = JSON.stringify({ query });
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: requestBody,
    })
      .then((res) => res.json())
      .catch((error) => {
        setErrorMessage(error.message);
        setOpenErrorDialog(true);
      });
  }
  return (
    <div className={style.menu}>
      <IconButton
        sx={buttonStyle}
        onClick={() => {
          makeRequest(props.query, props.variables).then((res) => {
            props.setResponse(JSON.stringify(res));
          });
        }}
      >
        <PlayCircleFilledIcon />
      </IconButton>
      <IconButton
        sx={buttonStyle}
        onClick={() => {
          props.setQuery('');
        }}
      >
        <CleaningServicesIcon />
      </IconButton>
      <ErrorDialog
        openErrorDialog={openErrorDialog}
        setOpenErrorDialog={setOpenErrorDialog}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Menu;
