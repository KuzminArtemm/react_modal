import { useContext } from 'react';

import { ContextCards } from '../CardsContextProvider';
import CardsItems from '../CardsItems';

export default function CardsList() {
  const { cards } = useContext(ContextCards);

  return (
    <div>
      <div className="list-group mt-4">
        {cards.map((card, i) => {
          return <CardsItems key={card.id} index={i} {...card} />;
        })}
      </div>
    </div>
  );
}
