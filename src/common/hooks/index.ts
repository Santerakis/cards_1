export {useAppSelector} from "./useAppSelector"
export {useAppDispatch} from "./useAppDispatch"

// чтобы вместо этого:  import { useAppSelector } from "../common/hooks/useAppSelector";
// стало:               import { useAppSelector } from "../common/hooks";
// там где мы импортим эти хуки

// условно последующая (от папки нахождения) вложеность уходит в index