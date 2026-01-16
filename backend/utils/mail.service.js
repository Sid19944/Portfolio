import nodemialer from "nodemailer";

const transporter = nodemialer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  // secure: false,
    service: "gmail",
  auth: {
    user: "realme19948@gmail.com",
    pass: "udurggqkwptcczln",
  },
});

const sendMail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: `"PORTFOLIO" <realme19948@gmail.com>`,
      to: options.sender,
      subject: options.subject,
      html: options.message,
    });
    console.log("mail successfully send");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Something wrong while send mail to the user, Error in mail.server, ${err} `,
    });
  }
};

export { sendMail };
