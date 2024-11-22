const mongoose = require('mongoose');
const crypto = require('crypto');

const logSchema = new mongoose.Schema({
  eventType: { type: String, required: true, enum: ['INFO', 'WARN', 'ERROR', 'DEBUG'] },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  hash: { type: String, required: true },
  prevHash: { type: String, default: null },
});


logSchema.pre('save', function (next) {
  const logData = `${this.eventType}|${this.timestamp}|${this.sourceAppId}|${JSON.stringify(this.dataPayload)}|${this.prevHash}`;
  this.hash = crypto.createHash('sha256').update(logData).digest('hex');
  next();
});

const Log = mongoose.model('log', logSchema);

module.exports = Log;
