export interface Plan {
   reason:         string;
   status:         string;
   subscribed:     number;
   back_url:       string;
   auto_recurring: AutoRecurring;
   collector_id:   number;
   init_point:     string;
   date_created:   Date;
   id:             string;
   last_modified:  Date;
   application_id: number;
}

export interface AutoRecurring {
   frequency:          number;
   repetitions:        number;
   currency_id:        string;
   transaction_amount: number;
   frequency_type:     string;
   free_trial:         FreeTrial;
   billing_day:        number;
}

export interface FreeTrial {
   frequency:      number;
   frequency_type: string;
}
