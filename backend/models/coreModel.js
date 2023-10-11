import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const coresSchema = new Schema ({
    size: {
        type: Schema.Types.Mixed,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        required: true,
    },
    needAdditional: {
      type: Schema.Types.Boolean,
      default: false,
    },
}, { timestamps: true })

coresSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      next(new Error('Error - Core size already exists!'));
    } else {
      next();
    }
  });

export default mongoose.model('coreModel', coresSchema);