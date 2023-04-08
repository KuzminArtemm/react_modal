import Loader from '../Loader/Loader';

const withLoader = (WrappedComponent) =>
  function ({ loading, ...rest }) {
    if (loading) return <Loader />;
    return <WrappedComponent {...rest} />;
  };

export default withLoader;
