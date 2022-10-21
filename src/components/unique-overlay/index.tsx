import { useTransform } from 'framer-motion';
import { useWrapperScroll } from '../models/useWrapperScroll';
import { Container, Header, Logo, Burguer, Footer } from './styles';

export const UniqueOverlay = () => {
  const { scrollYProgress } = useWrapperScroll();

  // animação do footer
  const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  return (
    <Container>
      <Header>
        <Logo />
        <Burguer />
      </Header>

      <Footer style={{ opacity }}>
        <ul>
          <li>
            <a href="#">Tesla UI Clone</a>
          </li>
          <li>
            <a href="#">made with 💛 by Alice</a>
          </li>
          <li>
            <a href="#">credits Guilherme Rodz</a>
          </li>
        </ul>
      </Footer>
    </Container>
  );
};
