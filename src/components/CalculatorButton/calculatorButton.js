import "./calculatorButton.css";

export default function CalculatorButton(props) {
  const re = /(^[+=/*]|([+=/*]{2}|([-+=][+=/*-])$))/;
  const re2= /([+=/*-]{3})/ 
  const handleClick = () => {
    if (re.test(props.expressao + props.value)) {
      if (re2.test(props.expressao + props.value)){
        props.setExpressao(props.expressao.substr(0, props.expressao.length - 2));        
      } else {
        props.setExpressao(props.expressao.substr(0, props.expressao.length - 1));
      }
    }
    props.setExpressao((preValue) => preValue + props.value);
  };

  return (
    <button
      className={"Calculator-Button " + props.dicionario[props.value]}
      style={{ gridArea: props.dicionario[props.value] }}
      onClick={handleClick}
    >
      {props.value}
    </button>
  );
}
