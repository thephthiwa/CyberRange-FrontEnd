export type Mode = 'jeopardy'|'ad'|'koth';

export interface ScoreOverview {
teams: Array<{ teamId: string; name: string; points: number }>;
players: Array<{ userId: string; name: string; points: number }>;
updatedAt: string;
}

export interface AdminState {
mode: Mode;
}

export interface VM {
id: string;
name: string;
state: 'running'|'stopped'|'paused';
lab?: string;
host?: string;
}