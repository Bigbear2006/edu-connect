import React from "react";
import '../sass/profile.scss';
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import CourseCard from "../components/CourseCard.tsx";
import courseImage from "../assets/img.png";

interface IProfileProps {
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
}

const Profile: React.FC<IProfileProps> = ({ name, username, email, avatarUrl }) => {

    const handleEnroll = () => {
        alert("Вы записались");
    };

    return (
        <div className="profile-container">
            <Header />
            <div className="profile-info">
                <div className="profile-content">
                    <div className="avatar-container">
                        <img className="avatar" src={avatarUrl} alt="Avatar"/>
                    </div>
                    <h1>{name}</h1>
                    <p className="username">@{username}</p>
                    <div className="profile-details">
                        <div className="profile-contact">
                            <h3>Инфа</h3>
                            <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
                        </div>
                        <div className="profile-buttons-container">
                            <button className="profile-button">
                                <FontAwesomeIcon icon={faCrown} style={{marginRight: "8px"}} />
                                Стать админом
                            </button>
                            <button className="profile-button">
                                <FontAwesomeIcon icon={faUserGraduate} style={{marginRight: "8px"}} />
                                Стать преподавателем
                            </button>
                        </div>
                    </div>
                </div>
                <div className="profile-content__courses">
                    <h1>Проекты</h1>
                    <CourseCard
                        imageUrl={courseImage}
                        title="Python-разработчик"
                        description="Описание курса"
                        duration="3 месяца"
                        onEnrollClick={handleEnroll}
                    />
                    <CourseCard
                        imageUrl={courseImage}
                        title="Python-разработчик"
                        description="Описание курса"
                        duration="3 месяца"
                        onEnrollClick={handleEnroll}
                    />
                    <CourseCard
                        imageUrl={courseImage}
                        title="Python-разработчик"
                        description="Описание курса"
                        duration="3 месяца"
                        onEnrollClick={handleEnroll}
                    />
                    <h1>Пройденные курсы</h1>
                    <CourseCard
                        imageUrl={courseImage}
                        title="Python-разработчик"
                        description="Описание курса"
                        duration="3 месяца"
                        onEnrollClick={handleEnroll}
                    />
                    <CourseCard
                        imageUrl={courseImage}
                        title="Python-разработчик"
                        description="Описание курса"
                        duration="3 месяца"
                        onEnrollClick={handleEnroll}
                    />
                    <CourseCard
                        imageUrl={courseImage}
                        title="Python-разработчик"
                        description="Описание курса"
                        duration="3 месяца"
                        onEnrollClick={handleEnroll}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
