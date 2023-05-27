export type VarObject = {
  key: string;
  value: string;
  [key: string]: string | undefined;
};
export type VariablesProps = {
  setVariables: (data: VarObject[]) => void;
  variables: VarObject[] | [];
};
