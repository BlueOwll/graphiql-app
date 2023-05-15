import style from './Playground.module.scss';
import { useState } from 'react';

const Playground = (props: any) => {
  const [query, setQuery] = useState<string>(props.query);

  function handleQuery(e) {
    setQuery(e.target.value);
  }

  return (
    <textarea
      className={style.playground}
      value={query}
      onChange={handleQuery}
      onBlur={() => props.setQuery(query)}
    />
  );
};

export default Playground;
