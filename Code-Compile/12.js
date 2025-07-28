// 12. OTP GENERATE


function getOtp(num) {
    let otp = "";
    for (let i = 0; i < num; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}



const otp = getOtp(6);
console.log(otp);