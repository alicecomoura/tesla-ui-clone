import { useCallback, useContext, useEffect } from 'react';

import ModelsContext from './models-context';

// quando o hook useModel for destruido, significa que o modelo também foi retirado de dentro do array registeredModels.
export const useModel = (modelName: string) => {
  const { registerModel, unregisterModel, getModelByName } =
    useContext(ModelsContext);

  // por isso o retorno da função que descadrasta/destroi o model por meio do modelName
  useEffect(() => unregisterModel(modelName), [modelName, unregisterModel]);

  // a função getModel retorna o modelo já especificado quando chamou o hook
  const getModel = useCallback(
    () => getModelByName(modelName),
    [getModelByName, modelName]
  );

  return { registerModel, getModel };
};
