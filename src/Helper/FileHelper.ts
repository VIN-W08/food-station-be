import fs from 'fs'

export const convertToBase64 = (filePath: string): string => {
    const base64 = fs.readFileSync(filePath)
    return base64.toString('base64')
}