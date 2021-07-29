import React, {useContext, useEffect} from 'react';

import styles from "../LessonsTable/LessonsTable.module.scss";

import {ExercisesType} from '../../Main/Main';

import {SortContext} from "../../Main/Main";

interface ExercisesTableType {
    exercises: Array<ExercisesType>;
    setCurrentLessonId: Function;
}

export const ExercisesTable: React.FC<ExercisesTableType> = ({exercises, setCurrentLessonId}) => {
    const sortContext = useContext(SortContext).typeOfExercise.value;

    let filteredExercises = [];

    if (sortContext == 2) {
        filteredExercises = exercises;
    } else {
        filteredExercises = exercises.filter((item: ExercisesType) => Number(item.type) === sortContext);
    }

    useEffect(() => {
        return () => {
            setCurrentLessonId(null);
        };
    }, []);

    return (
        <div className={styles.container}>
            <table className={styles['table']}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название упражнения</th>
                    <th>Пользовался решением</th>
                    <th>Брал подсказку</th>
                    <th>Ошибок</th>
                    <th>Неточности</th>
                    <th>Потраченное время</th>
                    <th>Заработано террикоинов</th>
                </tr>
                </thead>
                <tbody>
                {filteredExercises.map((item, i) => <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.isResolve ? 'да' : 'нет'}</td>
                        <td>{item.isTooltip ? 'да' : 'нет'}</td>
                        <td>{item.mistakes}</td>
                        <td>{item.inaccuracy}</td>
                        <td>{item.time}</td>
                        <td>{item.terrocoins}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};