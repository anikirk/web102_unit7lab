import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isCommentsClickable, setIsCommentsClickable] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }

                // Ensure that upvotes count is initialized to 0 if it's null
                const initialUpvotes = data.upvotes || 0;
                setPost({ ...data, upvotes: initialUpvotes });
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        const fetchComments = async () => {
            try {
                const { data, error } = await supabase
                    .from('Comments')
                    .select()
                    .eq('post_id', id);

                if (error) {
                    throw error;
                }

                setComments(data);
                setIsCommentsClickable(true); // Enable comment clicking after fetching comments
            } catch (error) {
                console.error('Error fetching comments:', error.message);
            }
        };

        fetchPost();
        fetchComments();
    }, [id]);

    const handleEdit = () => {
        // Redirect to the edit page for the current post
        window.location.href = `/edit/${id}`;
    };

    const handleUpvote = async () => {
        // Update the upvotes count in the database
        try {
            await supabase.from('Posts').update({
                upvotes: post.upvotes + 1
            }).eq('id', id);

            // Update the local state with the new upvotes count
            setPost({ ...post, upvotes: post.upvotes + 1 });
        } catch (error) {
            console.error('Error updating upvotes:', error.message);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleCommentClick = (text) => {
        console.log(text); // Print the text of the clicked comment
    };

    return (
        <div className="PostPage">
            <h2>{post.title}</h2>
            <p>{post.description}</p> {/* Display description */}
            {post.image && <img src={post.image} alt="Post Image" />} {/* Display image if available */}
            <button onClick={handleEdit}>Edit</button> {/* Edit button */}
            <button onClick={handleUpvote}>👍 Upvotes: {post.upvotes}</button> {/* Upvote button */}
            <h3>Comments</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id} onClick={() => isCommentsClickable && handleCommentClick(comment.text)}>
                        <p>{comment.text}</p>
                    </li>
                ))}
            </ul>
            <CommentForm postId={id} setComments={setComments} setIsCommentsClickable={setIsCommentsClickable} />
        </div>
    );
};

const CommentForm = ({ postId, setComments, setIsCommentsClickable }) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await supabase
                .from('Comments')
                .insert({ post_id: postId, text: commentText });

            // Refresh comments after submitting a new comment
            const { data, error } = await supabase
                .from('Comments')
                .select()
                .eq('post_id', postId);

            if (error) {
                throw error;
            }

            setCommentText(''); // Clear comment text input
            setComments(data); // Update comments state
            setIsCommentsClickable(true); // Enable comment clicking after submitting
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave a comment..."
            />
            <button type="submit" disabled={!commentText}>Submit</button> {/* Disable submit button if commentText is empty */}
        </form>
    );
};

export default PostPage;





