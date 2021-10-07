import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Post = new Schema(
  {
    body: { type: String, required: true },
    imgUrl: { type: String },
    videoUrl: { type: String },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Post.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Post
