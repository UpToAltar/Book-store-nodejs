import createError from 'http-errors'

export const internalServerError = (req, res)=>{
    const error = createError.InternalServerError()
    // Hàm trên sẽ trả về status là mã lỗi và mes lỗi
    return res.status(error.status).json({
        err:1,
        mes:error.message
    })
}