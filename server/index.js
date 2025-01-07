const express = require("express");
const cors = require("cors");
const getTotalSupply = require("./middleware/API/getTotalSupply");
const getTransactions = require("./middleware/API/getTransactions");
const ownerHoldings = require("./middleware/API/ownerHoldings");
const transactionNumber = require("./middleware/API/TransactionNumber");

require("dotenv").config();

const PORT = 8080;
const CONTRACT_ADDRESS = "0xc8A0AB6c21f21B0B38864F1e5C4b2355d40691eb";

app = express();
app.use(cors());
app.use(express.json())

app.get("/total-supply", async (request, response) => {
    const result = await getTotalSupply(CONTRACT_ADDRESS);
    response.json({totalSupply: result});
});

app.get("/transactions", async (request, response) => {
    const result = await getTransactions(CONTRACT_ADDRESS);
    console.log(result);
    response.json({ transactions: result });
});

app.get("/owner-holdings", async (request, response) => {
    const result = await ownerHoldings(CONTRACT_ADDRESS);
    response.json({ ownerHoldings: result });
});

app.get("/transaction-number", async (request, response) => {
    const result = await transactionNumber(CONTRACT_ADDRESS);
    response.json({ transactionNumber: result });
});

app.listen(PORT, () => {
    console.log("Server running on PORT: " + PORT);
});