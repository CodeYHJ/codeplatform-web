import React, { useState, useMemo, useRef } from 'react';
import styles from "@page/Login/index.less";

export const getPeriodOfTime = () => {
    const time = new Date()
    const hours = time.getHours()
    const secon = time.getMinutes()
    const now = hours + Number("0." + secon)
    if (6 <= now || now <= 7) {
        return styles.dawn
    } else if (now > 7 || now || now <= 12) {
        return styles.morning
    } else if (now > 12 || now <= 19) {
        return styles.afternoon
    } else if (now > 19 || now <= 6) {
        return styles.night
    }
}

interface NativeReducers<S> {
    [key: string]: (state: S, ...args: any[]) => S;
}
type Conversion<T> = T extends (...args: infer P) => any ? (...args: P) => void : never;
type Con<T> = (...args: any[]) => void
type Methods<M> = { [K in keyof M]: Con<M[K]> }

type UseMethods<I, M> = [I, Methods<M>]

export function useMethods<T, R extends NativeReducers<T>>(initValue: T, methods: R): UseMethods<T, R> {
    const defaultValue = Object.assign({}, initValue)
    const [initVale, setInitValue] = useState(defaultValue);
    const methodsRef = useRef(undefined)
    Object.keys(methods).forEach(el => {
        const fn = methods[el];
        const bind = (...args: any[]) => setInitValue(() => fn(initVale, ...args))
        Object.assign(methods, { [el]: bind })
    })

    return [initVale, methods];
}

export const getDaysOfMonth = (): number => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date(year, month, 0);
    const days = date.getDate();
    return days;
}

export const daysList = (): string[] => {
    const days = getDaysOfMonth()
    const list = []
    for (let i = 1; i <= days; i++) {
        list.push(i.toString())
    }
    return list;
}

