const joi = require("joi");

module.exports.listingSchema = joi.object({
    ob : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        country : joi.string().required(),
        location : joi.string().required(),
        price : joi.number().required().min(0),
        image : joi.string().allow("", null),
    }).required(),
})


module.exports.reviewSchema = joi.object({
    ob : joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required(),
    }).required(),
})