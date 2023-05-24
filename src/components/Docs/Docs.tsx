import { useEffect, useState } from 'react';
import style from './Docs.module.scss';
import { Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Docs = () => {
    const [response, setResponse] = useState(null);
    const btnStack = [];
    const titleStack = [];

    const schema = {
      'query': '\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ',
      'operationName': 'IntrospectionQuery',
    };

    const url = 'https://rickandmortyapi.com/graphql';

    const getSchema = () => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(schema),
      }).then(res => res.json());
    };

    // const getField = (obj) => {
    //   const typeArr = [];
    //
    //   if (obj.name) return { name: obj.name,  };
    //   const newObj = structuredClone(obj.ofType);
    //   return getField(newObj);
    //
    // };

  const getFieldType = (obj) => {
    const typeArr = [];
    const getField = (obj) => {
      typeArr.push(obj.kind);
      if (obj.name) return obj.name;
      const newObj = structuredClone(obj.ofType);
      return getField(newObj);
    };
    // console.log('typeArr', typeArr)
    return { name: getField(obj), typeArr: typeArr };
  };

    const setFields = (field) => {
      console.log('field', field);
      if (field === 'Docs') {
        btnStack.push('Docs');
        titleStack.push('Query');
        console.log('titleStack 0', titleStack);
        console.log('btnStack 0', btnStack);
        setResponse(<>
            <div className={style['docs-title']}>Docs</div>
            <div className={style['docs-description']}>A GraphQL schema provides a root type for each kind of operation.</div>
            <div className={style['docs-description']}>Root Types</div>
            <div className={style['field-block']}>
              <div className={style.field}>query</div>
              <div className={style.bracket}>:</div>
              <div className={style['field-type']} onClick={() => {
                setFields('Query');
              }}>
                Query
              </div>
            </div>
          </>,
        );
      }
      if (field !== 'Docs') {
        getSchema().then(res => {
          console.log('res.data.__schema = ', res.data.__schema);
          const fields = res.data.__schema.types.filter(f => f.name === field)[0].fields;
          // console.log('fields = ', fields);
          if (fields !== null) {
            const fieldsArr = fields.map(elem => {
              const argsArr = elem.args.map((el, index) => {
                return (<div className={style.args}>{el.name}
                  <div className={style.bracket}>:</div>
                  <div className={style['field-type']} onClick={()=> {
                    setFields(getFieldType(el.type).name);

                    titleStack.push(getFieldType(el.type).name);
                    btnStack.push(titleStack[titleStack.length-2]);

                    console.log('titleStack 1', titleStack);
                    console.log('btnStack 1', btnStack);
                    console.log('getField(elem.type)+++++', getFieldType(elem.type));


                  }}>
                    {
                      getFieldType(el.type).typeArr.reduce(function(accumulator, item, index, array) {
                        if (item === 'NON_NULL') return <div className={style['field-type']} >{accumulator}!</div>;
                        if (item === 'LIST') return <div className={style['field-type']} >[{accumulator}]</div>;
                        return accumulator;
                      }, [getFieldType(el.type).name])}
                    {index !== elem.args.length - 1 ? ', ' : ''}
                  </div>
                </div>);
              });
              return (
                <div className={style['docs-body']}>
                  <div className={style['field-block']}>
                    <div className={style.field}>{elem.name}</div>
                    {field === 'Query' ? <div className={style.bracket}>(</div> : <div className={style.bracket}></div>}
                    <div className={style.args}>
                      {argsArr}
                      {field === 'Query' ? <div className={style.bracket}>):</div> : <div className={style.bracket}>:</div>}
                      <div className={style['field-type']} onClick={()=> {
                        setFields(getFieldType(elem.type).name);

                        titleStack.push(getFieldType(elem.type).name);
                        btnStack.push(titleStack[titleStack.length-2]);

                        console.log('titleStack 2', titleStack);
                        console.log('btnStack 2', btnStack);


                      }}>
                        {getFieldType(elem.type).name}
                      </div>
                    </div>
                  </div>
                  <div className={style['field-description']}>{elem.description}</div>
                </div>

              );
            });
            setResponse(<>
              <button onClick={() => {

                console.log('titleStack 3', titleStack);
                console.log('btnStack 3', btnStack);
                console.log('btnStack[btnStack.length-1] 3', btnStack[btnStack.length-1]);
                setFields(btnStack[btnStack.length-1]);
                btnStack.pop();
                titleStack.pop();
              }}>{btnStack[btnStack.length-1]}</button>
              <div className={style['docs-title']}>{titleStack[titleStack.length-1]}</div>
              {fieldsArr}
            </>);
          }
          if (fields === null) {
            setResponse(<>
              <button onClick={() => {

                console.log('titleStack 4', titleStack);
                console.log('btnStack 4', btnStack);
                console.log('btnStack[btnStack.length-1] 4', btnStack[btnStack.length-1]);
                setFields(btnStack[btnStack.length-1]);

                btnStack.pop();
                titleStack.pop();


              }}>{btnStack[btnStack.length-1]}</button>
              <div className={style['docs-title']}>{titleStack[titleStack.length-1]}</div>
              <div className={style['docs-body']}>{res.data.__schema.types.filter(f => f.name === field)[0].description}</div>
            </>);
          }


        });
      }
    };
    // getSchema().then(res => {
    //   const fields = res.data.__schema.types.filter(f => f.name === field)[0].fields;
    //   console.log('arr = ', fields);
    //   console.log('res.data.__schema = ', res.data);
    //   setResponse(fields.map(elem => {
    //     const argsArr = elem.args.map((el, index) => {
    //       return (<div className={style.args}>{el.name}
    //         <div className={style.bracket}>:</div>
    //         <div className={style['field-type']}>
    //           {getFieldType(el.type)}{index !== elem.args.length - 1 ? ',' : ''}
    //         </div>
    //       </div>);
    //     });
    //     return (<>
    //         <div>{field}</div>
    //         <div className={style['field-block']}>
    //           <div className={style.field}>{elem.name}</div>
    //           <div className={style.bracket}>(</div>
    //           <div className={style.args}>
    //             {argsArr}
    //             <div className={style.bracket}>):</div>
    //             <div className={style['field-type']}>
    //               {getFieldType(elem.type)}
    //             </div>
    //           </div>
    //         </div>
    //         <div className={style['field-description']}>{elem.description}</div>
    //       </>
    //     );
    //   }));
    // });


    useEffect(() => {
      setFields('Docs');
    }, []);

    return (
      <div>
        {response ? (
          <div>
            {response}
          </div>
        ) : (
          <div></div>)}
      </div>
    );
  }
;

export default Docs;
