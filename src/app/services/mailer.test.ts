// import util from 'node:util';
// import { transportOtpToEmail } from './mailer';
// import { createTransport } from 'nodemailer';

// jest.mock('nodemailer', () => ({
//   createTransport: jest.fn(),
// }));

// const mockSendMail = jest.fn<Promise<{ messageId: string }>, any[]>();

// (createTransport as jest.Mock).mockReturnValue({
//   sendMail: mockSendMail,
// });

describe('transportOtpToEmail', () => {
//   const otp = '123456';
//   const email = 'test@example.com';
//   const mockTemplate = util.format('AuthenticationWithOtpTemplate', otp);

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test.skip('should send an email successfully', async () => {
//     mockSendMail.mockResolvedValueOnce({
//       messageId: 'mock-message-id',
//     });

//     const response = await transportOtpToEmail(otp, email);

//     expect(createTransport).toHaveBeenCalledWith({
//       host: 'smtp.example.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: 'your-email@example.com',
//         pass: 'your-email-password',
//       },
//     });

//     expect(mockSendMail).toHaveBeenCalledWith({
//       from: 'Your App Name <your-email@example.com>',
//       to: email,
//       subject: 'Your OTP Code',
//       html: mockTemplate,
//     });

//     expect(response).toEqual({
//       success: true,
//       messageId: 'mock-message-id',
//     });
test("Implement this",()=>{
    
})
  });

//   test.skip('should handle email sending failure', async () => {
//     const error = new Error('Email sending failed');
//     mockSendMail.mockRejectedValueOnce(error);

//     const response = await transportOtpToEmail(otp, email);

//     expect(mockSendMail).toHaveBeenCalledWith({
//       from: 'Your App Name <your-email@example.com>',
//       to: email,
//       subject: 'Your OTP Code',
//       html: mockTemplate,
//     });

//     expect(response).toEqual({
//       success: false,
//       error,
//     });
//   });
// });
