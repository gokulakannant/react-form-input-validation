import { Component } from "react";

export interface IDynamicKeyValues extends Object {
    [key: string]: any;
}
interface IAppState {
    inputErrors?: Object;
    fields?: any;
    isOwnUpdate?: boolean;
}
interface IAppProps { }
export interface IReactComponent extends Component<IAppProps, IAppState> { }
export enum Lang {
    ar = "ar",
    az = "az",
    be = "be",
    bg = "bg",
    bs = "bs",
    ca = "ca",
    cs = "cs",
    cy = "cy",
    da = "da",
    de = "de",
    el = "el",
    en = "en",
    es = "es",
    et = "et",
    eu = "eu",
    fa = "fa",
    fi = "fi",
    fr = "fr",
    hr = "hr",
    hu = "hu",
    id = "id",
    it = "it",
    ja = "ja",
    ka = "ka",
    ko = "ko",
    It = "It",
    Iv = "Iv",
    mk = "mk",
    mn = "mn",
    ms = "ms",
    nb_NO = "nb_NO",
    nl = "nl",
    pl = "pl",
    pt = "pt",
    pt_BR = "pt_BR",
    ro = "ro",
    ru = "ru",
    se = "se",
    sl = "sl",
    sq = "sq",
    sr = "sr",
    sv = "sv",
    tr = "tr",
    ua = "ua",
    uk = "uk",
    vi = "vi",
    zh = "zh",
    zh_TW = "zh_TW",
}
/**
 * A dictionary object to have options
 * @example
 * ```js
 * let options = {
 *      locale: "en"
 * }
 * ```
 */
export interface IOptions {
    /**
     * The supported languages are {@link Lang}
     */
    locale: Lang;
}
/**
 * A dictionary object.
 * @example
 * ```js
 * {
 *      has: true,
 *      message: "The name field is required"
 * }
 * ```
 */
interface IError {
    /**
     * Denotes has error
     */
    has: boolean;
    /**
     * Denotes corresponding error message
     */
    message: string;
}

export interface IInputErrors {
    /**
     * Denotes all input errors
     */
    [key: string]: IError;
}
