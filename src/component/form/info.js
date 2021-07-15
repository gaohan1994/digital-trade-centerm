import './form.css';

const FormInfo = (props) => {
  const { forms } = props;

  return (
    <section className="info-box">
      {forms.map((item) => {
        return (
          <div className="info-item" key={item.title}>
            <span className="info-title">{item.title}</span>
            <span className="info-value">{item.value}</span>
          </div>
        );
      })}
    </section>
  );
};

export default FormInfo;
