import React, { useCallback, useRef, useState } from 'react';

import ModelsContext, { CarModel } from '../models-context';
import { ModelOverlay } from '../model-overlay/model-overlay';

import { Container, OverlayRoot } from './styles';

interface ModelsWrapperProps {
  children?: React.ReactNode;
}

const ModelsWrapper = ({ children }: ModelsWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null); // a principio sua referência é nula

  // array de modelos de carros
  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([]);

  // recebe useCallback que é uma função que vai ser somente recalculada caso ocorra uma mudança dentro do array de dependência
  const registerModel = useCallback((model: CarModel) => {
    // registra o modelo dentro do estado, pegando os que já existe e adicionando novos
    setRegisteredModels((state) => [...state, model]);
  }, []);

  // recebe useCallback que é uma função que vai ser somente recalculada caso ocorra uma mudança dentro do array de dependência
  const unregisterModel = useCallback((modelName: string) => {
    // remove do estado por meio de um filtro
    // se o modelo tiver o nome diferente do modelo que quer ser retirado, esse modelo persiste dentro do array registeredModels
    // caso ao contrário, filtra e remove esse modelo do array.
    setRegisteredModels((state) =>
      state.filter((model) => model.modelName !== modelName)
    );
  }, []);

  // novamente como é uma função que só vai ser recalculada quando necessário, portanto o useCallback
  // pega o modelo pelo nome e returna o modelo ou nulo
  // pega o modelo de dentro de registeredModels que tenha o nome igual ao nome passado por parametro, modelName
  const getModelByName = useCallback(
    (modelName: string) => {
      return (
        registeredModels.find((item) => item.modelName === modelName) || null
      );
    },
    [registeredModels]
  );

  // raiz de todos os overlays
  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>
        <OverlayRoot>
          {registeredModels.map((item) => (
            <ModelOverlay key={item.modelName} model={item}>
              {item.overlayNode}
            </ModelOverlay>
          ))}
        </OverlayRoot>

        {children}
      </Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
