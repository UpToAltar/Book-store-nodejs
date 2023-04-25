import * as services from '../services'
import { internalServerError } from '../middlewares/handle_errors'

const getCurrentUser = async (req,res)=>{
    try {
        
        const id = req.user.id
        
        let response = await services.getOneUser(id);

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

module.exports = {
    getCurrentUser
}