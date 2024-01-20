const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  time: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['daily', 'once', 'custom'], 
    required: true 
  },
  days: [{ 
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  }],
  description: String
});

module.exports = mongoose.model('Alarm', alarmSchema);
