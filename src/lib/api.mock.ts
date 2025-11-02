import { api } from './api';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(api, { delayResponse: 300 });

let currentMode: 'jeopardy'|'ad'|'koth' = 'jeopardy';
const vms = [
{ id: '1', name: 'Web-01', state: 'running', lab: 'Pentest', host: '10.0.1.10' },
{ id: '2', name: 'DB-01', state: 'stopped', lab: 'Pentest', host: '10.0.1.11' },
];

mock.onGet('/admin/state').reply(200, { mode: currentMode });
mock.onPost('/admin/mode').reply(cfg => { currentMode = JSON.parse(cfg.data).mode; return [200, { ok: true }]; });
mock.onGet('/scoreboard/overview').reply(200, {
teams: [ { teamId: 't1', name: 'Falcon', points: 1200 }, { teamId: 't2', name: 'Hawk', points: 980 } ],
players: [ { userId: 'u1', name: 'Alice', points: 640 }, { userId: 'u2', name: 'Bob', points: 590 } ],
updatedAt: new Date().toISOString()
});
mock.onGet('/vms').reply(200, vms);
mock.onPost(/\/vms\/([^/]+)\/action/).reply(200, { ok: true });
mock.onGet('/labs').reply(200, [ { id: 'L1', name: 'Pentest Range', kind: 'pentest' } ]);
mock.onGet('/labs/L1/vms').reply(200, vms);

export {}; // side-effect only