// Product catalogue — single source of truth used by the products page,
// homepage featured section, and the enquiry form (price/stock lookup).
var PRODUCTS = [
  {id:"ilala-palm-storage-basket",name:"Ilala Palm Storage Basket",category:"baskets",price:450,stock:12,lead:"3–5 days",featured:true,image:"images/ilala-palm-storage-basket.svg",desc:"Hand-woven by Dintle M. in KwaZulu-Natal. 35cm diameter."},
  {id:"sisal-market-basket",name:"Sisal Market Basket",category:"baskets",price:320,stock:20,lead:"3–5 days",featured:false,image:"images/sisal-market-basket.svg",desc:"Durable everyday carry basket in natural sisal fibre."},
  {id:"woven-wall-basket-set",name:"Woven Wall Basket Set (3)",category:"baskets",price:680,stock:4,lead:"1 week",featured:false,image:"images/woven-wall-basket-set.svg",desc:"A set of three graduated wall-mounted baskets."},
  {id:"stoneware-table-vase",name:"Stoneware Table Vase",category:"ceramics",price:390,stock:9,lead:"3–5 days",featured:true,image:"images/stoneware-table-vase.svg",desc:"Wheel-thrown and glazed in matte sand. 28cm tall."},
  {id:"glazed-serving-bowl-set",name:"Glazed Serving Bowl Set (2)",category:"ceramics",price:510,stock:6,lead:"1 week",featured:false,image:"images/glazed-serving-bowl-set.svg",desc:"Hand-thrown stoneware bowls, food-safe glaze."},
  {id:"terracotta-planter",name:"Terracotta Planter",category:"ceramics",price:260,stock:0,lead:"2 weeks",featured:false,image:"images/terracotta-planter.svg",desc:"Unglazed terracotta planter with drainage hole."},
  {id:"handwoven-throw-blanket",name:"Handwoven Throw Blanket",category:"textiles",price:580,stock:7,lead:"1 week",featured:true,image:"images/handwoven-throw-blanket.svg",desc:"Natural undyed wool, woven on a traditional loom."},
  {id:"cushion-cover-pair",name:"Cushion Cover Pair",category:"textiles",price:280,stock:15,lead:"3–5 days",featured:false,image:"images/cushion-cover-pair.svg",desc:"Hand-loomed cotton, 45x45cm, natural dye tones."},
  {id:"handwoven-table-runner",name:"Table Runner",category:"textiles",price:220,stock:3,lead:"3–5 days",featured:false,image:"images/handwoven-table-runner.svg",desc:"Handwoven cotton runner, 180cm, natural fringe edge."},
  {id:"reclaimed-wood-stool",name:"Reclaimed Wood Stool",category:"furnishings",price:750,stock:5,lead:"2 weeks",featured:false,image:"images/reclaimed-wood-stool.svg",desc:"Solid reclaimed pine, hand-finished, seats one."},
  {id:"solid-oak-wall-shelf",name:"Wall Shelf, Solid Oak",category:"furnishings",price:620,stock:8,lead:"2 weeks",featured:false,image:"images/solid-oak-wall-shelf.svg",desc:"Floating shelf with hidden bracket, 90cm."},
  {id:"live-edge-side-table",name:"Side Table, Live Edge",category:"furnishings",price:1450,stock:1,lead:"3 weeks",featured:false,image:"images/live-edge-side-table.svg",desc:"One-off live-edge side table, sealed finish."}
];
var STORES = [
  {name:"Main Store — Woodstock, Cape Town",lat:-33.9272,lng:18.4486,info:"Mon–Sat, 09:00–17:00"},
  {name:"Market Stall — Oranjezicht City Farm Market",lat:-33.9006,lng:18.4065,info:"Saturdays & Sundays (approximate pin)"}
];
