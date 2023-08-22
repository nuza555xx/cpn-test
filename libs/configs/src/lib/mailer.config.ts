import { registerAs } from "@nestjs/config";
import { ConfigurationName } from "./config.enum";

export const mailerConfig = registerAs(ConfigurationName.Mailer, () => ({
    host: process.env["SMTP_HOST"],
    port: Number(process.env["SMTP_PORT"]),
    secure: false,
    auth: {
        user: process.env["SMTP_USER"],
        pass: process.env["SMTP_PASSWORD"],
    },
}));