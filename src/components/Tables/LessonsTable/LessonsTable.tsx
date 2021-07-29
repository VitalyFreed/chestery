import React, {useEffect} from 'react';

import styles from './LessonsTable.module.scss';

import {DataType} from '../../Main/Main';

interface LessonsTableProps {
    data: Array<DataType>;
    handleSetExercises: Function;
}

export const LessonsTable: React.FC<LessonsTableProps> = ({data, handleSetExercises}) => {
    return (
        <div className={styles.container}>
            <table className={styles['table']}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название урока</th>
                    <th>Упражнений в уроке</th>
                    <th>Упражнений выполнено</th>
                    <th>Ошибок</th>
                    <th>Неточности</th>
                    <th>Потраченное время</th>
                    <th>Заработано террикоинов</th>
                </tr>
                </thead>
                <tbody>
                {data.map((lesson, i) => {
                    return <tr key={i} onClick={e => handleSetExercises(lesson.lessonId)}>
                        <td>{i + 1}</td>
                        <td>{lesson.lessonName}</td>
                        <td>{lesson.exerciseCount}</td>
                        <td>{lesson.exerciseDone}</td>
                        <td>{lesson.mistakes}</td>
                        <td>{lesson.inaccuracy}</td>
                        <td>{lesson.time}</td>
                        <td>{lesson.terrocoins}</td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    );
};