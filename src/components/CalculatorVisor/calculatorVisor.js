import "./calculatorVisor.css";

export default function CalculatorVisor(props) {
  return (
    <div className="Calculator-Visor">
      <div className="Calculator-Visor-Exp">{props.expressao}</div>
      <div className="Calculator-Visor-Dgt">{props.state === "" ? props.expressao[(props.expressao.length-1)] : props.state}</div>
    </div>
  );
}
