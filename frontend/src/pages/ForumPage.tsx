import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getForumById } from '../api/forum';
import { User } from "../types/user.ts";
import { addComment } from '../api/forum';
import '../sass/components/_forum.scss';
import '../sass/components/_forum-page.scss'
import { Header } from "../components";

interface Comment {
    id: string;
    text: string;
    user: User;
}

interface ForumPost {
    id: string;
    title: string;
    description: string;
    created_by: User;
    comments: Comment[];
}

export const ForumPage = () => {
    const { id } = useParams<{ id: string }>(); // Получаем ID поста из URL
    const [post, setPost] = useState<ForumPost | null>(null);
    const [newComment, setNewComment] = useState<string>(''); // Стейт для нового комментария
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            try {
                const postData = await getForumById(id);
                setPost(postData);
            } catch (err) {
                setError('Ошибка при загрузке поста');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return; // Если комментарий пустой, не отправляем
        try {
            const newCommentData = await addComment(Number(id), newComment); // передаем id форума и текст комментария
            if (post) {
                setPost({
                    ...post,
                    comments: [...post.comments, newCommentData],
                });
            }
            setNewComment('');
        } catch {
            setError('Ошибка при добавлении комментария');
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    if (!post) return <div>Пост не найден</div>;

    return (
        <div>
            <Header />
            <div className="container">
                <div className="forum-page__header">
                    <div
                        onClick={() => navigate('/forum')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: 'grey',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                        }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="grey"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-undo-2">
                            <path d="M9 14 4 9l5-5"/>
                            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
                        </svg>
                        Назад
                    </div>
                    <h2 className="forum-page__title">{post?.title}</h2>
                    <p className="forum-page__description">{post?.description}</p>
                </div>

                <div className="forum-page__comments">
                    <h3>Комментарии</h3>
                    {post.comments.length > 0 ? (
                        post.comments.map((comment) => (
                            <div key={comment.id} className="forum-page__comment">
                                {comment.user ? (
                                    <p className="forum-page__comment-author">
                                        {comment.user.username}
                                    </p>
                                ) : (
                                    <p className="forum-page__comment-author">Автор не указан</p>
                                )}
                                <p>{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p>Комментариев пока нет</p>
                    )}
                </div>


                <div className="forum-page__add-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Напишите комментарий..."
                    />
                    <button onClick={handleAddComment} className="forum-page__add-comment-btn">
                        Добавить комментарий
                    </button>
                </div>
            </div>
        </div>
    );
};