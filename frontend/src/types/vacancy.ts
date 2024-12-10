export interface Vacancy {
    id: number;
    title: string;
    description: string;
    location: string;
}

export interface Response {
    job: Vacancy;
    userId: number;
    createdAt: string;
}