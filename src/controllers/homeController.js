import db from '../models/index'

let getHomePage = async(req, res) =>{
    
    try {
        let data = await db.Role.findAll();   
        return res.render("homePage.ejs",{dataUser: JSON.stringify(data)});
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getHomePage,
}