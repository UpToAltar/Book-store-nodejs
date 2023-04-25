import db from '../models'
import { v4 as generateId } from 'uuid'
const cloudinary = require('cloudinary').v2;
import { Op} from 'sequelize'

// GET
export const getBooks = ({page, limit, order,name,price,available, ...query})=> new Promise(async (resolve, reject) => {
    try {
        // Xét các tham số chung khi truyền và0
        const queries = {raw:true , nest:true};
        // offset là vị trí bắt đầu lấy sách, nếu k có thì là từ 0 
        const offset = (!page || +page<= 1) ? 0 : ( +page - 1);
        // Xét thêm các thuộc tính cho queries 
        const flimit =  +limit || +process.env.LIMIT_DEFAULT
        
        queries.offset = offset * flimit;
        queries.limit =flimit;
        
        //* Vì order truyền vào là 1 obj nên sẽ phải gói trong []
        if(order) queries.order = [order]
        // Op.substring sẽ là chuỗi chứa kí tự trong name, k phân biệt hoa thường
        if(name) query.title = { [Op.substring]:name}
        // Op.between sẽ là khoảng cần tìm
        if(price) query.price = { [Op.between]:price}
        if (available) query.available = { [Op.between]: available };
        
        console.log(query.title);
        const response = await db.Book.findAndCountAll({
            where : query,
            ...queries,
            include : [{
                model: db.Category,
                as: 'categoryData',
                attributes: ['id', 'code', 'value']
            }              
            ]
        })
            
        resolve({
            err:response? 0: 1,
            message: response? 'Find book successfully':'Book does not exist',
            bookData: response
        })
    
    } catch (error) {
        reject(error);
    }
})

// CREATE
export const createBooks = (body, fileImage,fileName)=> new Promise(async (resolve, reject) => {
    try {
        const [book, created] = await db.Book.findOrCreate({
            where: {title: body.title},
            defaults : {
                ...body,
                id: generateId(),
                image: fileImage.path,
                filename: fileName
            }
        })
            
        resolve({
            err:created? 0: 1,
            message: created? 'Create book successfully':'Had similar book before',
            bookData: created? book : null
        })
        if(fileImage && !created) cloudinary.uploader.destroy(fileName)
    
    } catch (error) {
        reject(error);
        if(fileImage) cloudinary.uploader.destroy(fileName)
    }
})

// UPDATE
export const updateBooks = ({id, ...body},fileImage)=> new Promise(async (resolve, reject) => {
    try {
        
        // Lấy ra tên file ảnh hiện tại
        const imageData = await db.Book.findOne({
            where: {id:id}
        });
        const imageName = imageData.filename

        if(fileImage){
            body.image = fileImage.path;
            body.filename = fileImage.filename
        }
        const response = await db.Book.update(body, {
            where: {id:id},
        })
        //* update sẽ trả về số lượng sách được update
        resolve({
            err:response > 0 ? 0: 1,
            message: response > 0 ? `${response} book updated successfully`:'Can not update',
            bookData: response > 0 ? response : null
        })

        //* Nếu truyền ảnh nhưng k update được thì xóa
        if(fileImage && response==0) cloudinary.uploader.destroy(fileImage.filename)

        //* Update nếu truyền ảnh mới thì xóa ảnh cũ
        if(response>0 && imageName && fileImage)cloudinary.uploader.destroy(imageName);
    
    } catch (error) {
        reject(error);
        if (fileImage) cloudinary.uploader.destroy(fileImage.filename);
    }
})

// DELETE
export const deleteBooks = (body)=> new Promise(async (resolve, reject) => {
    try {
        const imageData = await db.Book.findOne({
            where: body,
        });
        const imageName = imageData.filename
        const response = await db.Book.destroy({
            where: body
        })
        
        resolve({
            err:response > 0 ? 0: 1,
            message: response > 0 ? `Delete successfully`:'Can not delete',
            bookData: response > 0 ? `Quantity: ${response}`: null
        })
        if(response>0 && imageName)cloudinary.uploader.destroy(imageName);
    
    } catch (error) {
        reject(error);
        
    }
})