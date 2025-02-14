import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    uploadedUrl: {
      type: String,
      require: true
    },
    resourceType: {
      type: String,
      require: true
    },
    width: {
      type: Number,
      require: true
    },
    height: {
      type: Number,
      require: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    tumb: {
      type: String,
      required: true,
    },
    adsLink: {
      type: String,
    },
    adult: {
      type: Boolean,
      default: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    comments: {
      type: [
        {
          comment: String,
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          name: String,
          username: String,
          profileImg: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;
