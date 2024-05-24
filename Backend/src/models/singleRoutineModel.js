import { Schema, model } from 'mongoose';

const singleRoutineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [{
        name: {
            type: String,
            required: true
        },
        sets: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        }
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

const SingleRoutine = model('SingleRoutine', singleRoutineSchema);

export default SingleRoutine;