import { useState } from 'react';
import style from './Docs.module.scss';

const Docs = () => {
  const [response, setResponse] = useState(null);

  const query = `{
      __schema {
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
                name
                description
                fields(includeDeprecated: true) {
                                                name
                                                description
                                                args {
                                                      name
                                                      description
                                                      defaultValue
                                                }
                                                type {
                                                      kind
                                                      name
                                                }
                }
        }
      }
    }`;

  const url = 'https://rickandmortyapi.com/graphql';

  const getSchema = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          query: query,
        },
      ),
    }).then(res => res.json());
  };

  getSchema().then(res => {
    const arr = res.data.__schema.types[0].fields;
    console.log('arr = ', arr);
    setResponse(arr.map(elem => {
      const argsArr = elem.args.map(el => {
        return (<div>{el.name}</div>);
      });
      return (<div className={style['field-block']}>
        <div className={style.field}>{elem.name}</div>
        <div className={style.args}> Args:
          {argsArr}
        </div>
        <div>{elem.description}</div>
      </div>);
    }));
  });

  return (
    <div>
      {response ? (
          <div>
            Query
            Fields:
            {response}
          </div>
      ) : (
        <div></div>)}
    </div>
  );
};

export default Docs;
