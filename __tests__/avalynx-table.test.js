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

            new AvalynxTable('.avalynx-table', { sortableColumns: ['Header 2'] });

            const cells = container.querySelectorAll('td');
            expect(cells[0].getAttribute('avalynx-td-title')).toBe('');
            expect(cells[1].getAttribute('avalynx-td-title')).toBe('Header 2');

            const headers = container.querySelectorAll('th');
            expect(headers[0].classList.contains('avalynx-table-sorting')).toBe(false);
            expect(headers[0].getAttribute('aria-label')).toBeNull();
            expect(headers[1].classList.contains('avalynx-table-sorting')).toBe(true);
        });

        test('should not initialize sorting when sortableColumns and sorting are empty', () => {
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
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table');

            const headers = container.querySelectorAll('th');
            expect(headers[0].classList.contains('avalynx-table-sorting')).toBe(false);
            expect(headers[0].getAttribute('role')).toBeNull();
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

    describe('Stacked sorting language and button classes', () => {
        test('should accept language as third constructor argument', () => {
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
                            <td>Alice</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', { sortableColumns: [0, 1] }, {
                sortByLabel: 'Sortiere nach',
                multiSortLabel: 'Mehrfachsortierung',
                multiSortOnLabel: 'an',
                multiSortOffLabel: 'aus'
            });

            const header = container.querySelector('th');
            expect(header.getAttribute('aria-label')).toBe('Sortiere nach Name');

            const multiToggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(multiToggle.textContent).toBe('Mehrfachsortierung: aus');
        });

        test('should use configurable language labels for stacked controls and aria label', () => {
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
                            <td>Alice</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', { sortableColumns: [0, 1] }, {
                sortByLabel: 'Sortiere nach',
                multiSortLabel: 'Mehrfachsortierung',
                multiSortOnLabel: 'an',
                multiSortOffLabel: 'aus'
            });

            const header = container.querySelector('th');
            expect(header.getAttribute('aria-label')).toBe('Sortiere nach Name');

            const multiToggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(multiToggle.textContent).toBe('Mehrfachsortierung: aus');

            multiToggle.click();
            expect(multiToggle.textContent).toBe('Mehrfachsortierung: an');
        });

        test('should use custom class strings for multi-sort toggle inactive and active states', () => {
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
                            <td>Alice</td>
                            <td>30</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sortableColumns: [0, 1],
                buttonClasses: {
                    multiSortInactive: 'btn-primary btn-custom-2 avalynx-table-sort-multi-toggle',
                    multiSortActive: 'btn-primary btn-custom-3 avalynx-table-sort-multi-toggle active'
                }
            });

            const multiToggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(multiToggle.className).toBe('btn-primary btn-custom-2 avalynx-table-sort-multi-toggle');

            multiToggle.click();
            expect(multiToggle.className).toBe('btn-primary btn-custom-3 avalynx-table-sort-multi-toggle active');
        });

        test('should use custom inactive and active class strings for sort buttons', () => {
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
                            <td>Alice</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>Bob</td>
                            <td>25</td>
                        </tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sortableColumns: [0, 1],
                buttonClasses: {
                    sortButtonInactive: 'btn-primary btn-custom-2 avalynx-table-sort-button',
                    sortButtonActive: 'btn-primary btn-custom-3 avalynx-table-sort-button active'
                }
            });

            const buttons = container.querySelectorAll('[data-avalynx-sort-button]');
            expect(buttons.length).toBe(2);
            expect(buttons[0].className).toBe('btn-primary btn-custom-2 avalynx-table-sort-button');

            buttons[0].click();
            expect(buttons[0].className).toContain('btn-custom-3');
            expect(buttons[0].className).toContain('active');
            expect(buttons[1].className).toBe('btn-primary btn-custom-2 avalynx-table-sort-button');
        });

        test('should cycle stacked sort button through asc, desc, none, asc', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Bob</td><td>25</td></tr>
                        <tr><td>Alice</td><td>30</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', { sortableColumns: [0, 1] });

            const button = container.querySelector('[data-avalynx-sort-button="0"]');
            expect(button).not.toBeNull();

            button.click();
            expect(button.className).toContain('avalynx-table-sorting-asc');

            button.click();
            expect(button.className).toContain('avalynx-table-sorting-desc');

            button.click();
            expect(button.className).not.toContain('avalynx-table-sorting-asc');
            expect(button.className).not.toContain('avalynx-table-sorting-desc');
            expect(button.className).not.toContain('active');

            button.click();
            expect(button.className).toContain('avalynx-table-sorting-asc');
        });

        test('should support multiSearch aliases for language and button classes', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr><th>Name</th><th>Age</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Alice</td><td>30</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sortableColumns: [0, 1],
                buttonClasses: {
                    multiSearchInactive: 'btn-primary btn-custom-2 avalynx-table-sort-multi-toggle',
                    multiSearchActive: 'btn-primary btn-custom-3 avalynx-table-sort-multi-toggle active'
                }
            }, {
                multiSearchLabel: 'Multi-search',
                multiSearchOnLabel: 'on',
                multiSearchOffLabel: 'off'
            });

            const multiToggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(multiToggle.textContent).toBe('Multi-search: off');
            expect(multiToggle.className).toBe('btn-primary btn-custom-2 avalynx-table-sort-multi-toggle');

            multiToggle.click();
            expect(multiToggle.textContent).toBe('Multi-search: on');
            expect(multiToggle.className).toBe('btn-primary btn-custom-3 avalynx-table-sort-multi-toggle active');
        });

        test('should not fallback to defaults when multiSearch alias values are empty strings', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr><th>Name</th><th>Age</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Alice</td><td>30</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sortableColumns: [0, 1],
                buttonClasses: {
                    multiSearchInactive: '',
                    multiSearchActive: ''
                }
            }, {
                multiSearchLabel: '',
                multiSearchOnLabel: '',
                multiSearchOffLabel: ''
            });

            const multiToggle = container.querySelector('.avalynx-table-sort-controls button');
            expect(multiToggle.textContent).toBe(': ');
            expect(multiToggle.className).toBe('avalynx-table-sort-multi-toggle');
        });

        test('should initialize multi-sort toggle active when default sorting has multiple columns', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-table-sort-id="name">Name</th>
                            <th data-avalynx-table-sort-id="age">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Bob</td><td>25</td></tr>
                        <tr><td>Alice</td><td>30</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sorting: [
                    { column: 'name', dir: 'asc' },
                    { column: 'age', dir: 'desc' }
                ]
            });

            const multiToggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(multiToggle.textContent).toBe('Multi-sort: on');
            expect(multiToggle.className).toContain('active');
        });

        test('should restore initial load sorting when active sorting is cleared', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-table-sort-id="name">Name</th>
                            <th data-avalynx-table-sort-id="age">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Bob</td><td>30</td></tr>
                        <tr><td>Alice</td><td>25</td></tr>
                        <tr><td>Carol</td><td>20</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sorting: [{ column: 'name', dir: 'asc' }]
            });

            const table = container.querySelector('.avalynx-table');
            const getNames = () => Array.from(table.querySelectorAll('tbody tr td:first-child'))
                .map((cell) => cell.textContent);

            const nameButton = container.querySelector('[data-avalynx-sort-button="0"]');
            expect(getNames()).toEqual(['Alice', 'Bob', 'Carol']);

            nameButton.click();
            expect(getNames()).toEqual(['Carol', 'Bob', 'Alice']);

            nameButton.click();
            expect(getNames()).toEqual(['Alice', 'Bob', 'Carol']);

            const multiToggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(multiToggle.textContent).toBe('Multi-sort: off');
            expect(multiToggle.className).not.toContain('active');
        });

        test('should support data-avalynx-table-sort-id and data-avalynx-table-sort-value', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-table-sort-id="name">Name</th>
                            <th data-avalynx-table-sort-id="amount">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Beta</td><td data-avalynx-table-sort-value="2">2 €</td></tr>
                        <tr><td>Alpha</td><td data-avalynx-table-sort-value="10">10 €</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sorting: [{ column: 'name', dir: 'asc' }]
            });

            const table = container.querySelector('.avalynx-table');
            const getNames = () => Array.from(table.querySelectorAll('tbody tr td:first-child'))
                .map((cell) => cell.textContent);
            const getAmounts = () => Array.from(table.querySelectorAll('tbody tr td:nth-child(2)'))
                .map((cell) => cell.textContent.trim());

            expect(getNames()).toEqual(['Alpha', 'Beta']);

            const amountButton = container.querySelector('[data-avalynx-sort-button="1"]');
            amountButton.click();
            expect(getAmounts()).toEqual(['2 €', '10 €']);
        });
    });

    describe('Coverage branches and edge behaviors', () => {
        test('should cover setupSorting branch when stackedSorter is false', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody>
                        <tr><td>B</td></tr>
                        <tr><td>A</td></tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                sortableColumns: [0],
                stackedSorter: false
            });

            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            expect(state.stackedControls).toBeNull();
        });

        test('should cover option language object branch, stacked toggle off branch and symbol options spread path', () => {
            const symbolKey = Symbol('extra');

            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                sortableColumns: [0],
                stackedMultiSortToggle: false,
                language: { sortByLabel: 'Sortiere' },
                [symbolKey]: 'symbol-value'
            });

            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            expect(instance.language.sortByLabel).toBe('Sortiere');
            expect(state.stackedControls.querySelector('.avalynx-table-sort-multi-toggle')).toBeNull();
        });

        test('should cover header handler contains-guard branches and stacked button modifier branches', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody>
                        <tr><td>B</td></tr>
                        <tr><td>A</td></tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);
            const thead = table.querySelector('thead');
            const header = table.querySelector('th.avalynx-table-sorting');
            const containsSpy = jest.spyOn(thead, 'contains').mockReturnValue(false);

            state.sortHandler({ target: header, ctrlKey: false, shiftKey: false });
            header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            containsSpy.mockRestore();

            const button = container.querySelector('[data-avalynx-sort-button="0"]');
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }));
            button.dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey: true }));
        });

        test('should cover setupSorting branch when sortable indices are empty and direct isSortableHeader null guard', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th data-avalynx-sortable="false">Only</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');

            expect(() => instance.setupSorting(table)).not.toThrow();
            expect(instance.isSortableHeader(null)).toBe(false);
        });

        test('should return early in setupSorting when headers or sortable columns are missing', () => {
            container.innerHTML = `
                <table id="t1"><thead></thead><tbody><tr><td>A</td></tr></tbody></table>
                <table id="t2">
                    <thead><tr><th data-avalynx-sortable="false">Only</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('#t1');
            expect(() => instance.setupSorting(container.querySelector('#t1'))).not.toThrow();

            instance.options.sortableColumns = [];
            expect(() => instance.setupSorting(container.querySelector('#t2'))).not.toThrow();
        });

        test('should cover resolveColumnIndex and normalizeDefaultSorting fallback branches', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th data-avalynx-table-sort-id="name">Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table');
            const headers = Array.from(container.querySelectorAll('th'));
            const byId = new Map([['name', 0]]);
            const byName = new Map([['name', 0]]);

            expect(instance.resolveColumnIndex('', headers, byId, byName)).toBe(-1);
            expect(instance.resolveColumnIndex('unknown', headers, byId, byName)).toBe(-1);

            instance.options.sorting = 'invalid';
            expect(instance.normalizeDefaultSorting(headers, [0])).toEqual([]);

            instance.options.sorting = [null, { column: 'unknown', dir: 'asc' }, { column: 'name', dir: 'asc' }];
            expect(instance.normalizeDefaultSorting(headers, [0])).toEqual([{ column: 0, dir: 'asc' }]);
        });

        test('should cover applySorting/getCellSortValue and stacked control guard branches', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');

            expect(instance.getCellSortValue(null)).toEqual({ text: '', numeric: false, number: 0 });

            const state = instance.tableStates.get(table);
            state.stackedControls = null;
            expect(() => instance.updateStackedSortControls(table, state)).not.toThrow();

            state.stackedControls = document.createElement('div');
            expect(() => instance.updateStackedSortControls(table, state)).not.toThrow();

            const tableWithoutBody = document.createElement('table');
            expect(() => instance.applySorting(tableWithoutBody, state)).not.toThrow();
        });

        test('should cover visibility and resize guard branches', () => {
            container.innerHTML = `
                <table class="avalynx-table"><thead><tr><th>Name</th></tr></thead><tbody><tr><td>A</td></tr></tbody></table>
            `;
            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            const originalGetComputedStyle = window.getComputedStyle;
            window.getComputedStyle = undefined;
            expect(instance.isStacked(table)).toBe(false);
            window.getComputedStyle = originalGetComputedStyle;

            const plainTable = document.createElement('table');
            expect(instance.isStacked(plainTable)).toBe(false);

            state.stackedControls = null;
            expect(() => instance.updateStackedSortControlsVisibility(table, state)).not.toThrow();

            instance.tables = [document.createElement('table')];
            expect(() => instance.handleWindowResize()).not.toThrow();
        });

        test('should cover header click and keydown sort handlers', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th data-avalynx-sortable="false">NoSort</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>B</td><td>X</td></tr>
                        <tr><td>A</td><td>Y</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const sortableHeader = container.querySelector('th.avalynx-table-sorting');
            expect(sortableHeader).not.toBeNull();

            sortableHeader.click();

            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            sortableHeader.dispatchEvent(enterEvent);
        });

        test('should cover sortableColumns custom resolution branches', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-table-sort-id="id">ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody><tr><td>1</td><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                sortableColumns: ['id', '1', 'name', 0, 'unknown']
            });

            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);
            expect(state.sortableIndices).toEqual([0, 1]);

            const headers = Array.from(container.querySelectorAll('th'));
            const byId = new Map([['id', 0]]);
            const byName = new Map([['id', 0], ['name', 1]]);

            expect(instance.resolveColumnIndex(0, headers, byId, byName)).toBe(0);
            expect(instance.resolveColumnIndex('1', headers, byId, byName)).toBe(1);
            expect(instance.resolveColumnIndex('name', headers, byId, byName)).toBe(1);
        });

        test('should cover multi-sort remove branch and stable fallback compare branch', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody>
                        <tr><td>Same</td></tr>
                        <tr><td>Same</td></tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                sorting: [{ column: 0, dir: 'desc' }]
            });

            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            state.initialSorting = [];
            state.sorting = [{ column: 0, dir: 'desc' }];
            instance.toggleSorting(table, state, 0, true);
            expect(state.sorting).toEqual([]);

            state.sorting = [{ column: 0, dir: 'asc' }];
            expect(() => instance.applySorting(table, state)).not.toThrow();
        });

        test('should cover invalid sort button dataset and no-thead stacked branch', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            const controls = document.createElement('div');
            controls.innerHTML = `
                <div class="avalynx-table-sort-buttons">
                    <button data-avalynx-sort-button="x"></button>
                </div>
            `;
            state.stackedControls = controls;
            expect(() => instance.updateStackedSortControls(table, state)).not.toThrow();

            const noTheadTable = document.createElement('table');
            noTheadTable.className = 'avalynx-table';
            expect(instance.isStacked(noTheadTable)).toBe(false);
        });

        test('should cover resize path where updateStackedSortControlsVisibility is invoked', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const spy = jest.spyOn(instance, 'updateStackedSortControlsVisibility');
            instance.handleWindowResize();
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        test('should cover click handler guard branches for missing header and invalid sort index', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const thead = container.querySelector('thead');
            const header = container.querySelector('th.avalynx-table-sorting');

            thead.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            header.dataset.avalynxSortIndex = 'x';
            header.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            header.dataset.avalynxSortIndex = '0';
        });

        test('should cover keydown handler guard branches for key, missing header and invalid sort index', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const thead = container.querySelector('thead');
            const header = container.querySelector('th.avalynx-table-sorting');

            thead.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            thead.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            header.dataset.avalynxSortIndex = 'x';
            header.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            header.dataset.avalynxSortIndex = '0';
        });

        test('should cover multi-sort branches for adding and updating entries', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody>
                        <tr><td>B</td></tr>
                        <tr><td>A</td></tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            state.sorting = [];
            instance.toggleSorting(table, state, 0, true);
            expect(state.sorting).toEqual([{ column: 0, dir: 'asc' }]);

            instance.toggleSorting(table, state, 0, true);
            expect(state.sorting).toEqual([{ column: 0, dir: 'desc' }]);
        });

        test('should cover constructor fallback branches for language, buttonClasses and stacked flags', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                stackedSorter: false,
                buttonClasses: 'invalid'
            }, 'invalid');

            expect(instance.options.stackedSorter).toBe(false);
            expect(typeof instance.options.buttonClasses).toBe('object');
            expect(instance.language.sortByLabel).toBe('Sort by');
        });

        test('should cover legacy sort id path and empty id branch with custom sortableColumns', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-sort-id="legacy">Legacy</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody><tr><td>1</td><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                sortableColumns: ['legacy', 'name']
            });

            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);
            expect(state.sortableIndices).toEqual([0, 1]);
        });

        test('should cover default isMultiSort argument and multi-sort key combinations', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody>
                        <tr><td>B</td></tr>
                        <tr><td>A</td></tr>
                    </tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);
            const thead = table.querySelector('thead');
            const header = table.querySelector('th.avalynx-table-sorting');

            instance.toggleSorting(table, state, 0);
            expect(state.sorting.length).toBeGreaterThan(0);

            header.dispatchEvent(new MouseEvent('click', { bubbles: true, shiftKey: true }));
            header.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'Enter',
                bubbles: true,
                shiftKey: true
            }));

            thead.dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }));
        });

        test('should cover getCellSortValue final fallback and updateStackedSortControls empty dataset fallback', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td></td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);
            const emptyCell = table.querySelector('td');

            const value = instance.getCellSortValue(emptyCell);
            expect(value).toEqual({ text: '', numeric: false, number: 0 });

            const controls = document.createElement('div');
            controls.innerHTML = `
                <div class="avalynx-table-sort-buttons">
                    <button></button>
                </div>
            `;
            state.stackedControls = controls;
            expect(() => instance.updateStackedSortControls(table, state)).not.toThrow();
        });

        test('should cover stacked control visibility true branch', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead><tr><th>Name</th></tr></thead>
                    <tbody><tr><td>A</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', { sortableColumns: [0] });
            const table = container.querySelector('table');
            const state = instance.tableStates.get(table);

            const originalIsStacked = instance.isStacked;
            instance.isStacked = () => true;
            instance.updateStackedSortControlsVisibility(table, state);
            expect(state.stackedControls.style.display).toBe('flex');
            instance.isStacked = originalIsStacked;
        });

        test('should cover resolveColumnIndex non-string branch and nullish fallback paths for header text', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-table-sort-id="">Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody><tr><td>A</td><td>1</td></tr></tbody>
                </table>
            `;

            const instance = new AvalynxTable('.avalynx-table', {
                sortableColumns: [0]
            });

            const headers = Array.from(container.querySelectorAll('th'));
            Object.defineProperty(headers[0], 'textContent', {
                configurable: true,
                get: () => null
            });

            const byId = new Map();
            const byName = new Map();

            expect(instance.resolveColumnIndex({}, headers, byId, byName)).toBe(-1);
            expect(() => instance.getSortableIndices(headers)).not.toThrow();
            expect(() => instance.normalizeDefaultSorting(headers, [0])).not.toThrow();
        });

        test('should cover multi-sort toggle active class on initial stacked multi mode', () => {
            container.innerHTML = `
                <table class="avalynx-table">
                    <thead>
                        <tr>
                            <th data-avalynx-table-sort-id="name">Name</th>
                            <th data-avalynx-table-sort-id="age">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>B</td><td>2</td></tr>
                        <tr><td>A</td><td>1</td></tr>
                    </tbody>
                </table>
            `;

            new AvalynxTable('.avalynx-table', {
                sorting: [
                    { column: 'name', dir: 'asc' },
                    { column: 'age', dir: 'desc' }
                ]
            });

            const toggle = container.querySelector('.avalynx-table-sort-multi-toggle');
            expect(toggle.className).toContain('active');

            toggle.click();
            expect(toggle.className).not.toContain('active');
        });
    });
});
