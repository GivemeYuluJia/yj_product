import react from 'react';

const About = (props: any) => {
  const { info } = props;
  const renderContent = () => {
    return Object.keys(info).map((item) =>
      item === 'about' ? (
        <p key={item}>{info[item]}</p>
      ) : (
        <div key={item}>
          <h3>{item}</h3>
          <p>{info[item]}</p>
        </div>
      ),
    );
  };
  return <>{renderContent()}</>;
};
export default About;
