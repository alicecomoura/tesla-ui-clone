import React from 'react';

export interface CarModel {
  modelName: string;
  overlayNode: React.ReactNode; // cada modelo necessita de um overlay
  sectionRef: React.RefObject<HTMLElement>; // cada modelo reflete em uma nova section
}

export interface ModelsContext {
  wrapperRef: React.RefObject<HTMLElement>; // referência de um elemento HTML, neste caso o ModelWrapper
  registeredModels: CarModel[]; // o que é registrado na Context API quando o usuário inicia a página
  registerModel: (model: CarModel) => void; // para registrar na tela, a função recebe um modelo do tipo CarModel
  unregisterModel: (modelName: string) => void; // quando o elemento será desmontado da tela, a função recebe um modelo do tipo CarModel
  getModelByName: (modelName: string) => CarModel | null; // recebe o carro pelo nome e retorna o modelo, caso não ache é nulo
}

export default React.createContext<ModelsContext>({} as ModelsContext);
