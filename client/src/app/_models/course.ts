export interface Course {
    id: number;   
    type: string;
    startTime: string;
    endTime: string;
    limit: number;
    username: string;
    code: string;
    taken: boolean;
}