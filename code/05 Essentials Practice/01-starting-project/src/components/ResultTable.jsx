import React from "react";
import { formatter } from "../util/investment";

const ResultTable = ({ investmentResults }) => {
  const initialInvestment =
    investmentResults[0].valueEndOfYear -
    investmentResults[0].interest -
    investmentResults[0].annualInvestment;

  return (
    <table id="result">
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
              {formatter.format(
                investmentResult.valueEndOfYear -
                  investmentResult.annualInvestment * investmentResult.year -
                  initialInvestment
              )}
            </td>
            <td className="center">
              {formatter.format(
                investmentResult.valueEndOfYear -
                  (investmentResult.valueEndOfYear -
                    investmentResult.annualInvestment * investmentResult.year -
                    initialInvestment)
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
