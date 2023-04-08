import styles from './loader.module.css';

const Loader = () => {
  return <div class={styles['lds-hourglass']}></div>;
};

export default Loader;
