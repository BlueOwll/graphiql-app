import style from './Variables.module.scss';
import { useState } from 'react';

const Variables = (props: any) => {
  const [variables, setVariables] = useState<string>(props.variables);

  function handleVariables(e) {
    setVariables(e.target.value);
  }

  return (
    <textarea
      className={style.playground}
      onChange={handleVariables}
      value={variables}
      onBlur={() => props.setVariables(variables)}
    />
  );
};

export default Variables;
