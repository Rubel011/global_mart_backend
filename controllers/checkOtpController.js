const { otpContainer } = require("./userController");

exports.checkOtp = (req,res) => {
    const { mobileOtp , emailOtp } = req.body;
    try {
        const otps = otpContainer();

        const mailOtp = otps[0];
        const phoneOtp = otps[1];
        const token1 = otps[2];
        const token2 = otps[3];

        if(mobileOtp === phoneOtp && emailOtp === mailOtp) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "OTP Verified successful",
                normal_token: token1,
                refresh_token: token2
              });
        }

    } catch (error) {
        console.error(colors.red("Error: ", error.message));
        res.status(500).json({
          status: 500,
          success: false,
          error: "Error in OTP",
        });
    }
};