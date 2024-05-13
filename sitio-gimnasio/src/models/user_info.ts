export interface AthletheInfo{
    deposited_money: number
    payed_money: number
    discount_percent: number
}

export interface ReceptionInfo{
    gym_id: number
}

export interface QrInfo{
    gym_id: number
}

export interface TrainerInfo{
    gym_id: number
    amount_charged: number
    amount_earned: number
    earn_per_session: number
}

export const default_athlethe_info = {
    deposited_money: 0,
    payed_money: 0,
    discount_percent: 0
}

export const default_admin_info = {

}

export const default_reception_info = {
    gym_id: 1
}

export const default_qr_info = {
    gym_id: 1
}

export const default_trainer_info = {
    gym_id: 1,
    amount_charged: 0,
    amount_earned: 0,
    earn_per_session: 0
}