import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { VarObject } from '../../types/Types';
import Variables from '../Variables/Variables';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));
export type ExtendedAccordionProps = {
  setExpandedAccordion: (data: string | false) => void;
  extandedAccordion: string | false;
  setVariables: (data: VarObject[]) => void;
  variables: VarObject[] | [];
};
export default function CustomizedAccordions(props: ExtendedAccordionProps) {
  const [expanded, setExpanded] = useState<string | false>(props.extandedAccordion);
  const { t } = useTranslation();
  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    props.setExpandedAccordion(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{t('Variables')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Variables variables={props.variables} setVariables={props.setVariables} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
