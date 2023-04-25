import * as services from '../services'
import { internalServerError } from '../middlewares/handle_errors'

const register = async (req,res)=>{
    try {
        const {email,password} = req.body
        
        if(!email||!password) return res.status(400).json({
            err:1,
            mes:'Missing required'
        })
        
        let response = await services.register({ email, password });

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        
        if(!email||!password) return res.status(400).json({
            err:1,
            mes:'Missing required'
        })
        
        let response = await services.login({ email, password });

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

const refreshToken = async (req,res)=>{
    try {
        const rfToken = req.body.refresh_token;
        
        if(!rfToken) return res.status(400).json({
            err:1,
            mes:'Missing required'
        })
        
        let response = await services.refreshToken(rfToken);

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

module.exports = {
    register,
    login,
    refreshToken
}