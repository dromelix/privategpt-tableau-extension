export interface Conversation {
    id: number;
    name: string;
    messages: Message[];
    datasource?: DataSource;
    datasourceType: DataSourceType;
}

export interface Message {
    role: string; // system or user or assistant
    content: string;
}

export interface DataSource {
    name: string;
}

export type DataSourceType = 'summary' | 'full'
