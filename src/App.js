import { useEffect, useState } from "react";
import "./App.css";

// eval()
// handle antes do set
// https://stackoverflow.com/questions/2295657/return-positions-of-a-regex-match-in-javascript

function App() {
  const [expressao, setExpressao] = useState("");
  const [expressaoLimpa, setExpressaoLimpa] = useState("");

  const re = /(^[+=/]|([-+=/x]{2}$))/;

  useEffect(() => {
    if (re.test(expressao)) {
      setExpressao(
        expressao.substr(0, expressao.length - 2) + expressao.substr(-1)
      );
    }

    switch (expressao.substr(-1)) {
      case "C":
        setExpressao("");
        break;
      case "=":
        CalculatorResult();
        break;
      default:
        setExpressaoLimpa(expressao);
        break;
    }
  }, [expressao]);

  const CalculatorResult = () => {
    let arrayExp = expressaoLimpa.replaceAll(/([-+=/x])/g, " $1 ").split(" "); // ['1325', '+', '4654'];
    let rgxDivMult = /([/x])/;

    do {
      var match = rgxDivMult.exec(arrayExp);
      if (match) {
        arrayExp.splice(match.index-1, match.index) // remove os números
        arrayExp.splice(match.index+1, match.index+2)
      } 
    } while (match);
  };

  const CalculatorVisor = (props) => {
    return (
      <div className="Calculator-Visor">
        <div className="Calculator-Visor-Exp">{props.expressao}</div>
        <div className="Calculator-Visor-Dgt">{props.expressao.substr(-1)}</div>
      </div>
    );
  };

  const CalculatorButton = (props) => {
    return (
      <button
        className={"Calculator-Button " + dicionario[props.value]}
        style={{ gridArea: dicionario[props.value] }}
        onClick={() => {
          props.setExpressao((preValue) => preValue + props.value);
        }}
      >
        {props.value}
      </button>
    );
  };

  const dicionario = {
    AC: "AC",
    "/": "DIV",
    '*': "x",
    7: "SETE",
    8: "OITO",
    9: "NOVE",
    "-": "MENOS",
    4: "QUATRO",
    5: "CINCO",
    6: "SEIS",
    "+": "MAIS",
    1: "UM",
    2: "DOIS",
    3: "TRES",
    "=": "IGUAL",
    0: "ZERO",
    ".": "PONTO",
  };

  return (
    <div className="App">
      <div className="Calculator-Container">
        <CalculatorVisor expressao={expressaoLimpa}></CalculatorVisor>
        {[
          "AC",
          "/",
          "*",
          "7",
          "8",
          "9",
          "-",
          "4",
          "5",
          "6",
          "+",
          "1",
          "2",
          "3",
          "=",
          "0",
          ".",
        ].map((value) => {
          return (
            <CalculatorButton
              key={value}
              dicionario={dicionario}
              value={value}
              setExpressao={setExpressao}
            ></CalculatorButton>
          );
        })}
      </div>
    </div>
  );
}

export default App;
