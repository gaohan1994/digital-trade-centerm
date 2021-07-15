import './index.css';

const GhButton = (props) => {
  const { title, type = 'primary', onClick, ...rest } = props;
  return (
    <div className="gh-button" type={type} onClick={onClick} {...rest}>
      {title}
      {props.children}
    </div>
  );
};

export default GhButton;
