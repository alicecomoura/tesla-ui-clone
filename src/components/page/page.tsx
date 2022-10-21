import { DefaultOverlayContent } from '../default-overlay-content/default-overlay-content';
import { ModelsWrapper, ModelSection } from '../models/index';
import { UniqueOverlay } from '../unique-overlay';

import { Container, Spacer } from './styles';

export const Page = () => {
  const model = [
    {
      modelName: 'Model One',
      buttonText: 'Model One',
    },
    {
      modelName: 'Model Two',
      buttonText: 'Model Two',
    },
    {
      modelName: 'Model Three',
      buttonText: 'Model Three',
    },
    {
      modelName: 'Model Four',
      buttonText: 'Model Four',
    },
    {
      modelName: 'Model Five',
      buttonText: 'Model Five',
    },
    {
      modelName: 'Model Six',
      buttonText: 'Model Six',
    },
    {
      modelName: 'Model Seven',
      buttonText: 'Model Seven',
    },
  ];

  return (
    <Container>
      <ModelsWrapper>
        <div>
          {model.map((modelName) => (
            <ModelSection
              key={modelName.modelName}
              className="colored"
              modelName={modelName.modelName}
              overlayNode={
                <DefaultOverlayContent
                  label={modelName.modelName}
                  description="Order Online for Delivery"
                  buttonText={modelName.buttonText}
                />
              }
            />
          ))}
        </div>
        <Spacer />
        <UniqueOverlay />
      </ModelsWrapper>
    </Container>
  );
};
