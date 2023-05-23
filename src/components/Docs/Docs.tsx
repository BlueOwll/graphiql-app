import { useEffect, useState } from 'react';
import style from './Docs.module.scss';

const Docs = () => {
  const [response, setResponse] = useState(null);
  //
  // const query = `{
  //     __schema {
  //       queryType { name }
  //       mutationType { name }
  //       subscriptionType { name }
  //       types {
  //               name
  //               description
  //               fields(includeDeprecated: true) {
  //                                               name
  //                                               description
  //                                               args {
  //                                                     name
  //                                                     description
  //                                                     defaultValue
  //                                               }
  //                                               type {
  //                                                     kind
  //                                                     name
  //                                               }
  //               }
  //       }
  //     }
  //   }`;
  const query = {"query":"\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ","operationName":"IntrospectionQuery"};

  const url = 'https://rickandmortyapi.com/graphql';

  const getSchema = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(query),
    }).then(res => res.json());
  };

  const getFieldType = (obj) => {
    if (obj.name) return obj.name;
    const newObj = structuredClone(obj.ofType);
    return getFieldType(newObj);
  }



  useEffect(() => {
    getSchema().then(res => {
      const arr = res.data.__schema.types[0].fields;
      console.log('arr = ', arr);
      console.log('res.data.__schema = ', res.data);
      setResponse(arr.map(elem => {
        const argsArr = elem.args.map((el, index) => {
          return (<div>{el.name}
            <div className={style.bracket}>:</div>
            {getFieldType(el.type)}{index !== elem.args.length-1 ? ',' : ''}
          </div>);
        });
        return (<div className={style['field-block']}>
          <div className={style.field}>{elem.name}</div>
          <div className={style.bracket}>(</div>
          <div className={style.args}>
            {argsArr}
            <div className={style.bracket}>):</div>
            {getFieldType(elem.type)}
          </div>
          <div>{elem.description}</div>
        </div>);
      }));
    });
  }, []);

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
