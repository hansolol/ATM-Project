const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Deposit', 'Cash Back', 'History'];
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  const status = `Account Balance $ ${totalState} `;

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if(event.target.value <= 0 || (atmMode === "Cash Back" && Number(event.target.value) > totalState)){
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (!validTransaction) return; 

    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);

    const transactionType = isDeposit ? 'Deposit' : 'Cash Back';
    appendHistory(transactionType, deposit);
  };

  const handleModeSelect = (e) => {
    const mode = e.target.value;
    setAtmMode(mode);
    setValidTransaction(false);
    setIsDeposit(mode === 'Deposit');
  }

  const appendHistory = (type, amount) => {
    setHistory([...history, {type, amount}]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={handleModeSelect} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Cash Back</option>
        <option id="history-selection" value="History">History</option> 
      </select>

      {atmMode === 'History' ? (
        <div id="history">
          <h3>Transaction History</h3>
          <ul>
            {history.map((transaction, index) => (
              <li key={index}>{transaction.type}: ${transaction.amount}</li>
            ))}
          </ul>
        </div>
      ) : atmMode && (
        <div>
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        </div>
      )}
    </form>
  );
};

ReactDOM.render(<Account />, document.getElementById('root'));
