function dateFormater(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
}

export default dateFormater;