# AvalynxTable

[![npm version](https://img.shields.io/npm/v/avalynx-table)](https://www.npmjs.com/package/avalynx-table)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-table)](https://www.npmjs.com/package/avalynx-table)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-table)](https://www.jsdelivr.com/package/npm/avalynx-table)
[![License](https://img.shields.io/npm/l/avalynx-table)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-table/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-table/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-table/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-table)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-table?style=flat&logo=github)](https://github.com/avalynx/avalynx-table)

AvalynxTable is a lightweight, dependency-free table system designed for responsive web applications. It leverages Bootstrap (version 5.3 or higher) to provide a seamless integration with your project. When the table's breakpoint is reached, the rows and columns stack on top of each other to create an easily readable view.

## Features

- **Automatic Table Enhancement**: Enhances tables by adding data attributes to table cells based on the corresponding header row. This is particularly useful for responsive designs where table cells may need to display their headers inline on smaller screens.
- **Flexible Selector Support**: Supports custom selectors for targeting tables within the DOM. This allows for fine-grained control over which tables are enhanced.
- **Custom Breakpoints**: Allows you to specify custom breakpoints for when tables should stack on top of each other. This is useful for creating a consistent user experience across different screen sizes.
- **Opt-in Sorting**: Click table headers to sort columns in ascending/descending order when `options.sorting` is configured.
- **Multi-Sort Support**: Use `Ctrl` or `Shift` on desktop for multi-column sorting. In stacked mode, a dedicated multi-sort toggle is shown.
- **Configurable Sort Columns and Defaults**: Define sortable columns and initial sorting by column index, header name, or `data-avalynx-table-sort-id`.
- **Custom Sort Values**: Use `data-avalynx-table-sort-value` for robust sorting of formatted values like currency.
- **Stacked Sort Controls**: In stacked view, mobile-friendly sorting buttons are rendered automatically.
- **Language and Button Class Overrides**: Customize sorting labels and stacked control button classes.

## Example

Here's a simple example of how to use AvalynxTable in your project:

* [Overview](https://avalynx-table.jbs-newmedia.de/examples/index.html)
* [Table](https://avalynx-table.jbs-newmedia.de/examples/table.html)
* [Table with Options Buttons](https://avalynx-table.jbs-newmedia.de/examples/table-options.html)
* [Table with Sorting](https://avalynx-table.jbs-newmedia.de/examples/table-sorting.html)
* [Table with Custom CSS Variables](https://avalynx-table.jbs-newmedia.de/examples/table-custom-css.html)

## Installation

To use AvalynxTable in your project, you can directly include it in your HTML file. Ensure you have Bootstrap 5.3 or higher included in your project for AvalynxTable to work correctly.

First, include Bootstrap:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Then, include AvalynxTable:

```html
<link href="path/to/avalynx-table.css" rel="stylesheet">
<script src="path/to/avalynx-table.js"></script>
```

Replace `path/to/avalynx-table.js` and `path/to/avalynx-table.css` with the actual path to the files in your project.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-table/))

AvalynxTable is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<link href="https://cdn.jsdelivr.net/npm/avalynx-table@1.0.3/dist/css/avalynx-table.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-table@1.0.3/dist/js/avalynx-table.min.js"></script>
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxTable displays correctly.

## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-table))

AvalynxTable is also available as a npm package. You can add it to your project with the following command:

```bash
npm install avalynx-table
```

After installing, you can import AvalynxTable into your JavaScript file like this:

```javascript
import { AvalynxTable } from 'avalynx-table';
import 'avalynx-table/dist/css/avalynx-table.min.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxTable displays correctly.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-table
```

After installing, you can import AvalynxTable into your JavaScript file like this:

```javascript
import { AvalynxTable } from 'avalynx-table';
import 'avalynx-table/dist/css/avalynx-table.min.css';
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxTable displays correctly.

## Installation via Symfony AssetComposer

More information about the Symfony AssetComposer Bundle can be found [here](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-table/dist/css/avalynx-table.css') %}
{% do addAssetComposer('avalynx/avalynx-table/dist/js/avalynx-table.js') %}
```

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxTable displays correctly.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-table))

AvalynxTable is also available as a Composer package. You can add it to your project with the following command:

```bash
composer require avalynx/avalynx-table
```

After installing, you can import AvalynxTable into your HTML file like this:

```html
<link href="vendor/avalynx/avalynx-table/dist/css/avalynx-table.css" rel="stylesheet">
<script src="vendor/avalynx/avalynx-table/dist/js/avalynx-table.js"></script>
``` 

Make sure to also include Bootstrap's JS/CSS in your project to ensure AvalynxTable displays correctly.

## Usage

To use AvalynxTable in your project, first ensure you have tables marked up in your HTML. Then, include the AvalynxTable JavaScript file in your project and initialize the class with the appropriate selector.

```html
<table class="avalynx-table table table-bordered table-striped">
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
  <!-- More rows... -->
  </tbody>
</table>
```

```javascript
new AvalynxTable('.avalynx-table');
```

### Usage with sorting options

```html
<table id="table-sorting" class="avalynx-table avalynx-table-md table table-bordered table-striped">
  <thead>
  <tr>
    <th data-avalynx-table-sort-id="id">ID</th>
    <th data-avalynx-table-sort-id="name">Name</th>
    <th data-avalynx-table-sort-id="department">Department</th>
    <th data-avalynx-table-sort-id="salary">Salary</th>
    <th data-avalynx-sortable="false">Status</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td data-avalynx-table-sort-value="1002">1002</td>
    <td>Max Mustermann</td>
    <td>Sales</td>
    <td data-avalynx-table-sort-value="62000">62.000 €</td>
    <td>Active</td>
  </tr>
  </tbody>
</table>
```

```javascript
new AvalynxTable('#table-sorting', {
  sortableColumns: ['department', 'name', 'salary'],
  sorting: [
    { column: 'department', dir: 'asc' },
    { column: 'name', dir: 'asc' }
  ],
  stackedSorter: true,
  stackedMultiSortToggle: true
});
```

### Usage with language and button class strings

```javascript
new AvalynxTable('.avalynx-table', {
  buttonClasses: {
    multiSortInactive: 'btn-primary btn-custom-2',
    multiSortActive: 'btn-primary btn-custom-3',
    sortButtonInactive: 'btn-outline-primary btn-custom-2',
    sortButtonActive: 'btn-primary btn-custom-3'
  }
}, {
  sortByLabel: 'Sort by',
  multiSortLabel: 'Multi-search',
  multiSortOnLabel: 'on',
  multiSortOffLabel: 'off',
  columnLabel: 'Column'
});
```

## Options

AvalynxTable allows the following options for customization:

- `selector`: (string) The selector to use for targeting tables within the DOM (default: `'.avalynx-table'`).
- `options.sortableColumns`: (`Array<number|string>`) Sortable columns by index, header text, or `data-avalynx-table-sort-id`.
- `options.sorting`: (`Array<{column:number|string,dir:string}>`) Initial sorting, for example `[{ column: 'name', dir: 'asc' }]`.
  Sorting is active only when this array contains at least one rule.
- `options.stackedSorter`: (`boolean`) Show stacked sorting controls (default: `true`).
- `options.stackedMultiSortToggle`: (`boolean`) Show multi sort toggle button in stacked mode (default: `true`).
- `options.buttonClasses`: (`object`) Class strings for stacked buttons:
  - `multiSortInactive`
  - `multiSortActive`
  - `sortButtonInactive`
  - `sortButtonActive`
  - aliases: `multiSearchInactive`, `multiSearchActive`

### Sorting-related data attributes

- `data-avalynx-table-sort-id`: Stable id for a header that can be referenced in `sortableColumns` and `sorting`.
- `data-avalynx-sortable="false"`: Explicitly excludes a column from sorting.
- `data-avalynx-table-sort-value`: Optional normalized value used for sorting cell content.

### Responsive classes

Use one of the built-in table classes to define when stacking starts:

- `.avalynx-table` (sm)
- `.avalynx-table-md`
- `.avalynx-table-lg`
- `.avalynx-table-xl`
- `.avalynx-table-xxl`

### CSS variables

You can adjust stacked rendering with CSS variables, for example:

- `--avalynx-table-cell-padding-left`
- `--avalynx-table-cell-before-width`
- `--avalynx-table-before-content`
- `--avalynx-table-before-weight`

### Language

Texts are configured via the third constructor parameter `language`:

- `sortByLabel`
- `multiSortLabel`
- `multiSortOnLabel`
- `multiSortOffLabel`
- `columnLabel`
- aliases: `multiSearchLabel`, `multiSearchOnLabel`, `multiSearchOffLabel`

```javascript
new AvalynxTable('.avalynx-table', {}, {
  sortByLabel: 'Sortiere nach',
  multiSortLabel: 'Mehrfachsuche',
  multiSortOnLabel: 'an',
  multiSortOffLabel: 'aus',
  columnLabel: 'Spalte'
});
```

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes or improvements. We're looking for contributions in the following areas:

- Bug fixes
- Feature enhancements
- Documentation improvements

Before submitting your pull request, please ensure your changes are well-documented and follow the existing coding style of the project.

## License

AvalynxTable is open-sourced software licensed under the [MIT license](LICENSE).

## Contact

If you have any questions, feature requests, or issues, please open an issue on our [GitHub repository](https://github.com/avalynx/avalynx-table/issues) or submit a pull request.

Thank you for considering AvalynxTable for your project!
