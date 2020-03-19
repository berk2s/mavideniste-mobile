import * as Yup from 'yup';

const validations = Yup.object().shape({
    coupon:Yup
        .string()
        .max(100)
        .required()
});

module.exports = validations;
