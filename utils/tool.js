// 定义一个节流函数
export const throttleWarp = (func, delay)=> {
    let lastTime = 0;
    let timeoutId;
    let lastArgs;

    return function (...args) {
        const currentTime = Date.now();
        lastArgs = args;

        if (currentTime - lastTime >= delay) {
            clearTimeout(timeoutId);
            func.apply(this, lastArgs);
            lastTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, lastArgs);
                lastTime = currentTime;
            }, delay);
        }
    };
}


export function debounceWarp(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
