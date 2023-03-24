import { Link } from 'react-router-dom';

import styles from './cards.module.css';

export default function CardsItems({ name, index, id }) {
  return (
    <li className="list-group-item">
      <Link
        to={`/cards/${id}`}
        className="list-group-item d-flex justify-content-start px-1"
        aria-current="true"
      >
        <span>
          {index + 1}. {name}
        </span>
      </Link>
    </li>
  );
}
