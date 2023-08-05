import  { Fragment, useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/USerInput/UserInput";
import ResultTable from "./components/ResultTable/ResultTable";

function App() {
  const [userInput, setUserinput] = useState(null);
  const calculateHandler = (userInput: any) => {
    setUserinput(userInput);
  };
  const yearlyData = [];
  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }
  return (
    <Fragment>
      <Header />
      <UserInput onCalculate={calculateHandler} />
      {!userInput && (
        <p style={{ textAlign: "center" }}>you dont have any invesment</p>
      )}
      {userInput && (
        <ResultTable
          data={yearlyData}
          initialInv={userInput["current-savings"]}
        />
      )}
    </Fragment>
  );
}

export default App;
