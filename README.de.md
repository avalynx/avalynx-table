# AvalynxTable

[![npm version](https://img.shields.io/npm/v/avalynx-table)](https://www.npmjs.com/package/avalynx-table)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-table)](https://www.npmjs.com/package/avalynx-table)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-table)](https://www.jsdelivr.com/package/npm/avalynx-table)
[![Lizenz](https://img.shields.io/npm/l/avalynx-table)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-table/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-table/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-table/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-table)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-table?style=flat&logo=github)](https://github.com/avalynx/avalynx-table)

AvalynxTable ist ein leichtgewichtiges, abhängigkeitsfreies Tabellensystem, das für responsive Webanwendungen entwickelt wurde. Es nutzt Bootstrap (Version 5.3 oder höher), um eine nahtlose Integration in Ihr Projekt zu ermöglichen. Wenn der Breakpoint der Tabelle erreicht wird, werden die Zeilen und Spalten übereinander gestapelt, um eine leicht lesbare Ansicht zu erstellen.

## Funktionen

- **Automatische Tabellenerweiterung**: Erweitert Tabellen durch Hinzufügen von Datenattributen zu Tabellenzellen basierend auf der entsprechenden Kopfzeile. Dies ist besonders nützlich für responsive Designs, bei denen Tabellenzellen ihre Header auf kleineren Bildschirmen inline anzeigen müssen.
- **Flexible Selector-Unterstützung**: Unterstützt benutzerdefinierte Selektoren für das Ansprechen von Tabellen innerhalb des DOM. Dies ermöglicht eine feingranulare Kontrolle darüber, welche Tabellen erweitert werden.
- **Benutzerdefinierte Breakpoints**: Ermöglicht die Angabe benutzerdefinierter Breakpoints für den Zeitpunkt, an dem Tabellen übereinander gestapelt werden sollen. Dies ist nützlich, um eine konsistente Benutzererfahrung über verschiedene Bildschirmgrößen hinweg zu schaffen.
- **Optionale Sortierung**: Sortieren per Klick auf Spaltenüberschriften (aufsteigend/absteigend), sobald `options.sorting` konfiguriert ist.
- **Multi-Sort-Unterstützung**: Auf Desktop mit `Ctrl` oder `Shift` mehrere Spalten sortieren. Im Stacked-Modus wird ein eigener Multi-Sort-Schalter angezeigt.
- **Konfigurierbare Sortierspalten und Defaults**: Definieren Sie sortierbare Spalten und initiale Sortierungen per Index, Spaltenname oder `data-avalynx-table-sort-id`.
- **Benutzerdefinierte Sortierwerte**: Mit `data-avalynx-table-sort-value` lassen sich formatierte Werte wie Währungen sauber sortieren.
- **Stacked-Sortiersteuerung**: In der gestapelten Ansicht werden automatisch mobile Sortierbuttons eingeblendet.
- **Anpassbare Sprache und Button-Klassen**: Beschriftungen und CSS-Klassen für Sortierbuttons sind konfigurierbar.

## Beispiel

Hier ist ein einfaches Beispiel für die Verwendung von AvalynxTable in Ihrem Projekt:

* [Übersicht](https://avalynx-table.jbs-newmedia.de/examples/index.html)
* [Tabelle](https://avalynx-table.jbs-newmedia.de/examples/table.html)
* [Tabelle mit Options-Buttons](https://avalynx-table.jbs-newmedia.de/examples/table-options.html)
* [Tabelle mit Sortierung](https://avalynx-table.jbs-newmedia.de/examples/table-sorting.html)
* [Tabelle mit benutzerdefinierten CSS-Variablen](https://avalynx-table.jbs-newmedia.de/examples/table-custom-css.html)

## Installation

Um AvalynxTable in Ihrem Projekt zu verwenden, können Sie es direkt in Ihre HTML-Datei einbinden. Stellen Sie sicher, dass Sie Bootstrap 5.3 oder höher in Ihrem Projekt eingebunden haben, damit AvalynxTable korrekt funktioniert.

Zuerst Bootstrap einbinden:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Dann AvalynxTable einbinden:

```html
<link href="path/to/avalynx-table.css" rel="stylesheet">
<script src="path/to/avalynx-table.js"></script>
```

Ersetzen Sie `path/to/avalynx-table.js` und `path/to/avalynx-table.css` durch den tatsächlichen Pfad zu den Dateien in Ihrem Projekt.

## Installation über jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-table/))

AvalynxTable ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Sie können es wie folgt in Ihr Projekt einbinden:

```html
<link href="https://cdn.jsdelivr.net/npm/avalynx-table@1.0.3/dist/css/avalynx-table.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/avalynx-table@1.0.3/dist/js/avalynx-table.min.js"></script>
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxTable zu gewährleisten.

## Installation über NPM ([Link](https://www.npmjs.com/package/avalynx-table))

AvalynxTable ist auch als npm-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
npm install avalynx-table
```

Nach der Installation können Sie AvalynxTable wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxTable } from 'avalynx-table';
import 'avalynx-table/dist/css/avalynx-table.min.css';
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxTable zu gewährleisten.

## Installation über Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-table
```

Nach der Installation können Sie AvalynxTable wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxTable } from 'avalynx-table';
import 'avalynx-table/dist/css/avalynx-table.min.css';
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxTable zu gewährleisten.

## Installation über Symfony AssetComposer

Weitere Informationen zum Symfony AssetComposer Bundle finden Sie [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-table/dist/css/avalynx-table.css') %}
{% do addAssetComposer('avalynx/avalynx-table/dist/js/avalynx-table.js') %}
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxTable zu gewährleisten.

## Installation über Composer ([Link](https://packagist.org/packages/avalynx/avalynx-table))

AvalynxTable ist auch als Composer-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-table
```

Nach der Installation können Sie AvalynxTable wie folgt in Ihre HTML-Datei einbinden:

```html
<link href="vendor/avalynx/avalynx-table/dist/css/avalynx-table.css" rel="stylesheet">
<script src="vendor/avalynx/avalynx-table/dist/js/avalynx-table.js"></script>
``` 

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxTable zu gewährleisten.

## Verwendung

Um AvalynxTable in Ihrem Projekt zu verwenden, stellen Sie zunächst sicher, dass Sie Tabellen in Ihrem HTML entsprechend markiert haben. Binden Sie dann die JavaScript-Datei von AvalynxTable in Ihr Projekt ein und initialisieren Sie die Klasse mit dem entsprechenden Selektor.

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
    <td>Zelle 1</td>
    <td>Zelle 2</td>
  </tr>
  <!-- Weitere Zeilen... -->
  </tbody>
</table>
```

```javascript
new AvalynxTable('.avalynx-table');
```

### Verwendung mit Sortieroptionen

```html
<table id="table-sorting" class="avalynx-table avalynx-table-md table table-bordered table-striped">
  <thead>
  <tr>
    <th data-avalynx-table-sort-id="id">ID</th>
    <th data-avalynx-table-sort-id="name">Name</th>
    <th data-avalynx-table-sort-id="department">Abteilung</th>
    <th data-avalynx-table-sort-id="salary">Gehalt</th>
    <th data-avalynx-sortable="false">Status</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td data-avalynx-table-sort-value="1002">1002</td>
    <td>Max Mustermann</td>
    <td>Vertrieb</td>
    <td data-avalynx-table-sort-value="62000">62.000 €</td>
    <td>Aktiv</td>
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

### Verwendung mit Sprache und Button-Class-Strings

```javascript
new AvalynxTable('.avalynx-table', {
  buttonClasses: {
    multiSortInactive: 'btn-primary btn-custom-2',
    multiSortActive: 'btn-primary btn-custom-3',
    sortButtonInactive: 'btn-outline-primary btn-custom-2',
    sortButtonActive: 'btn-primary btn-custom-3'
  }
}, {
  sortByLabel: 'Sortiere nach',
  multiSortLabel: 'Mehrfachsuche',
  multiSortOnLabel: 'an',
  multiSortOffLabel: 'aus',
  columnLabel: 'Spalte'
});
```

## Optionen

AvalynxTable ermöglicht die folgenden Optionen zur Anpassung:

- `selector`: (string) Der Selektor, der für das Ansprechen von Tabellen innerhalb des DOM verwendet werden soll (Standard: `'.avalynx-table'`).
- `options.sortableColumns`: (`Array<number|string>`) Sortierbare Spalten per Index, Spaltentext oder `data-avalynx-table-sort-id`.
- `options.sorting`: (`Array<{column:number|string,dir:string}>`) Initiale Sortierung, z.B. `[{ column: 'name', dir: 'asc' }]`.
  Die Sortierung ist nur aktiv, wenn dieses Array mindestens eine Regel enthält.
- `options.stackedSorter`: (`boolean`) Gestapelte Sortiersteuerung anzeigen (Standard: `true`).
- `options.stackedMultiSortToggle`: (`boolean`) Multi-Sort-Umschalter im Stacked-Modus anzeigen (Standard: `true`).
- `options.buttonClasses`: (`object`) Class-Strings für gestapelte Buttons:
  - `multiSortInactive`
  - `multiSortActive`
  - `sortButtonInactive`
  - `sortButtonActive`
  - Aliase: `multiSearchInactive`, `multiSearchActive`

### Sortierbezogene Datenattribute

- `data-avalynx-table-sort-id`: Stabile ID für Header, die in `sortableColumns` und `sorting` referenziert werden kann.
- `data-avalynx-sortable="false"`: Schließt eine Spalte explizit von der Sortierung aus.
- `data-avalynx-table-sort-value`: Optionaler normalisierter Wert für die Sortierung von Zellinhalten.

### Responsive-Klassen

Nutzen Sie eine der integrierten Tabellenklassen, um den Stacking-Breakpoint festzulegen:

- `.avalynx-table` (sm)
- `.avalynx-table-md`
- `.avalynx-table-lg`
- `.avalynx-table-xl`
- `.avalynx-table-xxl`

### CSS-Variablen

Das Verhalten im Stacked-Modus kann über CSS-Variablen angepasst werden, z.B.:

- `--avalynx-table-cell-padding-left`
- `--avalynx-table-cell-before-width`
- `--avalynx-table-before-content`
- `--avalynx-table-before-weight`

### Sprache

Texte werden über den dritten Constructor-Parameter `language` konfiguriert:

- `sortByLabel`
- `multiSortLabel`
- `multiSortOnLabel`
- `multiSortOffLabel`
- `columnLabel`
- Aliase: `multiSearchLabel`, `multiSearchOnLabel`, `multiSearchOffLabel`

```javascript
new AvalynxTable('.avalynx-table', {}, {
  sortByLabel: 'Sortiere nach',
  multiSortLabel: 'Mehrfachsuche',
  multiSortOnLabel: 'an',
  multiSortOffLabel: 'aus',
  columnLabel: 'Spalte'
});
```

## Mitwirken

Beiträge sind willkommen! Wenn Sie einen Beitrag leisten möchten, forken Sie bitte das Repository und senden Sie einen Pull-Request mit Ihren Änderungen oder Verbesserungen. Wir suchen nach Beiträgen in den folgenden Bereichen:

- Fehlerbehebungen (Bug fixes)
- Funktionserweiterungen
- Dokumentationsverbesserungen

Bevor Sie Ihren Pull-Request absenden, stellen Sie bitte sicher, dass Ihre Änderungen gut dokumentiert sind und dem bestehenden Codestil des Projekts entsprechen.

## Lizenz

AvalynxTable ist eine quelloffene Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn Sie Fragen, Funktionswünsche oder Probleme haben, eröffnen Sie bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-table/issues) oder senden Sie einen Pull-Request.

Vielen Dank, dass Sie AvalynxTable für Ihr Projekt in Betracht ziehen!
