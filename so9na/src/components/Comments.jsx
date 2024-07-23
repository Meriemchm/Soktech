import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { FaStar } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const Comments = ({ service }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const { user, token } = useStateContext();

    // Fonction pour récupérer les commentaires par ID de service
    const fetchCommentsByServiceId = async () => {
        try {
            const response = await axiosClient.get(`/comments/service/${service.id}`);
            setBackendComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // Utilisez useEffect pour récupérer les commentaires au montage du composant
    useEffect(() => {
        fetchCommentsByServiceId();
    }, []);

    // Gestion du changement de note
    const handleRatingChange = (value) => {
        setRating(value);
    };

    // Réinitialiser le formulaire
    const resetForm = () => {
        setRating(null);
        setActiveComment(null);
    };

    // Créer l'objet comment à partir des données de l'API
    const createCommentApi = async (data) => {
        return {
            id: data.id,
            body: data.body,
            parentId: data.parentId,
            userId: data.userId,
            username: data.username,
            created_at: data.created_at,
            rating: data.rating,
            userpic: data.userpic
        };
    };

    backendComments.sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

    // Fonctions pour gérer les commentaires
    const getReplies = (commentId) =>
        backendComments.filter((backendComment) => backendComment.parentId === commentId);

    const rootComments = backendComments.filter(
            (backendComment) => backendComment.parentId === null
        );

    const addComment = async (text, parentId, service, user, rating) => {
        if (!user) {
            console.error('User is not defined');
            return;
        }

        const payload = {
            parentId: parentId,
            userId: user.id,
            serviceId: service.id,
            username: user.name,
            userpic: user.photo,
            body: text,
            rating: rating,
        };
        console.log("payload",payload)
        try {
            const response = await axiosClient.post("/comments", payload);
            const comment = await createCommentApi(response.data);
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
    };

    // Modifier un commentaire
    const modifyComment = async (commentId, newText, newRating) => {
        try {
            await axiosClient.put(`/comments/${commentId}`, { body: newText, rating: newRating });
            const updatedBackendComments = backendComments.map((comment) => {
                if (comment.id === commentId) {
                    return { ...comment, body: newText, rating: newRating };
                }
                return comment;
            });
            setBackendComments(updatedBackendComments);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    // Supprimer un commentaire de la base de données
    const deleteCommentFromDB = async (commentId) => {
        try {
            await axiosClient.delete(`/comments/${commentId}`);
            const updatedBackendComments = backendComments.filter((comment) => comment.id !== commentId);
            setBackendComments(updatedBackendComments);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="comments">
            <h3 className="comments-title">Commentaire</h3>
            {token && (
                <div className="rating">
                    <h4>Ta note</h4>
                    <div className="star-rating">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                                <label key={i}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={ratingValue}
                                        onClick={() => handleRatingChange(ratingValue)}
                                    />
                                    <FaStar
                                        className="star"
                                        color={ratingValue <= (hover || rating) ? "#E1E15E" : "#e4e5e9"}
                                        size={30}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <CommentForm
                        submitLabel="Commente"
                        handleSubmit={(text) => {
                            addComment(text, null, service, user, rating);
                            resetForm();
                        }}
                        handleCancel={resetForm}
                    />
                </div>
            )}
            <div className="comments-container">
                {
                    rootComments.map((rootComment) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id)}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            rating={rootComment.rating}
                            deleteComment={deleteCommentFromDB}
                            updateComment={modifyComment}
                            user={user}
                            service={service}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default Comments;

