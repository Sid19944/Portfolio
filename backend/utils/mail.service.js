import nodemialer from "nodemailer";
import ErrorHandler from "./errorHandler.js";

const transporter = nodemialer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "realme19948@gmail.com",
    pass: "udur ggqk wptc czln",
  },
});

const sendMail = async (options, next) => {
  console.log(options);
  try {
    const info = await transporter.sendMail({
      from: `"PORTFOLIO" <realme19948@gmail.com>`,
      to: options.sender,
      subject: options.subject,
      html: options.message,
    });
    console.log(info);
    console.log("mail successfully send");
  } catch (err) {
    // console.log(err);

    return next(
      new ErrorHandler(
        `Something wrong while send mail to the user, Error in mail.server, ${err} `,
        500,
      ),
    );
  }
};

// VYRFYZX46YER4LVF1T5T613N

export { sendMail };
