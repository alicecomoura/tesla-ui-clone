import { useEffect, useRef } from 'react';

import { useModel } from '../useModel';

import { Container } from './styles';

interface ModelSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  modelName: string;
  overlayNode: React.ReactNode;
}

const ModelSection = ({
  modelName,
  overlayNode,
  children,
  ...props
}: ModelSectionProps) => {
  // registra o modelo assim que disponivel
  const { registerModel } = useModel(modelName);

  // inicia a referencia como null, a principio
  const sectionRef = useRef<HTMLDivElement>(null);

  // quando a função dentro do useEffect for disparada, registra o modelo na hora
  useEffect(() => {
    // verificação se a sectionRef existe, se sim
    // cadastra o modelo com o nome, com o overlay e a referencia da section
    if (sectionRef?.current) {
      registerModel({
        modelName,
        overlayNode,
        sectionRef: sectionRef,
      });
    }
  }, [modelName, overlayNode, registerModel]);

  return (
    <Container ref={sectionRef} {...props}>
      {children}
    </Container>
  );
};

export default ModelSection;
