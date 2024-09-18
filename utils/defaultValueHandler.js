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


    /** 
     * 优先手动指定数据类型，自动推断在数据量较大时需要递归所有，性能较差
     * 根据模式递归处理对象，赋予默认值
     * @param {Object} data - 要处理的数据
     * @param {Object} schema - 数据模式，定义每个字段的类型
     * @returns {Object} 处理后的数据
     */
    applyDefaults(data, schema) {
        if (typeof schema !== 'object' || schema === null) {
            return this.handle(data, schema);
        }

        if (Array.isArray(schema)) {
            if (!Array.isArray(data)) {
                return this.handle(data, 'array');
            }
            const itemType = schema[0];
            return data.map(item => this.applyDefaults(item, itemType));
        }

        if (typeof data !== 'object' || data === null) {
            data = {};
        }

        const result = {};
        for (const key in schema) {
            const fieldType = schema[key];
            if (typeof fieldType === 'object' && !Array.isArray(fieldType)) {
                // 递归处理嵌套对象
                result[key] = this.applyDefaults(data[key], fieldType);
            } else {
                result[key] = this.handle(data[key], fieldType);
            }
        }

        return result;
    }

    // /**
    //  * 自动推断数据类型
    //  * @param {any} value - 数据值
    //  * @returns {string} 推断出的类型
    //  */
    // inferType(value) {
    //     if (Array.isArray(value)) return 'array';
    //     if (value === null) return 'null';
    //     return typeof value;
    // }

    // /**
    //  * 递归推断数据结构
    //  * @param {any} data - 要推断的数据
    //  * @returns {any} 推断出的模式
    //  */
    // inferSchema(data) {
    //     const inferredSchema = {};

    //     const traverse = (obj, schema) => {
    //         if (Array.isArray(obj)) {
    //             if (obj.length === 0) {
    //                 schema = ['object']; // 默认数组项为对象
    //                 return;
    //             }
    //             // 假设数组项类型一致
    //             const firstItem = obj.find(item => item !== null && item !== undefined);
    //             if (firstItem !== undefined) {
    //                 schema = [this.inferSchema(firstItem)];
    //             } else {
    //                 schema = ['object'];
    //             }
    //             return schema;
    //         } else if (typeof obj === 'object' && obj !== null) {
    //             for (const key in obj) {
    //                 const value = obj[key];
    //                 const type = this.inferType(value);
    //                 if (type === 'object') {
    //                     schema[key] = this.inferSchema(value);
    //                 } else if (type === 'array') {
    //                     schema[key] = this.inferSchema(value);
    //                 } else if (type === 'null') {
    //                     schema[key] = 'string'; // 默认类型，可根据需要调整
    //                 } else {
    //                     schema[key] = type;
    //                 }
    //             }
    //             return schema;
    //         } else {
    //             return this.inferType(obj);
    //         }
    //     };

    //     return traverse(data, inferredSchema);
    // }

    // /**
    //  * 根据模式递归处理对象，赋予默认值
    //  * @param {Object} data - 要处理的数据
    //  * @param {Object} schema - 数据模式，定义每个字段的类型
    //  * @returns {Object} 处理后的数据
    //  */
    // applyDefaults(data, schema) {
    //     if (typeof schema !== 'object' || schema === null) {
    //         return this.handle(data, schema);
    //     }

    //     if (Array.isArray(schema)) {
    //         if (!Array.isArray(data)) {
    //             return this.handle(data, 'array');
    //         }
    //         const itemType = schema[0];
    //         return data.map(item => this.applyDefaults(item, itemType));
    //     }

    //     if (typeof data !== 'object' || data === null) {
    //         data = {};
    //     }

    //     const result = {};
    //     for (const key in schema) {
    //         const fieldType = schema[key];
    //         if (typeof fieldType === 'object' && !Array.isArray(fieldType)) {
    //             // 递归处理嵌套对象
    //             result[key] = this.applyDefaults(data[key], fieldType);
    //         } else if (Array.isArray(fieldType)) {
    //             // 递归处理数组
    //             result[key] = this.applyDefaults(data[key], fieldType);
    //         } else {
    //             result[key] = this.handle(data[key], fieldType);
    //         }
    //     }

    //     return result;
    // }

}

// 创建一个默认实例
const defaultHandler = new DefaultValueHandler();

// 导出类和默认实例
module.exports = {
    DefaultValueHandler,
    defaultHandler
};