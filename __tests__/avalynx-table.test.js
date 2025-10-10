/**
 * AvalynxTable Jest Tests
 * Comprehensive test suite for all important functionality
 */

const AvalynxTable = require('../src/js/avalynx-table.js');

describe('AvalynxTable', () => {
    let container;

    beforeEach(() => {
        // Setup DOM
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        // Cleanup
        document.body.removeChild(container);
        document.body.innerHTML = '';
    });

    describe('Initialization', () => {
        test('should initialize with default selector', () => {
            container.innerHTML = `
                <table class="avalynx-table">
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
                </table>
            `;

            const instance = new AvalynxTable();
            expect(instance.tables.length).toBe(1);
        });

        test('should initialize with custom class selector', () => {
            container.innerHTML = `
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('.custom-table');
            expect(instance.tables.length).toBe(1);
        });

        test('should initialize with custom ID selector', () => {
            container.innerHTML = `
                <table id="my-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('#my-table');
            expect(instance.tables.length).toBe(1);
        });

        test('should handle selector without prefix', () => {
            container.innerHTML = `
                <table class="my-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('my-table');
            expect(instance.tables.length).toBe(1);
        });

        test('should log error for non-existent selector', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            const instance = new AvalynxTable('#nonexistent');

            expect(consoleSpy).toHaveBeenCalledWith(
                "AvalynxTable: Table(s) with selector '#nonexistent' not found"
            );
            expect(instance.tables.length).toBe(0);
            consoleSpy.mockRestore();
        });

        test('should initialize multiple tables with same class', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
                <table class="avalynx-table">
                    <thead><tr><th>Header 2</th></tr></thead>
                    <tbody><tr><td>Cell 2</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table');
            expect(instance.tables.length).toBe(2);
        });

        test('should handle null options parameter', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', null);
            expect(instance.tables.length).toBe(1);
        });

        test('should handle non-object options parameter', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', 'invalid');
            expect(instance.tables.length).toBe(1);
        });

        test('should accept valid options object', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {});
            expect(instance.tables.length).toBe(1);
        });
    });

    describe('Table Enhancement', () => {
        test('should add avalynx-td-title attribute to table cells', () => {
            container.innerHTML = `
                <table class="avalynx-table">
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
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cells = container.querySelectorAll('td');
            expect(cells[0].getAttribute('avalynx-td-title')).toBe('Header 1');
            expect(cells[1].getAttribute('avalynx-td-title')).toBe('Header 2');
        });

        test('should handle multiple rows', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>Jane</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>Bob</td>
                            <td>35</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const rows = container.querySelectorAll('tbody tr');
            expect(rows.length).toBe(3);

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                expect(cells[0].getAttribute('avalynx-td-title')).toBe('Name');
                expect(cells[1].getAttribute('avalynx-td-title')).toBe('Age');
            });
        });

        test('should handle tables with more cells than headers', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                            <td>Cell 2</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cells = container.querySelectorAll('td');
            expect(cells[0].getAttribute('avalynx-td-title')).toBe('Header 1');
            expect(cells[1].getAttribute('avalynx-td-title')).toBeNull();
        });

        test('should handle tables with more headers than cells', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                            <th>Header 2</th>
                            <th>Header 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cells = container.querySelectorAll('td');
            expect(cells[0].getAttribute('avalynx-td-title')).toBe('Header 1');
        });

        test('should handle special characters in header text', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Header & Special < > " '</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cell = container.querySelector('td');
            expect(cell.getAttribute('avalynx-td-title')).toBe("Header & Special < > \" '");
        });

        test('should handle headers with whitespace', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>  Padded Header  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cell = container.querySelector('td');
            expect(cell.getAttribute('avalynx-td-title')).toBe('  Padded Header  ');
        });

        test('should handle empty headers', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Header 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                            <td>Cell 2</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cells = container.querySelectorAll('td');
            expect(cells[0].getAttribute('avalynx-td-title')).toBe('');
            expect(cells[1].getAttribute('avalynx-td-title')).toBe('Header 2');
        });

        test('should handle headers with nested elements', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th><span>Nested</span> Header</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cell = container.querySelector('td');
            expect(cell.getAttribute('avalynx-td-title')).toBe('Nested Header');
        });
    });

    describe('Edge Cases', () => {
        test('should handle table without thead', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <tbody>
                        <tr>
                            <td>Cell 1</td>
                            <td>Cell 2</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const cells = container.querySelectorAll('td');
            expect(cells[0].getAttribute('avalynx-td-title')).toBeNull();
            expect(cells[1].getAttribute('avalynx-td-title')).toBeNull();
        });

        test('should handle table without tbody', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                </table>
            `;

            // Should not throw error
            expect(() => {
                new AvalynxTable('.avalynx-table');
            }).not.toThrow();
        });

        test('should handle empty table', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                </table>
            `;

            // Should not throw error
            expect(() => {
                new AvalynxTable('.avalynx-table');
            }).not.toThrow();
        });

        test('should handle table with empty tbody', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            `;

            // Should not throw error
            expect(() => {
                new AvalynxTable('.avalynx-table');
            }).not.toThrow();
        });

        test('should handle table with empty rows', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Header 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        <tr></tr>
                    </tbody>
                </table>
            `;

            // Should not throw error
            expect(() => {
                new AvalynxTable('.avalynx-table');
            }).not.toThrow();
        });

        test('should handle undefined selector', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable();
            expect(instance.tables.length).toBe(1);
        });

        test('should handle null selector', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable(null);
            expect(instance.tables.length).toBe(1);
        });

        test('should handle empty string selector', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('');
            expect(instance.tables.length).toBe(1);
        });
    });

    describe('Multiple Tables Enhancement', () => {
        test('should enhance multiple tables independently', () => {
            container.innerHTML = `
                <table class="avalynx-table" id="table1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </table>
                <table class="avalynx-table" id="table2">
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Berlin</td>
                            <td>Germany</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const table1Cells = document.querySelectorAll('#table1 td');
            expect(table1Cells[0].getAttribute('avalynx-td-title')).toBe('Name');
            expect(table1Cells[1].getAttribute('avalynx-td-title')).toBe('Age');

            const table2Cells = document.querySelectorAll('#table2 td');
            expect(table2Cells[0].getAttribute('avalynx-td-title')).toBe('City');
            expect(table2Cells[1].getAttribute('avalynx-td-title')).toBe('Country');
        });

        test('should handle mixed table structures', () => {
            container.innerHTML = `
                <table class="avalynx-table" id="table1">
                    <thead>
                        <tr>
                            <th>Header A</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cell A</td>
                        </tr>
                    </tbody>
                </table>
                <table class="avalynx-table" id="table2">
                    <tbody>
                        <tr>
                            <td>Cell B</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const table1Cell = document.querySelector('#table1 td');
            expect(table1Cell.getAttribute('avalynx-td-title')).toBe('Header A');

            const table2Cell = document.querySelector('#table2 td');
            expect(table2Cell.getAttribute('avalynx-td-title')).toBeNull();
        });
    });

    describe('Instance Properties', () => {
        test('should create instance with tables property', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table');
            expect(instance).toHaveProperty('tables');
            expect(instance.tables).toBeInstanceOf(NodeList);
        });

        test('should be instanceof AvalynxTable', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table');
            expect(instance).toBeInstanceOf(AvalynxTable);
        });

        test('should return early when tables not found', () => {
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            const instance = new AvalynxTable('#nonexistent');

            // Instance should be created but tables should be empty
            expect(instance).toBeInstanceOf(AvalynxTable);
            expect(instance.tables.length).toBe(0);
            consoleSpy.mockRestore();
        });
    });

    describe('Selector Prefix Handling', () => {
        test('should add dot prefix to class name without prefix', () => {
            container.innerHTML = `
                <table class="my-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('my-table');
            expect(instance.tables.length).toBe(1);
        });

        test('should not double-prefix selectors', () => {
            container.innerHTML = `
                <table class="my-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.my-table');
            expect(instance.tables.length).toBe(1);
        });

        test('should handle ID selector with hash', () => {
            container.innerHTML = `
                <table id="my-table">
                    <thead><tr><th>Header 1</th></tr></thead>
                    <tbody><tr><td>Cell 1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('#my-table');
            expect(instance.tables.length).toBe(1);
        });

        test('should work with complex selectors', () => {
            container.innerHTML = `
                <div class="container">
                    <table class="avalynx-table">
                        <thead><tr><th>Header 1</th></tr></thead>
                        <tbody><tr><td>Cell 1</td></tr></tbody>
                    </table>
                </div>
            `;

            const instance = new AvalynxTable('.container .avalynx-table');
            expect(instance.tables.length).toBe(1);
        });
    });

    describe('DOM Querying', () => {
        test('should query tables from entire document', () => {
            // Add table outside container to test document-wide query
            const extraTable = document.createElement('table');
            extraTable.className = 'avalynx-table';
            extraTable.innerHTML = `
                <thead><tr><th>Header 1</th></tr></thead>
                <tbody><tr><td>Cell 1</td></tr></tbody>
            `;
            document.body.appendChild(extraTable);

            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Header 2</th></tr></thead>
                    <tbody><tr><td>Cell 2</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table');
            expect(instance.tables.length).toBe(2);

            document.body.removeChild(extraTable);
        });
    });
});
