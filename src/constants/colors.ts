export const coolPalette = {
    mint: '#D5FFD0',
    skyBlue: '#40F8FF',
    blue: '#279EFF',
    midnightBlue: '#0C356A',
}

export const amethystPalette = {
    indigo: '#313866',
    lavender: '#504099',
    orchid: '#974EC3',
    pink: '#FE7BE5',
}

export const sunsetPalette = {
    lemon: '#EBE76C',
    golden: '#F0B86E',
    coral: '#ED7B7B',
    orchid: '#836096',
}

export const cherryPalette = {
    rose: '#F11A7B',
    plum: '#982176',
    berry: '#3E001F',
    peach: '#FFE5AD',
}

type StatsCellColor = {
    background: string,
    label: string,
    count: string,
}

export const statsColors: StatsCellColor[] = [
    {
        background: coolPalette.blue,
        label: coolPalette.midnightBlue,
        count: coolPalette.mint,
    },
    {
        background: amethystPalette.orchid,
        label: amethystPalette.pink,
        count: amethystPalette.indigo,
    },
    {
        background: sunsetPalette.coral,
        label: sunsetPalette.orchid,
        count: sunsetPalette.lemon,
    },
    {
        background: cherryPalette.berry,
        label: cherryPalette.peach,
        count: cherryPalette.rose,
    },
]