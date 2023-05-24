import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import style from './Docs.module.scss';

const Docs = () => {
  const BTN_STACK = [];
  const TITLE_STACK = [];
  const URL = 'https://rickandmortyapi.com/graphql';
  const SCHEMA_REQUEST = {
    query:
      '\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
    operationName: 'IntrospectionQuery',
  };

  const [docsViewBlock, setDocsViewBlock] = useState<JSX.Element | null>(null);
  let response;
  const [errorResponse, setErrorResponse] = useState('Server Error:');

  const getSchema = () => {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(SCHEMA_REQUEST),
    });
  };

  const getFieldType = (obj) => {
    const typeArr = [];
    const getField = (obj) => {
      typeArr.push(obj.kind);
      if (obj.name) return obj.name;
      const newObj = structuredClone(obj.ofType);
      return getField(newObj);
    };
    return { name: getField(obj), typeArr: typeArr };
  };

  const setFields = (field) => {
    if (field === 'Docs') {
      BTN_STACK.push('Docs');
      TITLE_STACK.push('Query');
      setDocsViewBlock(
        <>
          <div className={style['docs-title']}>Docs</div>
          <div className={style['docs-description']}>
            A GraphQL schema provides a root type for each kind of operation.
          </div>
          <div className={style['docs-description']}>Root Types</div>
          <div className={style['field-block']}>
            <div className={style.field}>query</div>
            <div className={style.bracket}>:</div>
            <div
              className={style['field-type']}
              onClick={() => {
                setFields('Query');
              }}
            >
              Query
            </div>
          </div>
        </>,
      );
    }
    if (field !== 'Docs') {
      const btn = BTN_STACK[BTN_STACK.length - 1];
      const title = TITLE_STACK[TITLE_STACK.length - 1];

      const fields = response.data.__schema.types.filter((f) => f.name === field)[0].fields;
      if (fields !== null) {
        const fieldsArr = fields.map((elem) => {
          const argsArr = elem.args.map((el, index) => {
            return (
              <div className={style.args} key={nanoid()}>
                {el.name}
                <div className={style.bracket}>:</div>
                <div
                  className={style['field-type']}
                  onClick={() => {
                    TITLE_STACK.push(getFieldType(el.type).name);
                    BTN_STACK.push(TITLE_STACK[TITLE_STACK.length - 2]);
                    setFields(getFieldType(el.type).name);
                  }}
                >
                  {getFieldType(el.type).typeArr.reduce(
                    function (accumulator, item) {
                      if (item === 'NON_NULL')
                        return <div className={style['field-type']}>{accumulator}!</div>;
                      if (item === 'LIST')
                        return <div className={style['field-type']}>[{accumulator}]</div>;
                      return accumulator;
                    },
                    [getFieldType(el.type).name],
                  )}
                  {index !== elem.args.length - 1 ? ', ' : ''}
                </div>
              </div>
            );
          });
          return (
            <div className={style['docs-body']} key={nanoid()}>
              <div className={style['field-block']}>
                <div className={style.field}>{elem.name}</div>
                {field === 'Query' ? (
                  <div className={style.bracket}>(</div>
                ) : (
                  <div className={style.bracket}></div>
                )}
                <div className={style.args}>
                  {argsArr}
                  {field === 'Query' ? (
                    <div className={style.bracket}>):</div>
                  ) : (
                    <div className={style.bracket}>:</div>
                  )}
                  <div
                    className={style['field-type']}
                    onClick={() => {
                      TITLE_STACK.push(getFieldType(elem.type).name);
                      BTN_STACK.push(TITLE_STACK[TITLE_STACK.length - 2]);
                      setFields(getFieldType(elem.type).name);
                    }}
                  >
                    {getFieldType(elem.type).name}
                  </div>
                </div>
              </div>
              <div className={style['field-description']}>{elem.description}</div>
            </div>
          );
        });
        setDocsViewBlock(
          <div>
            <button
              onClick={() => {
                BTN_STACK.pop();
                TITLE_STACK.pop();
                setFields(btn);
              }}
              key={nanoid()}
            >
              {btn}
            </button>
            <div className={style['docs-title']} key={nanoid()}>
              {title}
            </div>
            {fieldsArr}
          </div>,
        );
      }
      if (fields === null) {
        setDocsViewBlock(
          <>
            <button
              onClick={() => {
                BTN_STACK.pop();
                TITLE_STACK.pop();
                setFields(btn);
              }}
            >
              {btn}
            </button>
            <div className={style['docs-title']} key={nanoid()}>
              {title}
            </div>
            <div className={style['docs-body']}>
              {response.data.__schema.types.filter((f) => f.name === field)[0].description}
            </div>
          </>,
        );
      }
    }
  };

  useEffect(() => {
    console.log('useEffect');
    getSchema()
      .then(async (res) => {
        if (res.ok) {
          res.json().then((parsedRes) => {
            response = parsedRes;
            setFields('Docs');
          });
        } else {
          setErrorResponse(`Server Error: ${res.status}`);
        }
      })
      .catch((err) => {
        setErrorResponse(err.message);
      });
  }, []);

  return <div>{docsViewBlock ? <div>{docsViewBlock}</div> : <div>{errorResponse}</div>}</div>;
};
export default Docs;
