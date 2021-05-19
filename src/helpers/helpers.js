export const getDateFormat = (date) => {
    const d = new Date(date);
    let day  = d.getDate();
    day = `${day < 10 ? 0 : ''}${day}`;
    let month = d.getMonth() + 1;
    month = `${month < 10 ? 0 : ''}${month}`;
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
}

export const getInputDateFormat = (date) => {
    const d = new Date(date);
    let day  = d.getDate();
    day = `${day < 10 ? 0 : ''}${day}`;
    let month = d.getMonth() + 1;
    month = `${month < 10 ? 0 : ''}${month}`;
    const year = d.getFullYear();

    return `${year}-${month}-${day}`;
}