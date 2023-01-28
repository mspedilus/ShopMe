import express from "express"
import axios from "axios"
import { detailData, listData } from "./similarData.js"

const router = express.Router()


//Retrieves searched items from ASOS API
router.get("/", async (req, res, next) => {
  console.log("OLD API")
  // // Parameters for API
    // const options = {
    //     method: 'GET',
    //     url: 'https://asos2.p.rapidapi.com/products/v2/list',
    //     params: {
    //       store: 'US',
    //       offset: req.query.offset,
    //       categoryId: req.query.category || '0',
    //       limit: '144',
    //       country: 'US',
    //       sort: req.query.sort || 'freshness',
    //       q: req.query.productName || "",
    //       currency: 'USD',
    //       sizeSchema: 'US',
    //       lang: 'en-US',
    //       size: req.query.size || "",
    //       brand: req.query.brand || "",
    //       priceMax: req.query.priceMax || "",
    //       attribute_10155: req.query.bodyFit || "",
    //       attribute_1047: req.query.type || "",
    //       range: req.query.sale || "",
    //       base_colour: req.query.color || "",
    //       attribute_10147: req.query.leather || "",
    //       priceMin: req.query.priceMin || "",
    //       attribute_1046: req.query.style || ""
    //     },
    //   headers: {
    //     'X-RapidAPI-Key': process.env.ASOS,
    //     'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    //   }
    // };
      
    //   await axios.request(options).then(function (response) {
    //       res.send(response.data);
    //   }).catch(function (error) {
    //     res.send(error);
    //   });
      
   res.send(listData)

})

//Retrieves similar searched items from ASOS API
router.get("/details", async (req, res, next) => {
  console.log("NEW API")
  // // // Parameters for API
  //   const options = {
  //       method: 'GET',
  //       url: 'https://asos2.p.rapidapi.com/products/v2/list',
  //       params: {
  //         id: req.query.id,
  //         store: 'US',
  //         currency: 'USD',
  //         sizeSchema: 'US',
  //         lang: 'en-US',
  //       },
  //     headers: {
  //       'X-RapidAPI-Key': process.env.ASOS,
  //       'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
  //     }
  //   };
      
  //     await axios.request(options).then(function (response) {
  //         res.send(response.data);
  //     }).catch(function (error) {
  //       res.send(error);
  //     });
      
   res.send(detailData)

})

export default router