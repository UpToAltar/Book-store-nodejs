import * as services from '../services'
import { internalServerError } from '../middlewares/handle_errors'
const cloudinary = require("cloudinary").v2;

const getBooks = async (req,res)=>{
    try {
        const params = req.query
        let response = await services.getBooks(params);

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}
const postBooks = async (req,res)=>{
    try {
        const body = req.body
        const fileImage = req.file
        const fileName = fileImage.filename
        
        if(!body.title||!body.description||!body.price||!body.available||!body.category_code||!fileImage||!fileName){
            // Nếu không đủ dữ liệu thì sẽ xóa ảnh vừa tạo trong cloud đi
            if(fileImage) await cloudinary.uploader.destroy(fileName)

            return res.status(400).json({
                error: 1,
                mes: "Missing required"
            })
        }
        let response = await services.createBooks(body, fileImage,fileName);

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

const updateBooks = async (req,res)=>{
    try {
        const body = req.body
        const fileImage = req.file
        
        
        if((!body.id||(!body.title&&!body.description&&!body.price&&!body.available&&!body.category_code&&!fileImage))||(body.id&&!body.title&&!body.description&&!body.price&&!body.available&&!body.category_code&&!fileImage)){
            
            if (fileImage) await cloudinary.uploader.destroy(fileImage.filename);
            return res.status(400).json({
                error: 1,
                mes: "Missing required"
            })
        }
        let response = await services.updateBooks(body, fileImage);

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

const deleteBooks = async (req,res)=>{
    try {
        const body = req.body      
        if(!body.title&&!body.id){
            return res.status(400).json({
                error: 1,
                mes: "Missing required"
            })
        }
        let response = await services.deleteBooks(body);

        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(req, res);
    }
}

module.exports = {
    getBooks,
    postBooks,
    updateBooks,
    deleteBooks
}