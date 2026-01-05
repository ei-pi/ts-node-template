/**
 * @summary
 * Assert that a given condition holds. *This is a debug tool* and is stripped in production builds.
 * To do this, calls to this function should be labelled with `DEBUG` for esbuild to reliably drop them.
 *
 * Usage:
 * ```ts
 * function divide(a: number, b: number): number {
 *     DEBUG: ASSERT(b !== 0);
 *     return a / b;
 * }
 * ```
 *
 * @param cond    The condition to uphold
 * @param message Either a string or {@link Error} instance to be thrown if `cond` is false
 *
 * @description Even though esbuild can perform dead-code elimination, it tends to not completely
 * drop these calls, instead retaining any property accesses/expressions, whose values get ignored.
 *
 * ```ts
 * const obj = {
 *     prop: 3
 * };
 *
 * ASSERT(obj.prop === 1 || obj.prop === 3, `obj.prop is ${obj.prop}`);
 * console.log(obj);
 *
 * // might get reduced to
 * let r = { prop: 3 };
 * r.prop===1 || r.prop, `${r.prop}`, console.log(r);
 * ```
 *
 * The property accesses in the assertion's condition, as well as part of the template string used for the error message,
 * are all retained in some form.
 *
 * This is technically correct, since these property accesses could be getters with side-effects: however,
 * we really want the whole thing to be stripped (and if your code depends on these side-effects, you should
 * probably… change that)
 *
 * Thus, labelling the call with `DEBUG:` ensures that esbuild drops the call itself, and everything in its arguments
 */
export function ASSERT(cond: false, message?: string | Error): never;
export function ASSERT(cond: boolean, message?: string | Error): asserts cond;
export function ASSERT(cond: boolean, message?: string | Error): asserts cond {
    DEBUG: if (!cond) {
        throw Error.isError(message) ? message : new Error(message);
    }
}

/**
 * @summary
 * Assert that a given value is neither `undefined` nor `null`. *This is a debug tool* and is stripped in
 * production builds. To do this, calls to this function should be labelled with `DEBUG` for esbuild to
 * reliably drop them.
 *
 * Usage:
 * ```ts
 * function getKeyFromMap(map: Map<string, number>, key: string): number {
 *     return REQUIRE_NOT_NULL(map.get(key), `No mapping for ${key} exists`);
 * }
 * ```
 *
 * @param val     The value to validate
 * @param message Either a string or {@link Error} instance to be thrown if `val` is nullish
 * @returns `val`. Throws an exception if `val` is `undefined` or `null`
 *
 * @description Even though esbuild can perform dead-code elimination, it tends to not completely
 * drop these calls, instead retaining any property accesses/expressions, whose values get ignored.
 *
 * ```ts
 * interface Optional {
 *     prop?: number
 * }
 *
 * const obj: Optional = {
 *     prop: 3
 * };
 *
 * REQUIRE_NON_NULL(obj.prop, `obj.prop is nullish (${obj.prop})`);
 * console.log(obj);
 *
 * // might get reduced to
 * let r = { prop: 3 };
 r.prop, `${r.prop}`, console.log(r);
 * ```
 *
 * The property accesses in the assertion's condition, as well as part of the template string used for the error message,
 * are all retained in some form.
 *
 * This is technically correct, since these property accesses could be getters with side-effects: however,
 * we really want the whole thing to be stripped (and if your code depends on these side-effects, you should
 * probably… change that)
 *
 * Thus, labelling the call with `DEBUG:` ensures that esbuild drops the call itself, and everything in its arguments
 */
export function REQUIRE_NON_NULL<T>(val: T, message?: string | Error): Exclude<T, undefined | null> {
    DEBUG: {
        if (val === undefined) throw Error.isError(message) ? message : new Error(message ?? "Expected non-nullish, got undefined");
        if (val === null) throw Error.isError(message) ? message : new Error(message ?? "Expected non-nullish, got null");
    }
    return val as Exclude<T, undefined | null>;
}
