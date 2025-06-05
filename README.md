# AvalynxTable

AvalynxTable is a lightweight, dependency-free table system designed for responsive web applications. It leverages Bootstrap (version 5.3 or higher) to provide a seamless integration with your project. When the table's breakpoint is reached, the rows and columns stack on top of each other to create an easily readable view.

## Features

- **Automatic Table Enhancement**: Enhances tables by adding data attributes to table cells based on the corresponding header row. This is particularly useful for responsive designs where table cells may need to display their headers inline on smaller screens.
- **Flexible Selector Support**: Supports custom selectors for targeting tables within the DOM. This allows for fine-grained control over which tables are enhanced.
- **Custom Breakpoints**: Allows you to specify custom breakpoints for when tables should stack on top of each other. This is useful for creating a consistent user experience across different screen sizes.

## Example

Here's a simple example of how to use AvalynxTable in your project:

* [Overview](https://avalynx-table.jbs-newmedia.de/examples/index.html)
* [Table](https://avalynx-table.jbs-newmedia.de/examples/table.html)

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
<link href="https://cdn.jsdelivr.net/npm/avalynx-table@1.0.0/dist/css/avalynx-table.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-table@1.0.0/dist/js/avalynx-table.min.js"></script>
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

## Options

AvalynxTable allows the following options for customization:

- `selector`: (string) The selector to use for targeting tables within the DOM (default: `'.avalynx-table'`).
- `options`: An object containing the following keys: (**coming soon**)

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
