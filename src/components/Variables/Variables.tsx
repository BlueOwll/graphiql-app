import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type MyObject = {
  key: string;
  value: string;
  [key: string]: string | undefined;
};
type VariablesProps = {
  setVariables: (data: MyObject[]) => void;
  variables: MyObject[] | [];
};
const Variables = (props: VariablesProps) => {
  const [data, setData] = useState(props.variables);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [disableActions, setDisableActions] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const { t } = useTranslation();
  const handleInputChange = (index: number, field: string, value: string) => {
    const newData: MyObject[] = [...data];
    newData[index][field] = value;
    setData(newData);
    if (invalidFields.includes(`${index}-${field}`)) {
      setInvalidFields(invalidFields.filter((item) => item !== `${index}-${field}`));
    }
  };

  const handleAddRow = () => {
    if (editingIndex !== -1) {
      return;
    }

    setData([...data, { key: '', value: '' }]);
    setEditingIndex(data.length);
  };

  const handleDeleteRow = (index: number) => {
    if (editingIndex !== -1) {
      return;
    }

    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    props.setVariables(newData);
  };

  const handleEditRow = (index: number) => {
    if (editingIndex !== -1) {
      return;
    }

    setEditingIndex(index);
  };

  const handleConfirmRow = (index: number) => {
    if (!data[index].key || !data[index].value) {
      if (!invalidFields.includes(`${index}-key`)) {
        setInvalidFields([...invalidFields, `${index}-key`, `${index}-value`]);
      }
      return;
    }

    setEditingIndex(-1);
    setDisableActions(false);
    props.setVariables(data);
  };

  return (
    <Table
      sx={{
        '& td': {
          padding: '5px',
        },
        '& th': { padding: '5px' },
        '& button': {
          '&:focus': {
            outline: 'none',
          },
        },
      }}
    >
      <TableHead>
        <TableRow sx={{ height: '20px' }}>
          <TableCell sx={{ width: '20px' }}>№</TableCell>
          <TableCell sx={{ width: '100px' }}> {t('Key')} </TableCell>
          <TableCell sx={{ width: '100px' }}>{t('Value')}</TableCell>
          <TableCell sx={{ width: '80px' }}>{t('Action')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody sx={{ height: '20px' }}>
        {data.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell sx={{ width: '100px' }}>
              <TextField
                sx={{ '& input': { padding: '2px' } }}
                fullWidth
                value={row.key}
                size="small"
                onChange={(e) => handleInputChange(index, 'key', e.target.value)}
                variant="outlined"
                disabled={index !== editingIndex || disableActions}
                error={invalidFields.includes(`${index}-key`)}
                autoFocus={index === data.length - 1}
              />
            </TableCell>
            <TableCell sx={{ width: '100px' }}>
              <TextField
                sx={{ '& input': { padding: '2px' } }}
                value={row.value}
                size="small"
                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                variant="outlined"
                disabled={index !== editingIndex || disableActions}
                error={invalidFields.includes(`${index}-value`)}
              />
            </TableCell>
            <TableCell sx={{ width: '80px' }}>
              {index === editingIndex ? (
                <IconButton onClick={() => handleConfirmRow(index)}>
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEditRow(index)}>
                  <ModeEditIcon />
                </IconButton>
              )}
              <IconButton onClick={() => handleDeleteRow(index)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow sx={{ height: '20px' }}>
          <TableCell colSpan={4}>
            <Button
              variant="contained"
              onClick={handleAddRow}
              disabled={editingIndex !== -1 || disableActions}
            >
              {t('Add')}
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Variables;
