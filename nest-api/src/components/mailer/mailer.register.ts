import { Config } from '@/config';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';

const MailerRegister = MailerModule.forRoot({
  transport: {
    // host: 'smtp.office365.com',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    secureConnection: true,
    auth: Config.EMAIL_AUTH,
    // tls:{
    //   secureProtocol: 'TLSv1_2_method',
    //   // ciphers:'SSLv23_method'
    // },
    ignoreTLS: false,
    debug: true,
  },
  // 'smtps://no-reply@fina.com.vn:Coronadiehard123@smtp.office365.com:587',
  defaults: {
    from: Config.EMAIL_FROM,
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(), // or new PugAdapter()
    options: {
      strict: true,
    },
  },
});
export { MailerRegister };
