import { IAuthResource } from "../Interface/IAuth"
import { getUserDTO } from "./user.dto"

export const getAuthDTO = (doc: any): IAuthResource => {
    return {
        user: getUserDTO(doc.user),
        accessToken: doc.accessToken,
        refreshToken: doc.refreshToken
    }
}