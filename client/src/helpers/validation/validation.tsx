export type ValidatorsFieldType = (value: string) => string | undefined

export const required:ValidatorsFieldType = value => {
    if (value) return undefined;
    return "Pole wymagane"

};

export const maxLength = (maxLength: number):ValidatorsFieldType => value => {
    if (value.length < maxLength ) return undefined;
    return `Maksymalna długość ${maxLength}`
};