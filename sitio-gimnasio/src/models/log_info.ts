
/*
    This log is used for queries that adds money to athlethes accounts
*/
export interface AthletheRechargeLog {
    collector_id: number
    collector_name: string // name + lastname
    athlethe_id: number
    athlethe_name: string // name + lastname
    amount: number
}


/*
    This log is used after payments to trainners
*/
export interface TrainnerPaymentLog {
    admin_id: number
    admin_name: string // name + lastname
    athlethe_id: number
    athlethe_name: string // name + lastname
    amount: number
}

/*
    This log is used for queries that collect money to athlethes accounts
*/
export interface AthletheCollectLog {
    collector_id: number
    collector_name: string // name + lastname
    athlethe_id: number
    athlethe_name: string // name + lastname
    amount: number
}

/*
    This log is used for queries that rollback money transactions
*/
export interface RollbackLog {
    collector_id: number
    collector_name: string // name + lastname
    athlethe_id: number
    athlethe_name: string // name + lastname
    amount: number
}

/*
    This log is used when some admin/reception-role create an user
*/
export interface CraeteUserLog {
    collector_id: number
    collector_name: string // name + lastname
    athlethe_id: number
    athlethe_name: string // name + lastname
}
