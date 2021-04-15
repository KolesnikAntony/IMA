export type ValidatorsFieldType = (value: string) => string | undefined

export const required:ValidatorsFieldType = value => {
    if (value) return undefined;
    return "Required field"
};

export const maxLength = (maxLength: number):ValidatorsFieldType => value => {
    if (value.length < maxLength ) return undefined;
    return `Max length is ${maxLength}`
};