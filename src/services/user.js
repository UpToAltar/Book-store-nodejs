import db from '../models'

export const getOneUser = (userId)=> new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id:userId },
            // Chọn user theo id nhưng không lấy password
            attributes: {
                exclude: ['password','refresh_token']
            },
            //  include bảng Role vào từ db để lấy dữ liệu từ role_code sẽ map với role
            include:[
                {
                    model: db.Role,
                    as:'roleData',
                    // Chỉ lấy 3 giá trị dưới từ bảng role
                    attributes: ['id','code','values']
                }
            ]
        })       
        
        resolve({
            err:response ? 0:1,
            message: response ? 'Get user successfully' :'Can not find user',
            userData: response
        })

    } catch (error) {
        reject(error);
    }
})