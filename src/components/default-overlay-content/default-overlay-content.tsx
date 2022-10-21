import { Container, Heading, Buttons } from './styles';

interface DefaultOverlayContentProps {
  label: string;
  description: string;
  buttonText: string;
}

export const DefaultOverlayContent = ({
  label,
  description,
  buttonText,
}: DefaultOverlayContentProps) => {
  return (
    <Container>
      <Heading>
        <h1>{label}</h1>
        <h2>{description}</h2>
      </Heading>

      <Buttons>
        <button>Custom Order</button>
        <button className="white">{buttonText}</button>
      </Buttons>
    </Container>
  );
};
