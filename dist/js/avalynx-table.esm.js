/**
 * AvalynxTable
 *
 * A simple table system for web applications. Based on Bootstrap >=5.3 without any framework dependencies.
 *
 * @version 0.0.3
 * @license MIT
 * @author https://github.com/avalynx/avalynx-table/graphs/contributors
 * @website https://github.com/avalynx/
 * @repository https://github.com/avalynx/avalynx-table.git
 * @bugs https://github.com/avalynx/avalynx-table/issues
 *
 * @param {string} selector - The selector to use for targeting tables within the DOM (default: '.avalynx-table').
 * @param {object} options - An object containing the following keys: (*coming soon*)
 *
 */

export class AvalynxTable {
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
        this.tables.forEach(table => this.init(table));
    }

    init(table) {
        this.enhanceTable(table);
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
}
