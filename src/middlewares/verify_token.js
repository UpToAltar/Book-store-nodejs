import jwt from 'jsonwebtoken'

const verifyToken = (req , res, next)=> {
    // B1: Lấy ra token từ req gửi lên
    const token = req.headers.authorization
    // B2: Check xem có token không
    if(!token) return res.status(400).json({
        err:1,
        mes: 'Can not get token'
    })
    // B3: Nếu có thì verify
    //* Nếu verify được token sẽ trả về user là obect chứa data user của token đó
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.status(400).json({
            err: err.name == "TokenExpiredError" ? err : "Access Token Invalid",
        });

        // ! Bước cuối: set lại cái thuộc tính req trả về sẽ thành data của user trong token 
        //? Đây là middleware nên contrller ở bước tiếp sẽ nhận req là user được set ở dưới nên sẽ lấy được id
        req.user = user;
        next();
    })
    
    
}
export default verifyToken