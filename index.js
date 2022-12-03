const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
// const path = require('path');
const path = require('path');
const cron = require("node-cron"); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//Route Middlewares
const apiRoutes = require('./Routes/api');
const Content = require("./Models/contentModel");
const { scheduleUnblock } = require("./Utils/utils");
app.use("/api", apiRoutes);

//Multer file upload
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3015;
dotenv.config();

//MongoDB Connect
mongoose.connect(
    process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
}).then((data) => console.log(`MongoDB connected with server: ${data.connection.host}`)).catch((err)=> {
    console.log(err);
})


/** Content seeder */
const contentSeeder = [
    {
      title: "Privacy Policy",
      content:
        "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
      type: "privacy_policy",
    },
    {
      title: "Terms and Conditions",
      content:
        "Lorem ipsum dolor sit amet.Ea iste consectetur qui harum libero exercitationem harum et quam earum At cupiditate perferendis qui aspernatur vero!",
      type: "terms_and_conditions",
    },
  ];
  
  const dbSeed = async () => {
    await Content.deleteMany({});
    const abc = await Content.insertMany(contentSeeder);
    // console.log(abc)
    app.use('/privacy_policy', (req, res, next) => {
      res.render('index.pug', { title: abc[0].title , heading: abc[0].title , paragraph : abc[0].content });
    });
    app.use('/terms_and_conditions', (req, res, next) => {
      res.render('index.pug', { title: abc[1].title , heading: abc[1].title , paragraph : abc[1].content });
    });
  };
  dbSeed().then(() => {
    // mongoose.connection.close();
  });
  
  
  cron.schedule("* */5 * * * *", async () => { 
     scheduleUnblock()
  });

  
  
  
//   router.get('/privacy_policy',function(req,res){
//     res.sendFile(path.join(__dirname+'/privacy.html'));
//     //__dirname : It will resolve to your project folder.
//   });
//   router.get('/terms_and_conditions',function(req,res){
//     res.sendFile(path.join(__dirname+'/terms.html'));
//     //__dirname : It will resolve to your project folder.
//   });
//   app.use('/', router);


app.listen(PORT, () => console.log(`Server Up and Running on Port ${PORT}`));