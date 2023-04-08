import { useContext, useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './search.module.css';
import { ContextCards } from '../CardsContextProvider';

export default function SearchCardsForm() {
  const { updateCards } = useContext(ContextCards);
  let isMount = useRef(false);
  const [search, setSearch] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const parsedQuery = JSON.parse(searchParams.get('filter'));
    //isMount.current = true;
    if (parsedQuery && parsedQuery.searchInput) {
      setSearch(parsedQuery.searchInput);
    }
  }, []);

  useEffect(() => {
    if (isMount.current) {
      const filter = {
        searchInput: search
      };

      const prepareFilterForURL = encodeURIComponent(JSON.stringify(filter));

      const query = `filter=${prepareFilterForURL}`;

      setSearchParams(query);

      fetch(`http://localhost:3001/api/v1/cards/?${query}`)
        .then((response) => response.json())
        .then((data) => {
          updateCards((prev) => data);
        });
    } else {
      isMount.current = true;
    }
  }, [search]);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form className="d-flex justify-content-center">
      <div className={`mb-3 ${styles.wrapper}`}>
        <input
          onChange={changeHandler}
          value={search}
          type="text"
          name="name"
          placeholder="search..."
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
    </form>
  );
}
