import React, {useState} from 'react';

import {Main} from './Main/Main';

import styles from './App.module.scss';

interface UserContextType {
    value: number;
    setValue: Function;
};

export const UserContext = React.createContext<UserContextType>({} as UserContextType);

const App = () => {
    const [userId, setUserId] = useState<number>(0);

    return (
        <>
            <UserContext.Provider value={{value: userId, setValue: setUserId}}>
                <Main/>
            </UserContext.Provider>
        </>
    );
};

export default App;