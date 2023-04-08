import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import styles from './cards.module.css';

const cardsItemVariants = {
  start: {
    scaleY: 0,
    opacity: 0,
    zIndex: -1
  },
  end: {
    scaleY: 1,
    opacity: 1,
    zIndex: 1
  }
};

export default function CardsItems({ name, index, id, deleteCard }) {
  const followX = useMotionValue(0);
  let deleteTrashHold = 300;
  const xInput = [-deleteTrashHold, 0, deleteTrashHold];

  const background = useTransform(followX, xInput, [
    'linear-gradient(180deg, #FF0000 0%, #FF0000 100%)',
    'linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)',
    'linear-gradient(180deg, #FF0000 0%, #FF0000 100%)'
  ]);

  let isDrag = false;

  const navigate = useNavigate();

  const dragstartHandler = () => {
    console.log('dragstartHandler');

    isDrag = true;
  };

  const dragEndHandler = (_, info) => {
    console.log('>>>>', info);
    if (Math.abs(info.offset.x) >= deleteTrashHold) {
      deleteCard(id);
    }
    setTimeout(() => {
      isDrag = false;
    });
  };

  const navigateMouseUpHandler = () => {
    console.log('navigateMouseUpHandler', { isDrag });
    if (!isDrag) {
      navigate(`/cards/${id}`);
    }
  };

  return (
    <motion.div
      to={`/cards/${id}`}
      className="list-group-item list-group-item-action d-flex justify-content-between p-3 my-1"
      onMouseUp={navigateMouseUpHandler}
      drag="x"
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      variants={cardsItemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onDragEnd={dragEndHandler}
      onDragStart={dragstartHandler}
      exit={{
        start: {
          scaleY: 0,
          opacity: 0,
          zIndex: -1
        }
      }}
      style={{ x: followX, background, width: '300px', borderRadius: '10px' }}
    >
      <span>
        {index + 1}. {name}
      </span>
    </motion.div>
  );
}
