import './index.css';

const Navbar = (props) => {
  const { children } = props;
  return (
    <header className="header">
      navbar
      {children}
    </header>
  );
};

export default Navbar;
