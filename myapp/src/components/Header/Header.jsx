import CustomLink from '../CustomHooks/CustomLink';

const Header = () => {
  return (
    <div className="card text-center d-flex">
      <div className="card-header py-3">
        <ul className="nav nav-tabs card-header-tabs d-flex justify-content-center">
          <li className="nav-item">
            <CustomLink to="/" aria-current="true">
              Main
            </CustomLink>
          </li>
          <li className="nav-item">
            <CustomLink to="/cards">Cards</CustomLink>
          </li>
          <li className="nav-item">
            <CustomLink to="/description" aria-current="true">
              Description
            </CustomLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
