import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8))

export const register = ({email,password})=> new Promise(async (resolve, reject) => {
    try {
        const [user, created] = await db.User.findOrCreate({
            where: { email:email },
            defaults: {
                email:email,
                password: hashPassword(password),
            }
        })
        // Tạo token
        const token = created ? jwt.sign({id:user.id, email:user.email, role_code:user.role_code }, process.env.JWT_SECRET, {expiresIn: '1d'}) :null
        // * Tham số thứ nhất là các trường muốn tạo token
        // * Tham số thứ 2 là mã key để giải mã lấy trong file .env
        //* Tham số thứ 3 là option; expiresIn là ngày hết hạn token
        // JWT_SECRET_REFRESH_TOKEN
        const refreshToken = created ? jwt.sign({id:user.id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '7d'}) :null
        resolve({
            err:created ? 0:1,
            message: created ? 'Register successfully' :'Email is used',
            'access-token':token,
            'refresh-token':refreshToken,
        })

        if(refreshToken) {
            await db.User.update({
                refresh_token:refreshToken
            },{where: {id:user.id}})
        }

    } catch (error) {
        reject(error);
    }
})

export const login = ({email,password})=> new Promise(async (resolve, reject) => {
    try {
        // response check xem có email k
        const response = await db.User.findOne({
            where: { email:email },
            
        })
        //  Nếu có email thì check pass
        // Có cả email và pass = pass đã convert
        const checkPassword = response && bcrypt.compareSync(password, response.password)

        // Nếu có pass thì tạo token
        const token = checkPassword ? jwt.sign({id:response.id, email:response.email, role_code:response.role_code }, process.env.JWT_SECRET, {expiresIn: '1d'}) :null
        // JWT_SECRET_REFRESH_TOKEN
        const refreshToken = checkPassword ? jwt.sign({id:response.id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '7d'}) :null  
        resolve({
            err:token ? 0: 1,
            message: token ? 'Login successfully': response? 'Wrong Password' :' Email does not exist',
            'access-token':token,
            'refresh_token':refreshToken
        })

        if(refreshToken) {
            await db.User.update({
                refresh_token:refreshToken
            },{where: {id:response.id}})
        }
    
    } catch (error) {
        reject(error);
    }
})

export const refreshToken = (refresh_token)=> new Promise(async (resolve, reject) => {
    try {
        // B1: Tìm User trong db từ refresh token xem có không
        const response = await db.User.findOne({
            where: {refresh_token: refresh_token}
        })
        //B2: Nếu có thì verify refresh token
        if(response){
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {
                // B3: Nếu lỗi trả về err
                if(err){
                    resolve({err:1, mes:"Refresh token expired, Require login"})
                } else{
                    // B4: Nếu k lỗi thì tạo accessToken mới
                    const accessToken = jwt.sign({id:response.id, email:response.email, role_code:response.role_code }, process.env.JWT_SECRET, {expiresIn: '1d'}) 
                    resolve({
                        err:accessToken ? 0: 1,
                        message: accessToken ? "Created access token successfully" : "Can't create access token",
                        'access-token':accessToken,
                        'refresh_token':refresh_token
                    })
                }
            })
        }
    } catch (error) {
        reject(error);
    }
})