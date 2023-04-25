import express from 'express';
import homeController from '../controllers/homeController'
import auth from './auth'
import user from './user'
import insert from './insert'
import book from "./book";
let router = express.Router();

let initWebRoutes = (app)=>{
    router.get("/", homeController.getHomePage);

    router.get("/about", (req, res) => {
        return res.send("Đây là trang about");
    });

    app.use('/api/v1/auth',auth)
    app.use("/api/v1/user", user);
    app.use("/api/v1/insert", insert);
    app.use("/api/v1/book", book);

    return app.use('/',router)
}

export default initWebRoutes;