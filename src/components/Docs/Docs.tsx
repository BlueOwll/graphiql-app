import { ReactNode, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import style from './Docs.module.scss';
import { Button } from '@mui/material';

interface Response {
  data: Data;
}

interface Data {
  __schema: Schema;
}

interface Schema {
  queryType: QueryType;
  mutationType: null;
  subscriptionType: null;
  types: TypeElement[];
  directives: Directive[];
}

interface Directive {
  name: string;
  description: string;
  locations: string[];
  args: Arg[];
}

interface Arg {
  name: string;
  description: null | string;
  type: OfTypeClass;
  defaultValue: null | string;
}

interface OfTypeClass {
  kind: Kind;
  name: null | string;
  ofType: OfTypeClass | null;
}

enum Kind {
  Enum = 'ENUM',
  InputObject = 'INPUT_OBJECT',
  List = 'LIST',
  NonNull = 'NON_NULL',
  Object = 'OBJECT',
  Scalar = 'SCALAR',
}

interface QueryType {
  name: string;
}

interface TypeElement {
  kind: Kind;
  name: string;
  description: string;
  fields: Field[] | null;
  inputFields: Arg[] | null;
  interfaces: [] | null;
  enumValues: EnumValue[] | null;
  possibleTypes: null;
}

interface EnumValue {
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: null;
}

interface Field {
  name: string;
  description: null | string;
  args: Arg[];
  type: OfTypeClass;
  isDeprecated: boolean;
  deprecationReason: null;
}

const Docs = () => {
  const BTN_STACK: string[] = [];
  const TITLE_STACK: string[] = [];
  const URL = 'https://rickandmortyapi.com/graphql';
  const SCHEMA_REQUEST = {
    query:
      '\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
    operationName: 'IntrospectionQuery',
  };

  const [docsViewBlock, setDocsViewBlock] = useState<JSX.Element | null>(null);
  let response: Response;
  const [errorResponse, setErrorResponse] = useState<string>('');

  const getSchema = () => {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(SCHEMA_REQUEST),
    });
  };

  const getFieldType = (obj: OfTypeClass): { name: string; typeArr: string[] } => {
    const typeArr: string[] = [];
    const getField = (obj: OfTypeClass): string => {
      typeArr.push(obj.kind);
      if (obj.name) return obj.name;
      const newObj = structuredClone(obj.ofType);
      return getField(newObj as OfTypeClass);
    };
    return { name: getField(obj), typeArr: typeArr };
  };

  const setFields = (field: string) => {
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
                  {getFieldType(el.type).typeArr.reduce<ReactNode>(
                    function (accumulator: ReactNode, item: string): ReactNode {
                      if (item === 'NON_NULL')
                        return <div className={style['field-type']}>{accumulator}!</div>;
                      if (item === 'LIST')
                        return <div className={style['field-type']}>[{accumulator}]</div>;
                      return <div>{accumulator}</div>;
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
            <Button
              onClick={() => {
                BTN_STACK.pop();
                TITLE_STACK.pop();
                setFields(btn);
              }}
              key={nanoid()}
            >
              {'< '} {btn}
            </Button>
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
