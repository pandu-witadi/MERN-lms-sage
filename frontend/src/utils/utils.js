export function getOtp(num) {
    const digits = "0123456789"
    let newOtp = ""
    for (let i = 0; i < num; i++) {
        let index = Math.floor(Math.random() * 10)
        newOtp += digits[index];
    }
    return newOtp
}