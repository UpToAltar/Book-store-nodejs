// ! Code phân quyền user truy cập
// * Code sẽ chạy sau verify token nên req nhận vào sẽ là user với những thông tin mà token trả ra

export const isAdmin = (req, res, next) =>{
    const role_code = req.user.role_code

    if(role_code !== 'R1') return res.status(403).json({
        err:1,
        mes: ' Requires admin'
    })

    next();
} 

export const isAdminOrCreator = (req, res, next) =>{
    const role_code = req.user.role_code

    if(role_code !== 'R1' && role_code!== 'R2') return res.status(403).json({
        err:1,
        mes: ' Requires admin or creator'
    })

    next();
} 
