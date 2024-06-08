
/*
    This log is used for queries that adds money to athletes accounts
*/
export interface AthleteAssistanceLog {
    collector_id: string
    collector_name: string
    athlete_id: string
    athlete_name: string
    amount: number
}


/*
    This log is used after payments to trainers
*/
export interface TrainerPaymentLog {
    admin_id: string
    admin_name: string
    trainer_id: string
    trainer_name: string
    amount: number
}

/*
    This log is used for queries that collect money to athletes accounts
*/
export interface AthleteCollectLog {
    collector_id: string
    collector_name: string
    athlete_id: string
    athlete_name: string
    amount: number
    service: string
}

/*
    This log is used for queries that rollback money transactions
*/
export interface RollbackLog {
    admin_id: string
    admin_name: string
    log_id: number
}

/*
    This log is used when some admin/reception-role create an user
*/
export interface CraeteUserLog {
    collector_id: string
    collector_name: string
    athlete_id: string
    athlete_name: string
}
