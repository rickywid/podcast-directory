const truncate = (str: string): string => {
    const MAX_LENGTH = 27;

    return str.length >= MAX_LENGTH ? `${str.slice(0, MAX_LENGTH)}...` : str;
}

export default truncate