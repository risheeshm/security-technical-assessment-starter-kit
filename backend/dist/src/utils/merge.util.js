"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const merge = (target, source) => {
    for (const key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            if (!target[key]) {
                target[key] = {};
            }
            (0, exports.merge)(target[key], source[key]);
        }
        else {
            target[key] = source[key];
        }
    }
    return target;
};
exports.merge = merge;
//# sourceMappingURL=merge.util.js.map