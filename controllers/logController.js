const log = require('../models/logModel.js');
const { generateHash } = require('../utils/hashUtils.js');
const Joi = require('joi');

const logValidationSchema = Joi.object({
    eventType: Joi.string().required(),
    timestamp: Joi.date().required(),
    sourceAppId: Joi.string().required(),
    dataPayload: Joi.object().required(),
});

const addLog = async (req, res) => {
    try {
        const {error} = logValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).send({message: error.details[0].message});
        }

        const {eventType, timestamp, sourceAppId, dataPayload} = req.body;

        //get the previous hash
        const lastLog = await log.findOne().sort({_id: -1});
        const previousHash = lastLog ? lastLog.hash : null;


        //genrate hash
        const logData = {eventType, timestamp, sourceAppId, dataPayload, previousHash};
        const hash = generateHash(JSON.stringify(logData));

        const newLog = new log({ ...logData, hash });
        await newLog.save();
        res.status(201).send({status: 'success', message: 'Log added successfully', hash });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLogs = async (req, res) => {
    try {
        const {eventType, sourceAppId, start, end, page = 1, limit = 10} = req.query

        const filters = {} ;
        if (eventType) filters.eventType = eventType;
        if (sourceAppId) filters.sourceAppId = sourceAppId;
        if (start || end) {
            filters.timestamp = {
              ...(start && { $gte: new Date(start) }),
              ...(end && { $lte: new Date(end) }),
            };
        }

        const logs = await log.find(filters)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .sort({ timestamp: -1 });

        res.status(200).json({ status : 'success', data: logs});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {addLog, getLogs}

