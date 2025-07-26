// check whether every 13th of each month is Friday or not

// sunday=0, monday=1, tuesday=2, wednesday=3, thursday=4, friday=5, saturday=6

// january=0, february=1, ...

const getMonthName = (year, m) => {
    const months = []

    for (let i = 0; i < 12; i++) {
        const date = new Date(year, i, 1)
        // default locale of your browser
        const monthName = date.toLocaleString('default', { month: 'long' })
        months.push(monthName)
    }

    return months[m]
}

const getFriday13th = (year) => {
    const monthIndices = []

    for (let i = 0; i < 12; i++) {
        const date = new Date(year, i, 13)
        if (date.getDay() === 5) monthIndices.push(i)
    }
    
    return  monthIndices
}

const monthIndices = getFriday13th(2024)

const monthNames = monthIndices.map((m) => getMonthName(2024, m))

console.log(monthNames)