"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFilterObj = exports.parseReqQuery = void 0;
// PARSE REQ QUERY TYPEOF VALUES :
function parseReqQuery(reqQuery) {
    let { name, number, country, date_lost } = reqQuery;
    if (typeof name !== "string" ||
        typeof country !== "string" ||
        typeof date_lost !== "string") {
        console.log("Algún valor por query no es string.");
        throw new Error("Invalid query inputs");
    }
    if (typeof number === "string" && number.length) {
        const queryParsed = {
            name,
            number,
            country,
            date_lost,
        };
        return queryParsed;
    }
    else {
        const queryParsed = {
            name,
            number: undefined,
            country,
            date_lost,
        };
        return queryParsed;
    }
}
exports.parseReqQuery = parseReqQuery;
// Retorna un objeto para pasar como filtro, dependiendo de si el number es falso o no :
function setFilterObj(name, number, country, date) {
    // si el number es falsy :
    if (name && !number && country && date) {
        const filterObjWithoutNumber = {
            $and: [
                { name_on_doc: { $eq: name } },
                { country_found: { $eq: country } },
                { date_found: { $gte: date } },
            ],
        };
        return filterObjWithoutNumber;
    }
    // si ningún valor es falsy :
    if (name && number && country && date) {
        const filterObjWithNumber = {
            $and: [
                {
                    $or: [
                        { name_on_doc: { $eq: name } },
                        { number_on_doc: { $eq: number } },
                    ],
                },
                { country_found: { $eq: country } },
                { date_found: { $gte: date } },
            ],
        };
        return filterObjWithNumber;
    }
    throw new Error("Invalid inputs for filter");
}
exports.setFilterObj = setFilterObj;
