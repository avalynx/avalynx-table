import { AvalynxTable } from '../src/js/avalynx-table.esm.js';

describe('AvalynxTable', function() {
    let table;

    beforeEach(() => {
        table = document.createElement('table');
        table.classList.add('avalynx-table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cell 1</td>
                    <td>Cell 2</td>
                </tr>
            </tbody>
        `;
        document.body.appendChild(table);
    });

    afterEach(() => {
        document.body.removeChild(div);
    });

    it('should initialize with default selector', () => {
        const table = new AvalynxTable('.avalynx-table');
        console.log(table.tables.length);
        expect(table.tables.length).toBe(1);
    });

    it('should initialize with custom selector', () => {
        const table = new AvalynxTable('.custom-table');
        expect(table.tables.length).toBe(0);
    });

    it('should enhance table with avalynx-td-title attributes', () => {
        const table = new AvalynxTable();
        table.init(document.querySelector('.avalynx-table'));
        const cells = document.querySelectorAll('td');
        expect(cells[0].getAttribute('avalynx-td-title')).toBe('Header 1');
        expect(cells[1].getAttribute('avalynx-td-title')).toBe('Header 2');
    });

    it('should create an instance of AvalynxTable', () => {
        const table = new AvalynxTable('.avalynx-table');
        expect(table).toBeInstanceOf(AvalynxTable);
    });
});
