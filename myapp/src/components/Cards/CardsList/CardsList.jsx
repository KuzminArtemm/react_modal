import { useContext } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { ContextCards } from '../CardsContextProvider';
import CardsItems from '../CardsItems';

const cardsListVariants = {
  start: {
    opacity: 0
  },
  end: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delayChildren: 0.2,
      staggerChildren: 0.2,
      duration: 0.1
    }
  }
};

export default function CardsList() {
  const { cards, deleteCard } = useContext(ContextCards);

  return (
    <div className="d-flex justify-content-center">
      {cards.length ? (
        <motion.div
          variants={cardsListVariants}
          initial="start"
          animate="end"
          className="list-group mt-4"
        >
          <AnimatePresence>
            {cards.map((card, i) => {
              return (
                <CardsItems
                  deleteCard={deleteCard}
                  key={card.id}
                  index={i}
                  {...card}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </div>
  );
}
