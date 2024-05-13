
/*
    This log is used for queries that adds money to athlethes accounts
*/
export interface AthletheRechargeLog {
    collector_id: string
    collector_name: string
    athlethe_id: string
    athlethe_name: string
    amount: number
}


/*
    This log is used after payments to trainers
*/
export interface TrainerPaymentLog {
    admin_id: string
    admin_name: string
    athlethe_id: string
    athlethe_name: string
    amount: number
}

/*
    This log is used for queries that collect money to athlethes accounts
*/
export interface AthletheCollectLog {
    collector_id: string
    collector_name: string
    athlethe_id: string
    athlethe_name: string
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
    athlethe_id: string
    athlethe_name: string
}
