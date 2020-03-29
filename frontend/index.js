const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/';
const port = 8000;

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'HealthCamp.html');
});



app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 8000!')
})