import { useContext, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

import ModelsContext from './models-context';

export const useWrapperScroll = () => {
  const { wrapperRef } = useContext(ModelsContext);

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    scrollY.onChange((scrollY) => {
      console.log({ scrollY });
    });
    scrollYProgress.onChange((scrollYProgress) => {
      console.log({ scrollYProgress });
    });
  }, [scrollY, scrollYProgress]);

  useEffect(() => {
    const element = wrapperRef.current;

    if (element) {
      const updateScrollValue = () => {
        const { scrollTop, scrollHeight, offsetHeight } = element;

        const fullScroll = scrollHeight - offsetHeight;

        scrollY.set(scrollTop); // quantidade de px que o usuário esyá scrolando
        scrollYProgress.set(scrollTop / fullScroll); // porcentagem/progresso que o usuário fez no tamanho da tela 0 - 1 (%)
      };

      element.addEventListener('scroll', updateScrollValue);

      return () => element.removeEventListener('scroll', updateScrollValue);
    }
  }, [scrollY, scrollYProgress, wrapperRef]);

  return { scrollY, scrollYProgress };
};
