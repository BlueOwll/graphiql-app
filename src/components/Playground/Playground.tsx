import style from './Playground.module.scss';
import { ChangeEvent, useState } from 'react';
type PlaygroundProps = {
  setQuery: (data: string) => void;
  query: string;
};
const Playground = (props: PlaygroundProps) => {
  const [query, setQuery] = useState<string>(props.query);

  function handleQuery(e: ChangeEvent<HTMLTextAreaElement>) {
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
