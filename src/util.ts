import { STEP_SCALE } from './constants/geometry';

export const step = (): number => (Math.random() - 0.5) * STEP_SCALE

export function hexToRGB(hex: string, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
    } else {
        return 'rgb(' + r + ', ' + g + ', ' + b + ')'
    }
}

export const getLast = <T>(arr: T[], n: number): T[] => (
    n >= arr.length ? [...arr] : [...arr.slice(-n)]
)
