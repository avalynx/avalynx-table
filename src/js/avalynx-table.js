/**
 * AvalynxTable
 *
 * A simple table system for web applications. Based on Bootstrap >=5.3 without any framework dependencies.
 *
 * @version 1.0.2
 * @license MIT
 * @author https://github.com/avalynx/avalynx-table/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-table.git
 * @bugs https://github.com/avalynx/avalynx-table/issues
 *
 * @param {string} selector - The selector to use for targeting tables within the DOM (default: '.avalynx-table').
 * @param {object} options - An object containing optional keys:
 * @param {array<number|string>} options.sortableColumns - List of sortable columns. Supports index, header label or data-avalynx-sort-id (default: all columns).
 * @param {array<{column:number|string,dir:string}>} options.sorting - Initial sorting order, e.g. [{ column: 'name', dir: 'asc' }] (default: []).
 * @param {boolean} options.stackedSorter - Shows sorting controls in stacked mode (default: true).
 * @param {boolean} options.stackedMultiSortToggle - Shows multi-sort toggle in stacked mode (default: true).
 *
 */

class AvalynxTable {
    constructor(selector, options = {}) {
        if (!selector) {
            selector = '.avalynx-table';
        }
        if (!selector.startsWith('.') && !selector.startsWith('#')) {
            selector = '.' + selector;
        }
        this.tables = document.querySelectorAll(selector);
        if (this.tables.length === 0) {
            console.error("AvalynxTable: Table(s) with selector '" + selector + "' not found");
            return;
        }
        if (options === null || typeof options !== 'object') {
            options = {};
        }
        this.options = {
            sortableColumns: [],
            sorting: [],
            stackedSorter: true,
            stackedMultiSortToggle: true,
            ...(options || {})
        };
        this.tableStates = new WeakMap();

        this._boundWindowResize = this.handleWindowResize.bind(this);
        if (this.options.stackedSorter) {
            window.addEventListener('resize', this._boundWindowResize);
        }

        this.tables.forEach(table => this.init(table));
    }

    init(table) {
        this.enhanceTable(table);
        this.setupSorting(table);
    }

