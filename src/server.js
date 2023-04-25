import express from 'express';
import configViewEngine from "./config/viewEngine.js";
import bodyParser from 'body-parser';
import initWebRoutes from './router/web.js'
import connectDB from './config/connectDB'
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3030;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// gọi hàm config view engine
configViewEngine(app);

// Khởi tạo router
initWebRoutes(app)
// Kết nối Database
connectDB(app)



// Trang 404 not found
app.use((req,res,next)=>{
    return res.render('404.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});