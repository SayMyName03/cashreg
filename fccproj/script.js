const DENOMINATIONS = [
    ["PENNY", 1],
    ["NICKEL", 5],
    ["DIME", 10],
    ["QUARTER", 25],
    ["ONE", 100],
    ["FIVE", 500],
    ["TEN", 1000],
    ["TWENTY", 2000],
    ["ONE HUNDRED", 10000]
  ];
  
  let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ];
  
  sale.addEventListener("click", () => {
    const cashValue = parseFloat(cash.value);
    const changeDue = cashValue - price;
  
    if (cashValue < price) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }
  
    if (cashValue === price) {
      alert("No change due - customer paid with exact cash");
      return;
    }
  
    const changeResult = getChange(changeDue, cid);
  
    if (changeResult.status === "INSUFFICIENT_FUNDS" || changeResult.status === "CLOSED"){
      change.innerText = `Status: ${changeResult.status} ${changeResult.change}`
    }
    else {
      let changeText = `Status: OPEN ${formatChange(changeResult.change)}`;
      change.innerText = changeText  
    }
  });
  
  const getChange = (changeDue, cid) => {
    let totalCid = parseFloat(cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2));
    if (totalCid < changeDue) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    let changeArray = [];
    let remainingChange = changeDue;
  
    for (let i = currencyUnits.length - 1; i >= 0; i--) {
      let unit = currencyUnits[i][0];
      let unitValue = currencyUnits[i][1];
      let unitInDrawer = cid[i][1];
  
      if (unitValue <= remainingChange && unitInDrawer > 0) {
        let amountFromUnit = 0;
  
        while (remainingChange >= unitValue && unitInDrawer > 0) {
          remainingChange = (remainingChange - unitValue).toFixed(2);
          unitInDrawer -= unitValue;
          amountFromUnit += unitValue;
        }
  
        if (amountFromUnit > 0) {
          changeArray.push([unit, amountFromUnit]);
        }
      }
    }
  
    if (remainingChange > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
  
    if (changeDue === totalCid) {
      return { status: "CLOSED", change: [] };
    }
  
    return { status: "OPEN", change: changeArray };
  }
  
  const formatChange = changeArray => changeArray.map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`).join(" ");
  
  
  