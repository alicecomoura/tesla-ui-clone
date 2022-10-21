import { useTransform } from 'framer-motion';
import { ReactNode, useCallback, useLayoutEffect, useState } from 'react';
import { CarModel } from '../models-context';

import { useWrapperScroll } from '../useWrapperScroll';

import { Container } from './styles';

interface ModelOverlayProps {
  children: ReactNode;
  model: CarModel;
}

type SectionDimensions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>;

export const ModelOverlay = ({ children, model }: ModelOverlayProps) => {
  const getSectionDimensions = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight,
    } as SectionDimensions;
  }, [model.sectionRef]);

  const [dimensions, setDimensions] = useState<SectionDimensions>(
    getSectionDimensions()
  );

  // dispara toda vez de maneira sincrona apos a mutação na DOM,
  // ou seja, vai trabalhar muito melhor com a responsividade do que o useEffect
  useLayoutEffect(() => {
    const onResize = () => {
      // solititação ao browser um quadro de animação com a api animation frame

      // quando o usuario mudar o tamanho da tela, atualiza as dimensões
      // do ovelay passando as função que obtem o tamanho das dimensões
      // const data = getSectionDimensions();
      // console.log(data);
      window.requestAnimationFrame(() => setDimensions(getSectionDimensions()));
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [getSectionDimensions]);

  const { scrollY } = useWrapperScroll();
  // calculo do tanto que o usuario scrolou - o tanto que a div precisa de scroll para chegar ao topo dela
  const sectionScrollProgresss = useTransform(
    scrollY,
    (y) => (y - dimensions.offsetTop) / dimensions.offsetHeight
  );

  const opacity = useTransform(
    sectionScrollProgresss,
    [-0.42, -0.05, 0.05, 0.42],
    [0, 1, 1, 0]
  );

  const pointerEvents = useTransform(opacity, (value) =>
    value > 0 ? 'auto' : 'none'
  );

  return <Container style={{ opacity, pointerEvents }}>{children}</Container>;
};
