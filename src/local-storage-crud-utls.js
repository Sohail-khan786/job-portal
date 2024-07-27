export const LocalStorageUtils = {
    setItem: (key, value) => {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },

    getItem: (key) => {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    },

    updateItem: (key, newValue) => {
        if (localStorage.getItem(key) !== null) {
            LocalStorageUtils.setItem(key, newValue);
        } else {
            console.warn(`Item with key "${key}" does not exist.`);
        }
    },

    removeItem: (key) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    }
};


