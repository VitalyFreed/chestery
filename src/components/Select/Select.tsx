import React, {useState, useEffect, ReactElement} from 'react';
import classNames from "classnames";

import styles from './Select.module.scss';

import arrow from '../../assets/arrow.svg';

import {typesOfExerciseType} from '../Tables/Header/Header';
import {UserType} from "../Main/Main";

interface SelectType {
    activeItemId: number;
    setActiveItemId: Function;
    data: Array<typesOfExerciseType | UserType>;
    handleChangeSort: Function;
}

const Select: React.FC<SelectType> = ({data, activeItemId, setActiveItemId, handleChangeSort}) => {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('click', (e: any) => { // ТИПИЗИРОВАТЬ EVENT
            if (e.target.closest('div[data-selectattr]') === null) setVisible(false);
        });
    }, []);

    const handleSetActiveItem = (id: number) => {
        setActiveItemId(id);
        handleChangeSort(id);
    };

    const activeItem = data.find((item) => item.id === activeItemId);

    return (
        <div className={styles['select']}>
            <div className={styles.container}>
                <div data-selectattr='true' className={styles['active__item']} onClick={(e) => setVisible(v => !v)}>
                    <span
                        className={styles['active__item-text']}>{activeItem!.name}</span>
                    <img className={styles.arrow} src={arrow}
                         style={{transform: isVisible ? 'rotate(-90deg)' : 'rotate(90deg)'}}/>
                </div>
                {
                    <ul
                        className={styles['select__list']}
                        style={{display: isVisible ? 'block' : 'none'}}
                    >
                        {data.map(item => <li
                            key={item.id}
                            className={classNames(styles['select__list-item'], activeItemId === item.id ? styles['select__list-item-active'] : null)}
                            onClick={e => handleSetActiveItem(item.id)}
                        >{item.name}</li>)}
                    </ul>
                }
            </div>
        </div>
    );
};

export default Select;