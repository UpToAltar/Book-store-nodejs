import * as services from '../services'
import { internalServerError } from '../middlewares/handle_errors'

const insertCategory = async (req,res)=>{
    try {
        
        let response = await services.insert();

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

module.exports = {
    insertCategory
}