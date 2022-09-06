import { useEffect, useState } from "react";
import "./App.css";
import CalculatorVisor from "./components/CalculatorVisor/calculatorVisor";
import CalculatorButton from "./components/CalculatorButton/calculatorButton";

// eval()
// handle antes do set
// https://stackoverflow.com/questions/2295657/return-positions-of-a-regex-match-in-javascript

function App() {
  const [expressao, setExpressao] = useState("");
  const [expressaoLimpa, setExpressaoLimpa] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    console.log(expressaoLimpa);
    switch (expressao[expressao.length - 1]) {
      case "C":
        setExpressao("");
        setState("");
        break;
      case "=":
        if (!/([/*+-]$)/.test(expressaoLimpa)) {
          CalculatorResult(expressaoLimpa);
        }
        break;
      case "/":
      case "*":
      case "-":
      case "+":
        if (state !== "") {
          let tempExpressao = state + expressao[expressao.length - 1];
          setState("");
          console.log("temp: " + tempExpressao);
          setExpressao(tempExpressao);
        }
        setExpressaoLimpa(expressao);
        break;
      default:
        if (state !== "") {
          setExpressao(expressao[expressao.length - 1]);
          setState("");
        }
        setExpressaoLimpa(expressao);
        break;
    }
  }, [expressao]);

  const CalculatorResult = (termo) => {
    let arrayExp = termo
      .replaceAll("+", " ")
      .replaceAll(/([/*]|-[0-9]+)/g, " $1 ")
      .replaceAll("  ", " ")
      .split(" "); // separa os termos em items da array

    while (arrayExp.indexOf("") !== -1) {
      // remove todos os items vazios da array
      arrayExp.splice(arrayExp.indexOf(""), 1);
    }

    let hasPlusOrDiv =
      arrayExp.indexOf("*") !== -1 || arrayExp.indexOf("/") !== -1;

    while (hasPlusOrDiv) {
      let tempIndex =
        arrayExp.indexOf("*") !== -1
          ? arrayExp.indexOf("*")
          : arrayExp.indexOf("/");

      arrayExp[tempIndex] =
        arrayExp.indexOf("*") !== -1
          ? parseFloat(arrayExp[tempIndex - 1]) *
            parseFloat(arrayExp[tempIndex + 1])
          : parseFloat(arrayExp[tempIndex - 1]) /
            parseFloat(arrayExp[tempIndex + 1]);

      arrayExp.splice(tempIndex - 1, 1);
      arrayExp.splice(tempIndex, 1);

      hasPlusOrDiv =
        arrayExp.indexOf("*") !== -1 || arrayExp.indexOf("/") !== -1;
    }
    while (arrayExp.length !== 1) {
      arrayExp[0] = parseFloat(arrayExp[0]) + parseFloat(arrayExp[1]);
      arrayExp.splice(1, 1);
    }
    setExpressaoLimpa(expressao + arrayExp[0]);
    setState(arrayExp[0]);
  };

  const dicionario = {
    AC: "AC",
    "/": "DIV",
    "*": "x",
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
        <CalculatorVisor
          expressao={expressaoLimpa}
          state={state}
        ></CalculatorVisor>
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
              expressao={expressao}
              setExpressao={setExpressao}
            ></CalculatorButton>
          );
        })}
      </div>
    </div>
  );
}

export default App;
