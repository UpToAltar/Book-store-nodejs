export const generateCode = (value) => {
    let output = ''
    // Xóa dấu cách , split vào 1 arr , lặp qua và gắn từng phần tử của arr đó vào out(chỉ lấy 2 chữ đầu) và in hoa
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, '').split(' ').forEach(item => {
        output += item.charAt(0).toUpperCase() + item.charAt(1).toUpperCase();
    });
    return output + value.length
}