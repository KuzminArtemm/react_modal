import { Link } from 'react-router-dom';

import styles from './cards.module.css';

export default function CardsItems({ name, index, id }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Link
        to={`/cards/${id}`}
        className="list-group-item d-flex justify-content-start my-1"
        style={{
          width: '300px',
          borderRadius: '5px',
          backgroundColor: 'whitesmoke'
        }}
        aria-current="true"
      >
        <span>
          {index + 1}. {name}
        </span>
      </Link>
    </div>
  );
}
