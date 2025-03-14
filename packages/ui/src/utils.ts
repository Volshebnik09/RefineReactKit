export type TRecursivePartial<T> = {
    [P in keyof T]?: T[P] extends object ? TRecursivePartial<T[P]> : T[P];
};

export const isObject = (obj: any): obj is object =>
    obj && typeof obj === 'object' && !Array.isArray(obj);

export const deepMerge = <T extends object>(target: T, source: TRecursivePartial<T>): T => {
    const result = { ...target };

    for (const key in source) {
        if (source[key] !== undefined) {
            if (isObject(source[key]) && isObject(target[key])) {
                // Рекурсивно объединяем вложенные объекты
                result[key] = deepMerge(
                    target[key] as object,
                    source[key] as TRecursivePartial<object>
                ) as T[typeof key]; // Явное приведение типа
            } else {
                // Заменяем значение
                result[key] = source[key] as T[typeof key];
            }
        }
    }
    return result;
};

export type TPath<T> = T extends object
    ? {
        [K in keyof T]: K extends string
            ? `${K}` | `${K}.${TPath<T[K]> & string}`
            : never;
    }[keyof T]
    : never;

export type ValidateSingleFlag<T extends string> = {
    [K in T]?: boolean;
} & {
    [K in T]: {
        [P in Exclude<T, K>]?: never;
    };
}[T];