    enhanceTable(table) {
        const headers = table.querySelectorAll('thead th');
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, index) => {
                if (headers[index]) {
                    cell.setAttribute('avalynx-td-title', headers[index].textContent);
                }
            });
        });
    }

    setupSorting(table) {
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');

        if (!thead || !tbody) {
            return;
        }

        const headers = Array.from(thead.querySelectorAll('th'));
        if (headers.length === 0) {
            return;
        }

        const sortableIndices = this.getSortableIndices(headers);
        if (sortableIndices.length === 0) {
            return;
        }

        const sorting = this.normalizeDefaultSorting(headers, sortableIndices);

        const state = {
            headers,
            sortableIndices,
            sorting,
            originalRows: Array.from(tbody.querySelectorAll('tr')),
            stackedControls: null,
            stackedMultiMode: false,
            sortHandler: null
        };

        headers.forEach((header, index) => {
            if (!sortableIndices.includes(index)) {
                return;
            }

            header.classList.add('avalynx-table-sorting');
            header.dataset.avalynxSortIndex = String(index);
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-label', `Sort by ${header.textContent.trim()}`);
        });

        state.sortHandler = (event) => {
            const header = event.target.closest('th.avalynx-table-sorting');
            if (!header || !thead.contains(header)) {
                return;
            }

            const column = parseInt(header.dataset.avalynxSortIndex || '', 10);
            if (Number.isNaN(column)) {
                return;
            }

            const isMultiSort = event.ctrlKey || event.shiftKey;
            this.toggleSorting(table, state, column, isMultiSort);
        };

        thead.addEventListener('click', state.sortHandler);
        thead.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            const header = event.target.closest('th.avalynx-table-sorting');
            if (!header || !thead.contains(header)) {
                return;
            }

            event.preventDefault();

            const column = parseInt(header.dataset.avalynxSortIndex || '', 10);
            if (Number.isNaN(column)) {
                return;
            }

            const isMultiSort = event.ctrlKey || event.shiftKey;
            this.toggleSorting(table, state, column, isMultiSort);
        });

        if (this.options.stackedSorter) {
            state.stackedControls = this.createStackedSortControls(table, state);
            this.updateStackedSortControls(table, state);
            this.updateStackedSortControlsVisibility(table, state);
        }

        this.tableStates.set(table, state);
        this.applySorting(table, state);
        this.updateSortUI(table, state);
    }

    getSortableIndices(headers) {
        if (!Array.isArray(this.options.sortableColumns) || this.options.sortableColumns.length === 0) {
            return headers
                .map((_, index) => index)
                .filter(index => headers[index].dataset.avalynxSortable !== 'false');
        }

        const byId = new Map();
        const byName = new Map();

        headers.forEach((header, index) => {
            const id = (header.dataset.avalynxSortId || '').trim();
            const name = (header.textContent || '').trim().toLowerCase();

            if (id) {
                byId.set(id, index);
            }
            if (name) {
                byName.set(name, index);
            }
        });

        const indices = this.options.sortableColumns
            .map((column) => this.resolveColumnIndex(column, headers, byId, byName))
            .filter(index => index !== -1)
            .filter(index => headers[index].dataset.avalynxSortable !== 'false');

        return [...new Set(indices)].sort((a, b) => a - b);
    }

    resolveColumnIndex(column, headers, byId, byName) {
        if (typeof column === 'number' && Number.isInteger(column) && headers[column]) {
            return column;
        }

        if (typeof column === 'string') {
            const raw = column.trim();
            if (!raw) {
                return -1;
            }

            if (byId.has(raw)) {
                return byId.get(raw);
            }

            const asNumber = Number.parseInt(raw, 10);
            if (!Number.isNaN(asNumber) && headers[asNumber]) {
                return asNumber;
            }

            const byNameIndex = byName.get(raw.toLowerCase());
            if (typeof byNameIndex === 'number') {
                return byNameIndex;
            }
        }

        return -1;
    }

    normalizeDefaultSorting(headers, sortableIndices) {
        if (!Array.isArray(this.options.sorting)) {
            return [];
        }

        const byId = new Map();
        const byName = new Map();

        headers.forEach((header, index) => {
            const id = (header.dataset.avalynxSortId || '').trim();
            const name = (header.textContent || '').trim().toLowerCase();

            if (id) {
                byId.set(id, index);
            }
            if (name) {
                byName.set(name, index);
            }
        });

        return this.options.sorting
            .map((sortEntry) => {
                if (!sortEntry || typeof sortEntry !== 'object') {
                    return null;
                }

                const column = this.resolveColumnIndex(sortEntry.column, headers, byId, byName);
                if (!sortableIndices.includes(column)) {
                    return null;
                }

                const dir = sortEntry.dir === 'desc' ? 'desc' : 'asc';
                return { column, dir };
            })
            .filter(Boolean)
            .filter((entry, index, array) => index === array.findIndex(item => item.column === entry.column));
    }

    toggleSorting(table, state, column, isMultiSort = false) {
        const existingIndex = state.sorting.findIndex(item => item.column === column);
        const existing = existingIndex !== -1 ? state.sorting[existingIndex] : null;
        const nextDir = existing && existing.dir === 'asc' ? 'desc' : 'asc';

        if (!isMultiSort) {
            state.sorting = [{ column, dir: nextDir }];
        } else {
            if (existingIndex !== -1) {
                state.sorting.splice(existingIndex, 1);
            }
            state.sorting.unshift({ column, dir: nextDir });
        }

        this.applySorting(table, state);
        this.updateSortUI(table, state);
    }

    applySorting(table, state) {
        const tbody = table.querySelector('tbody');
        if (!tbody) {
            return;
        }

        const rowsWithIndex = state.originalRows.map((row, index) => ({ row, index }));
        const sorting = state.sorting;

        if (sorting.length > 0) {
            rowsWithIndex.sort((a, b) => {
                for (const sort of sorting) {
                    const compare = this.compareRows(a.row, b.row, sort.column, sort.dir);
                    if (compare !== 0) {
                        return compare;
                    }
                }

                return a.index - b.index;
            });
        }

        const fragment = document.createDocumentFragment();
        rowsWithIndex.forEach(({ row }) => fragment.appendChild(row));
        tbody.innerHTML = '';
        tbody.appendChild(fragment);
    }

    compareRows(rowA, rowB, column, dir) {
        const cellA = rowA.children[column];
        const cellB = rowB.children[column];

        const valueA = this.getCellSortValue(cellA);
        const valueB = this.getCellSortValue(cellB);

        let result;
        if (valueA.numeric && valueB.numeric) {
            result = valueA.number - valueB.number;
        } else {
            result = valueA.text.localeCompare(valueB.text, undefined, {
                numeric: true,
                sensitivity: 'base'
            });
        }

        return dir === 'desc' ? result * -1 : result;
    }

    getCellSortValue(cell) {
        if (!cell) {
            return {
                text: '',
                numeric: false,
                number: 0
            };
        }

        const raw = (cell.dataset.avalynxSortValue || cell.textContent || '').trim();
        const normalized = raw.replace(/\s+/g, '');
        const numericCandidate = normalized.replace(',', '.');
        const number = Number.parseFloat(numericCandidate);
        const numeric = Number.isFinite(number) && /^[-+]?\d+(?:[.,]\d+)?$/.test(numericCandidate);

        return {
            text: raw,
            numeric,
            number: numeric ? number : 0
        };
    }

    updateSortUI(table, state) {
        state.headers.forEach((header, index) => {
            header.classList.remove('avalynx-table-sorting-asc', 'avalynx-table-sorting-desc');
            header.removeAttribute('data-avalynx-sort-order');

            const sortIndex = state.sorting.findIndex(item => item.column === index);
            if (sortIndex === -1) {
                return;
            }

            const dir = state.sorting[sortIndex].dir;
            header.classList.add(dir === 'asc' ? 'avalynx-table-sorting-asc' : 'avalynx-table-sorting-desc');
            header.dataset.avalynxSortOrder = String(sortIndex + 1);
        });

        this.updateStackedSortControls(table, state);
    }

    createStackedSortControls(table, state) {
        const controls = document.createElement('div');
        controls.className = 'avalynx-table-sort-controls';

        if (this.options.stackedMultiSortToggle) {
            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'btn btn-sm btn-outline-secondary avalynx-table-sort-multi-toggle';
            toggle.textContent = 'Multi-sort: off';
            toggle.addEventListener('click', () => {
                state.stackedMultiMode = !state.stackedMultiMode;
                toggle.textContent = `Multi-sort: ${state.stackedMultiMode ? 'on' : 'off'}`;
                toggle.classList.toggle('active', state.stackedMultiMode);
            });
            controls.appendChild(toggle);
        }

        const buttons = document.createElement('div');
        buttons.className = 'avalynx-table-sort-buttons';

        state.sortableIndices.forEach((columnIndex) => {
            const header = state.headers[columnIndex];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn btn-sm btn-outline-primary avalynx-table-sort-button';
            button.dataset.avalynxSortButton = String(columnIndex);
            button.textContent = header.textContent.trim() || `Column ${columnIndex + 1}`;

            button.addEventListener('click', (event) => {
                const isMultiSort = event.ctrlKey || event.shiftKey || state.stackedMultiMode;
                this.toggleSorting(table, state, columnIndex, isMultiSort);
            });

            buttons.appendChild(button);
        });

        controls.appendChild(buttons);
        table.parentNode.insertBefore(controls, table);

        return controls;
    }

    updateStackedSortControls(table, state) {
        if (!state.stackedControls) {
            return;
        }

        const buttonsContainer = state.stackedControls.querySelector('.avalynx-table-sort-buttons');
        if (!buttonsContainer) {
            return;
        }

        const sortButtons = buttonsContainer.querySelectorAll('[data-avalynx-sort-button]');
        const buttonByColumn = new Map();
        sortButtons.forEach((button) => {
            const column = parseInt(button.dataset.avalynxSortButton || '', 10);
            if (Number.isNaN(column)) {
                return;
            }

            buttonByColumn.set(column, button);

            button.classList.remove('active', 'avalynx-table-sorting-asc', 'avalynx-table-sorting-desc');
            button.removeAttribute('data-avalynx-sort-order');

            const sortIndex = state.sorting.findIndex(item => item.column === column);
            if (sortIndex === -1) {
                return;
            }

            const dir = state.sorting[sortIndex].dir;
            button.classList.add('active', dir === 'asc' ? 'avalynx-table-sorting-asc' : 'avalynx-table-sorting-desc');
            button.dataset.avalynxSortOrder = String(sortIndex + 1);
        });

        const sortedColumns = state.sorting.map(sort => sort.column);
        const remainingColumns = state.sortableIndices.filter(column => !sortedColumns.includes(column));
        const visualOrder = [...sortedColumns, ...remainingColumns];

        visualOrder.forEach((column) => {
            const button = buttonByColumn.get(column);
            if (button) {
                buttonsContainer.appendChild(button);
            }
        });
    }

    getStackedBreakpoint(table) {
        const breakpoints = [
            { className: 'avalynx-table-xxl', max: 1399.98 },
            { className: 'avalynx-table-xl', max: 1199.98 },
            { className: 'avalynx-table-lg', max: 991.98 },
            { className: 'avalynx-table-md', max: 767.98 },
            { className: 'avalynx-table', max: 575.98 }
        ];

        for (const breakpoint of breakpoints) {
            if (table.classList.contains(breakpoint.className)) {
                return breakpoint.max;
            }
        }

        return null;
    }

    isStacked(table) {
        const breakpoint = this.getStackedBreakpoint(table);
        if (breakpoint === null) {
            return false;
        }

        if (typeof window.matchMedia !== 'function') {
            return false;
        }

        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    }

    updateStackedSortControlsVisibility(table, state) {
        if (!state.stackedControls) {
            return;
        }

        state.stackedControls.style.display = this.isStacked(table) ? 'flex' : 'none';
    }

    handleWindowResize() {
        this.tables.forEach((table) => {
            const state = this.tableStates.get(table);
            if (!state) {
                return;
            }

            this.updateStackedSortControlsVisibility(table, state);
        });
    }
}

/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AvalynxTable;
}
