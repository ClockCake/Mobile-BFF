// defaultValueHandler.js

class DefaultValueHandler {
    constructor() {
        this.typeHandlers = {
            object: () => ({}),
            array: () => [],
            string: () => "",
            int: () => 0,
            integer: () => 0,
            double: () => 0.0,
            float: () => 0.0,
            bool: () => false,
            boolean: () => false
        };
    }

    handle(value, type) {
        if (value !== null && value !== undefined) {
            return value;
        }

        const handler = this.typeHandlers[type.toLowerCase()];
        if (handler) {
            return handler();
        } else {
            console.warn(`Unhandled type: ${type}. Returning null.`);
            return null;
        }
    }

    addCustomHandler(type, handler) {
        this.typeHandlers[type.toLowerCase()] = handler;
    }
}

// 创建一个默认实例
const defaultHandler = new DefaultValueHandler();

// 导出类和默认实例
module.exports = {
    DefaultValueHandler,
    defaultHandler
};