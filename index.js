import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";
let display_currency = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//console.log(display_currency);

app.get("/", async (req, res) => {
  display_currency = [];
    try {
        const result = await axios.get(API_URL + "/tickers"); 
        //console.log(result.data);
        result.data.forEach((element) => {
          //console.log(element.symbol);
          if (element.symbol == 'BTC-USD' || element.symbol == 'ETH-USD' || element.symbol == 'DOGE-USD' || element.symbol == 'ALGO-USD'){
            display_currency.push(element);
          }
        });
        console.log(display_currency);
        res.render("index.ejs", { 
            data: display_currency
        });
      } catch (error) {
        res.render("index.ejs",);
      }
});

app.post("/search", async (req,res) => {
  try {
    
  } catch (error) {
    res.render("index.ejs", { data: JSON.stringify(error.response.data) });
  }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });