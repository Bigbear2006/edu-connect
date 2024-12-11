import { useEffect, useState } from 'react';
import '../sass/components/_forum.scss'
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import {Header} from '../components'
import { getForums } from '../api/forum';
import { ForumCard } from '../types/forum'
import { createQuestion } from "../api/forum";

export const Forum = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forums, setForums] = useState<ForumCard[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchForums = async () => {
            try {
                const forumsData = await getForums();
                setForums(forumsData);
            } catch (err) {
                setError('Не удалось загрузить форумы');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchForums();
    }, []);

    const handleAddQuestion = async () => {
        try {
            await createQuestion(title, description);
            setIsModalOpen(false);
        } catch (error) {
            console.log('Ошибка при добавлении вакансии', error);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="forum">
            <Header/>
            <div className="container">
                <div className="forum__title">Форум</div>

                <button className="vacancies-page__add-btn" onClick={() => setIsModalOpen(true)}>
                    Добавить вопрос
                </button>

                {isModalOpen && (
                    <div className="vacancies-page__modal">
                        <div className="vacancies-page__modal-content">
                            <button type="button" onClick={() => setIsModalOpen(false)}>
                                &times;
                            </button>
                            <h2>Добавить вакансию</h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label>
                                    Название вопроса:
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>
                                    Описание вопроса:
                                    <input
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </label>
                                <div className="vacancies-page__modal-actions">
                                    <button type="submit" onClick={handleAddQuestion}>
                                        Добавить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="forum__posts">
                    {forums.length === 0 ? (
                        <div>Посты не найдены.</div>
                    ) : (
                        forums.map((post) => (
                            <div
                                key={post.id}
                                className="forum__post-card"
                                onClick={() => navigate(`/forum/${post.id}`)}
                            >
                                <div className="forum__post-question">{post.title}</div>
                                <div className="forum__post-description">{post.description}</div>
                                <div className="forum__post-createdby">Вопрос открыт: {post.created_by.username}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};