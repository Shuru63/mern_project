const { json } = require("express");

class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                },
            } : {

            }
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const querycopy = { ...this.queryStr }

        const removeFeild = ["keyword", "page", "limit"];

        removeFeild.forEach((key) =>
            delete querycopy[key]
        )
        let queryStr = JSON.stringify(querycopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        const filterObj = JSON.parse(queryStr);
        this.query = this.query.find(filterObj);
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
};

module.exports = Apifeatures;