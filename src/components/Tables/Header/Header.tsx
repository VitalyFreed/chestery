import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';

import styles from './Header.module.scss';

import arrowIcon from '../../../assets/arrow.svg';

import Select from "../../Select/Select";

import {UserType, LessonType, SortContext} from "../../Main/Main";

interface HeaderType {
    userId: number;
    users: Array<UserType>;
    currentLesson: LessonType | null | undefined;
}

export interface typesOfExerciseType {
    id: number;
    name: string;
    color?: string;
}

export const Header: React.FC<HeaderType> = ({userId, users, currentLesson}) => {
    const [activeTypeOfExercise, setActiveTypeOfExercise] = useState<number>(0);
    const [activeUser, setActiveUser] = useState<number>(0);

    const sortContext = useContext(SortContext);

    const handleChangeTypeOfExercise = (id: number) => {
        sortContext.typeOfExercise.setValue(id);
    };

    const handleChangeUser = (id: number) => {
        sortContext.user.setValue(id);
    };

    const typesOfExercise: Array<typesOfExerciseType> = [
        {
            id: 0,
            name: 'Домашние упражнения',
            color: '#235390',
        },
        {
            id: 1,
            name: 'Не домашние упражнения',
            color: '#000000',
        },
        {
            id: 2,
            name: 'Все упражнения',
            color: '#C200AF'
        }
    ];

    const activeStyle = {
        color: '#C200AF',
        borderBottom: '1px solid #C200AF'
    };

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.links}>
                    <NavLink to='/shedule' activeStyle={activeStyle}>Расписание</NavLink>
                    <NavLink to='/lessons' activeStyle={activeStyle}>Успеваемость</NavLink>
                    <img src={arrowIcon} alt="arrow"/>
                    <div className={styles['links-title']}>
                        {currentLesson === null || currentLesson === undefined ? '' : currentLesson.name}
                    </div>
                </div>
                <div className={styles.select}>
                    <div className={styles['select__exercises']}>
                        <Select
                            data={typesOfExercise}
                            activeItemId={activeTypeOfExercise}
                            setActiveItemId={setActiveTypeOfExercise}
                            handleChangeSort={handleChangeTypeOfExercise}
                        />
                    </div>
                    <div className={styles['select__names']}>
                        <Select
                            data={users}
                            activeItemId={activeUser}
                            setActiveItemId={setActiveUser}
                            handleChangeSort={handleChangeUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};