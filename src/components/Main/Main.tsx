import React, {useEffect, useState, useContext} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';

import styles from './Main.module.scss';

import {LessonsTable} from '../Tables/LessonsTable/LessonsTable';
import {ExercisesTable} from '../Tables/ExercisesTable/ExercisesTable';
import {Header} from '../Tables/Header/Header';

import {UserContext} from "../App";

export interface UserType {
    id: number;
    name: string;
    avatar: string;
    color?: string;
}

export interface LessonType {
    id: number;
    name: string;
    exerciseCount: number;
    exercises: Array<ExercisesType>;
}

export interface ExercisesType {
    id: number;
    name: string;
    isResolve: boolean;
    isTooltip: boolean;
    done: number;
    mistakes: number;
    inaccuracy: number;
    time: number;
    terrocoins: number;
    type: "home" | "class";
}

export interface DataType {
    lessonId: number;
    lessonName: string;
    exerciseCount: number;
    exerciseDone: number;
    mistakes: number;
    inaccuracy: number;
    time: number;
    terrocoins: number;
}

interface SortContextType {
    typeOfExercise: {
        value: number;
        setValue: Function;
    };
    user: {
        value: number;
        setValue: Function;
    };
}

export const SortContext = React.createContext<SortContextType>({} as SortContextType);

export const Main: React.FC = () => {
    const location = useHistory();
    const {value: userId, setValue} = useContext(UserContext);

    const [users, setUsers] = useState<Array<UserType>>([] as Array<UserType>);
    const [lessons, setLessons] = useState<Array<LessonType>>([] as Array<LessonType>);
    const [exercises, setExercises] = useState<Array<ExercisesType>>([] as Array<ExercisesType>);
    const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
    const [data, setData] = useState<Array<DataType>>([] as Array<DataType>);
    const [sortTypeOfExercise, setSortTypeOfExercise] = useState<number>(0);
    const [sortUser, setSortUser] = useState<number>(0);

    const currentLesson = currentLessonId !== null && lessons.length > 0 ? lessons.find(lesson => lesson.id === currentLessonId) : null;

    const handleSetExercises = (id: number) => {
        setCurrentLessonId(id);
        // @ts-ignore
        const arr = lessons.find(lesson => lesson.id === id).exercises;
        setExercises(arr);
        location.push(`/lessons/${id}`);
    };

    useEffect(() => {
        (async () => {
            let response = await fetch('/data/lessons-users.json');
            let json = await response.json();
            const lessonsId = json.filter((item: { userId: number; lessonId: number }) => item.userId === userId)
                .map(({lessonId}: { userId: number; lessonId: number }) => lessonId);

            response = await fetch('/data/users.json');
            json = await response.json();
            setUsers(json);

            response = await fetch('/data/lessons.json');
            json = await response.json();
            setLessons(json);

            const lessonsFilter = json.filter((item: LessonType) => lessonsId.includes(item.id));

            const arr = lessonsFilter.map((item: LessonType) => {
                const exerciseDone = item.exercises.reduce((acc, current) => acc += current.done, 0);
                const mistakes = item.exercises.reduce((acc, current) => acc += current.mistakes, 0);
                const inaccuracy = item.exercises.reduce((acc, current) => acc += current.inaccuracy, 0);
                const time = item.exercises.reduce((acc, current) => acc += current.time, 0);
                const terrocoins = item.exercises.reduce((acc, current) => acc += current.terrocoins, 0);
                const obj: DataType = {
                    lessonId: item.id,
                    lessonName: item.name,
                    exerciseCount: item.exercises.length,
                    exerciseDone,
                    mistakes,
                    inaccuracy,
                    time,
                    terrocoins,
                }
                return obj;
            });
            setData(arr);
        })();
    }, []);

    return (
        <div className={styles.container}>
            <SortContext.Provider value={{
                typeOfExercise: {
                    value: sortTypeOfExercise,
                    setValue: setSortTypeOfExercise
                },
                user: {
                    value: sortUser,
                    setValue: setSortUser
                }
            }}>
                {users.length > 0 ? <Header userId={userId} users={users} currentLesson={currentLesson}/> : null}
                {lessons.length > 0 ?
                    <Switch>
                        <Route exact path='/lessons'>
                            <LessonsTable data={data} handleSetExercises={handleSetExercises}/>
                        </Route>
                        <Route path='/lessons/:id'>
                            <ExercisesTable exercises={exercises} setCurrentLessonId={setCurrentLessonId}/>
                        </Route>
                        <Route path='/shedule'>
                            <div>Здесь какое-то расписание должно быть наверное, отличное от того, что в успеваемости,
                                не очень понял.
                                В успеваемости можно кликать на уроки и получать упражнения в этом уроке
                            </div>
                        </Route>
                    </Switch>
                    :
                    <div>Загрузка</div>}
            </SortContext.Provider>
        </div>
    );
};