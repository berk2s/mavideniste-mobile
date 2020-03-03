import * as Yup from 'yup';

const validations = Yup.object().shape({
    title_address: Yup
        .string()
        .min(2, '!')
        .max(10, '!')
        .required('!'),
    address:Yup
        .string()
        .min(10, '!')
        .max(200, '!')
        .required( '!'),
    desc_address:Yup
        .string( '!')
        .max(200, '!'),
    province:Yup
        .string('!')
        .required( '!'),
    county:Yup
        .string( '!')
        .required( '!')
});

module.exports = validations;
