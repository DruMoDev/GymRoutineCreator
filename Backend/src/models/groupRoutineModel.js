import { Schema, model } from 'mongoose';

const groupRoutineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GroupRoutine = model('GroupRoutine', groupRoutineSchema);

export default GroupRoutine;