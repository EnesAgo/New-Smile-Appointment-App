const humanReadableNumber = (num, lang = null) => {
    if (!num) return;
    const locale = lang || 'en'
    const number = parseFloat(num)
    return number.toLocaleString(locale);
}

export default humanReadableNumber;