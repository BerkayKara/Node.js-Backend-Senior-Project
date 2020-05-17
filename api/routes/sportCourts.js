const express = require("express");
const router = express.Router();

const array = ["Squash","Tennis",]

router.get('/', (req, res) => {
    
    res.send(array);
        
       
   
});



module.exports = router;