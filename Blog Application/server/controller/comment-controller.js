
import Comment from '../model/comment.js';


export const newComment = async (request, response) => {
    try {
        const comment = await new Comment(request.body);
        comment.save();

        response.status(200).json('Comment saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


// export const getComments = async (request, response) => {
//     try {
//         const comments = await Comment.find({ postId:request.params.id });
        
//         response.status(200).json(comments);
//     } catch (error) {
//         response.status(500).json({error: error.messaage});
//     }
// }
export const getComments = async (request, response) => {
    try {
        const postId = request.params.id;
        const comments = await Comment.find({ postId }).exec();

        if (!comments) {
            return response.status(404).json({ error: 'Comments not found' });
        }

        return response.status(200).json(comments);
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
};
export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);

        // Check if comment is not found or not a valid Mongoose document
        if (!comment || !(comment instanceof Comment)) {
            return response.status(404).json({ error: 'Comment not found' });
        }
        
        await comment.deleteOne();
        return response.status(200).json({ msg: 'Comment deleted successfully' });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}


