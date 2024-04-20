import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.blockchain.com/v3/exchange";
let display_currency = [];
var search_result;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//console.log(display_currency);

app.get("/", async (req, res) => {
  //In starting page, create a table with the 5 most popular cryptocurrencies and populate the table 
  display_currency = [];
    try {
        const result = await axios.get(API_URL + "/tickers"); 
        //console.log(result.data);
        result.data.forEach((element) => {
          //console.log(element.symbol);
          if (element.symbol == 'BTC-USD' || element.symbol == 'ETH-USD' || element.symbol == 'DOGE-USD' || element.symbol == 'ALGO-USD' ||  element.symbol == 'UNI-USD'){
            display_currency.push(element);
          }
        });
        //console.log(display_currency);
        res.render("index.ejs", { 
            data: display_currency
        });
      } catch (error) {
        res.render("index.ejs");
      }
});

app.post("/search", async (req,res) => {
  //console.log(req.body);
  if (req.body.currency ==''){
    res.redirect("/");
    return;
  }
  try {
    const result = await axios.get(API_URL + "/tickers/"+req.body.currency+"-USD"); 
    console.log(result.data)
    search_result = result.data;
    res.render("index.ejs", { 
      search_result : result.data,
      data: display_currency
    });
  } catch (error) {
    res.render("index.ejs",{
      data: display_currency,
      search_result: null, //Ensure that display table is still populated even with an invalid search request or search error
      search_error: true // Flag to indicate search error
    });
  } 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });