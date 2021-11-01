/* eslint-disable no-useless-catch */
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

// Function gets in data: 'to', 'subject', 'html'
const sendEmail = async data => {
  const email = { ...data, from: 'kaliuzhna.off@gmail.com' };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

// в апп писали так:
// const email = {
//   to: 'byratinka13@gmail.com',
//   from: 'kaliuzhna.off@gmail.com',
//   subject: 'Новая заявка с сайта',
//   html: '<p>Пришел заказ с айта</p>',
// };
// sgMail
//   .send(email)
//   .then(() => console.log('email send'))
//   .catch(error => console.log(error.message));

module.exports = sendEmail;
