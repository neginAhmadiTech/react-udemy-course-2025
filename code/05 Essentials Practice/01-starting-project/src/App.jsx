import { useState } from "react";
import UserInput from "./components/UserInput";
import { calculateInvestmentResults, formatter } from "./util/investment";
import ResultTable from "./components/ResultTable";

function App() {
  const [investmentValues, setInvestmentValues] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const [investmentResults, setInvestmentResults] = useState(
    calculateInvestmentResults(investmentValues)
  );
  console.log(investmentResults);
  // console.log(
  //   calculateInvestmentResults({
  //     initialInvestment: 10000,
  //     annualInvestment: 1200,
  //     expectedReturn: 6,
  //     duration: 10,
  //   })
  // );

  function handleChange(key, value) {
    const updatedValues = {
      ...investmentValues,
      [key]: Number(value),
    };

    setInvestmentValues(updatedValues);
    setInvestmentResults(calculateInvestmentResults(updatedValues));
  }

  return (
    <>
      <div id="user-input">
        <div className="input-group">
          <UserInput
            label="initial investment"
            type="number"
            value={investmentValues.initialInvestment}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
          />
          <UserInput
            label="annual investment"
            type="number"
            value={investmentValues.annualInvestment}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </div>
        <div className="input-group">
          <UserInput
            label="expected return"
            type="number"
            value={investmentValues.expectedReturn}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
          <UserInput
            label="duration"
            type="number"
            value={investmentValues.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>
      </div>

      <ResultTable investmentResults={investmentResults} />
      {/* <table id="result">
        <thead>
          <tr>
            <td>Year</td>
            <td>Investment Value</td>
            <td>Interest(Year)</td>
            <td>Total Interest</td>
            <td>Invested Capital</td>
          </tr>
        </thead>
        <tbody>
          {investmentResults.map((investmentResult, index) => (
            <tr key={investmentResult.year}>
              <td className="center">{investmentResult.year}</td>
              <td className="center">
                {formatter.format(investmentResult.valueEndOfYear)}
              </td>
              <td className="center">
                {formatter.format(investmentResult.interest)}
              </td>
              <td className="center">
                {formatter.format(investmentResult.annualInvestment)}
              </td>
              <td className="center">
                {formatter.format(
                  // investmentResult.annualInvestment
                  index === 0
                    ? investmentValues.initialInvestment +
                        investmentResult.annualInvestment
                    : investmentResults[index]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
}

export default App;
