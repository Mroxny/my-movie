const reqAddRate = {
    user_id: 1, 
    entity_type: 0,
    entity_id: 1,
    rate_value: 5,
    rate_date: "2022-12-12 15:10:05"
}

const reqAddInvalidRate = {
    user_id: 1, 
    entity_type: 0,
    entity_id: 1,
    rate_value: 5,
    rate_date: "2022"
}

const reqUpdateRate = {
    rate_value: 3
}

module.exports = {
    reqAddRate,
    reqAddInvalidRate,
    reqUpdateRate
}