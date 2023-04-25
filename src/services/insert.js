import db from '../models'
import data from '../../data/data.json'
import { generateCode } from '../helpers/config-code-category';
import book from '../models/book';

export const insert = ()=> new Promise(async (resolve, reject) => {
    try {
        //* bookFields sẽ là một arr chứa những lĩnh vực của sách, đó là key của data từ file json
        const bookFields = Object.keys(data);
        // Lặp qua và create vào DB Category 
        bookFields.forEach(async(field) => {
            await db.Category.create({
                code: generateCode(field),
                value: field
            })
        });

        const bookData = Object.entries(data);
        bookData.forEach(book => {
            book[1].forEach( async(item) => {
                await db.Book.create({
                    id: item.id,
                    title: item.bookTitle,
                    price: +item.bookPrice,
                    available: +item.available,
                    image: item.imageUrl,
                    description: item.bookDescription,
                    category_code: generateCode(book[0])
                })
            })
        })

        resolve({
            err:data ? 0:1,
            message: data ? 'Insert data successfully' :'No data found',
            
        })

    } catch (error) {
        reject(error);
    }
})