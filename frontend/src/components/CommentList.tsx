import type { Comment } from '../types';

type CommentListProps = {
  comments: Comment[];
};

const CommentList = ({ comments }: CommentListProps) => (
  <div className="space-y-3">
    {comments.map((comment) => (
      <div key={comment._id} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">{comment.author?.name ?? 'Anonymous'}:</span>{' '}
          {comment.content}
        </p>
        <p className="mt-1 text-xs text-slate-400">{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
    ))}
    {!comments.length && <p className="text-sm text-slate-400">No comments yet. Be the first to respond!</p>}
  </div>
);

export default CommentList;

