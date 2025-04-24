export interface Flight {
    id: string;
    stand: string;
    scheduledTime: string;
    status: 'Pending' | 'InProgress' | 'Completed';

}