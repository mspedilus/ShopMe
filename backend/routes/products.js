import express from "express"
import axios from "axios"

const router = express.Router()


//Retrieves searched items from ASOS API
router.get("/", async (req, res, next) => {
  console.log("API")
  // // Parameters for API
    const options = {
        method: 'GET',
        url: 'https://asos2.p.rapidapi.com/products/v2/list',
        params: {
          store: 'US',
          offset: '0',
          categoryId: req.query.category || '0',
          limit: '144',
          country: 'US',
          sort: req.query.sort || 'freshness',
          q: req.query.productName || "",
          currency: 'USD',
          sizeSchema: 'US',
          lang: 'en-US',
          size: req.query.size || "",
          brand: req.query.brand || "",
          priceMax: req.query.priceMax || "",
          attribute_10155: req.query.bodyFit || "",
          attribute_1047: req.query.type || "",
          range: req.query.sale || "",
          base_colour: req.query.color || "",
          attribute_10147: req.query.leather || "",
          priceMin: req.query.priceMin || "",
          attribute_1046: req.query.style || ""
        },
      headers: {
        'X-RapidAPI-Key': process.env.ASOS,
        'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
      }
    };
      
      await axios.request(options).then(function (response) {
          res.send(response.data);
      }).catch(function (error) {
        res.send(error);
      });
      
   //res.send(req.query)

})


export default router