import {html, TemplateResult} from '../node_modules/lit-html/lit-html';
import {ArrayRenderAdvice, ObjectRenderAdvice, renderAdvice, StringRenderAdvice, valueEditorFactory, ValueEditorFactory} from './objectEditor';
import {redrawPage} from './pageView';
import {MetaViewModel} from './viewModel';

// Based on https://developers.google.com/fusiontables/docs/v2/reference/column
const columnAdvice: ObjectRenderAdvice = {
  type: 'object',
  properties: {
    name: {type: 'string', title: 'Name'},
    description: {type: 'string', title: 'Description'},
    type: {type: 'string', title: 'Type', enum: ['DATETIME', 'LOCATION', 'NUMBER', 'STRING']} as
        StringRenderAdvice,
    validValues: {
      type: 'array',
      description: 'List of valid values used to validate data ' +
          'and supply a drop-down list of values in the web application',
      items: {type: 'string'}
    } as ArrayRenderAdvice,
    validateData: {
      type: 'boolean',
      description: 'If true, data entered via the web application is validated'
    },
    baseColumn: {type: 'object', display: false},
    columnId: {type: 'number', title: 'Column ID', readOnly: true},
    formatPattern: {
      type: 'string',
      title: 'Format pattern',
      enum: [
        'DT_DATE_MEDIUM',
        'DT_DATE_SHORT',
        'DT_DATE_TIME_MEDIUM',
        'DT_DATE_TIME_SHORT',
        'DT_DAY_MONTH_2_DIGIT_YEAR',
        'DT_DAY_MONTH_2_DIGIT_YEAR_TIME',
        'DT_DAY_MONTH_2_DIGIT_YEAR_TIME_MERIDIAN',
        'DT_DAY_MONTH_4_DIGIT_YEAR',
        'DT_DAY_MONTH_4_DIGIT_YEAR_TIME',
        'DT_DAY_MONTH_4_DIGIT_YEAR_TIME_MERIDIAN',
        'DT_ISO_YEAR_MONTH_DAY',
        'DT_ISO_YEAR_MONTH_DAY_TIME',
        'DT_MONTH_DAY_4_DIGIT_YEAR',
        'DT_TIME_LONG',
        'DT_TIME_MEDIUM',
        'DT_TIME_SHORT',
        'DT_YEAR_ONLY',
        'HIGHLIGHT_UNTYPED_CELLS',
        'NONE',
        'NUMBER_CURRENCY',
        'NUMBER_DEFAULT',
        'NUMBER_INTEGER',
        'NUMBER_NO_SEPARATOR',
        'NUMBER_PERCENT',
        'NUMBER_SCIENTIFIC',
        'STRING_EIGHT_LINE_IMAGE',
        'STRING_FOUR_LINE_IMAGE',
        'STRING_JSON_TEXT',
        'STRING_LINK',
        'STRING_ONE_LINE_IMAGE',
        'STRING_VIDEO_OR_MAP'
      ]
    } as StringRenderAdvice,
    graphPredicate: {
      type: 'string',
      title: 'Column graph predicate',
      description: 'Used to map table to graph data model (subject,predicate,object). ' +
          'See W3C Graph-based Data Model'
    },
    columnJsonSchema: {
      type: 'string',
      title: 'Column JSON schema',
      description: 'JSON schema for interpreting column properties JSON'
    },
    columnPropertiesJson: {
      type: 'string',
      title: 'Column properties JSON',
      description: 'Custom column properties in JSON format'
    },
    kind: {type: 'string', display: false}
  }
};
/*
const basicSchemaRenderAdvice: ObjectRenderAdvice = {
  type: 'object',
  properties: {
    type: {type: 'string', enum: ['object', 'array', 'string', 'boolean', 'number']} as
        StringRenderAdvice,
    title: {type: 'string'},
    description: {type: 'string'},
    display: {type: 'boolean'},
    readOnly: {type: 'boolean'},
    pattern: {type: 'string'},
    maxLength: {type: 'number'},
    minLength: {type: 'number'},
    enum: {type: 'array', items: {type: 'string'}} as ArrayRenderAdvice
  }
};
const schemaValueEditorFactory = valueEditorFactory(basicSchemaRenderAdvice);

// Schema arrives as string, not object.
const schemaEditor: ValueEditorFactory = (value, updateValue, onchange, redraw) =>
    schemaValueEditorFactory(
        JSON.parse(value as string), v => updateValue(JSON.stringify(v)), onchange, redraw);
*/

/**
 * Editor for strings that should be treated like objects. Parsed before editing and stringified on
 * update.
 *
 * @param title replacement for title from render advice
 * @param advice rendering advice for the parsed object
 */
const stringAsObject = (title: string, advice?: ObjectRenderAdvice) => {
  if (!advice) advice = {type: 'object', properties: {}} as ObjectRenderAdvice;
  const objectEditorFactory = valueEditorFactory({...advice, title});
  const stringObjectAdapter: ValueEditorFactory = (value, updateValue, onchange, redraw) =>
      objectEditorFactory(
          JSON.parse(value || '{}'), v => updateValue(JSON.stringify(v)), onchange, redraw);
  return {type: 'string', title, customEditor: stringObjectAdapter} as StringRenderAdvice;
};

// Based on https://developers.google.com/fusiontables/docs/v2/reference/table
const genericTableAdvice: ObjectRenderAdvice = {
  type: 'object',
  title: 'Table properties',
  expanded: true,
  properties: {
    name: {type: 'string', title: 'Name'},
    description:
        {title: 'Description', description: 'Description assigned to the table', type: 'string'},
    tableId: {type: 'string', readOnly: true},
    attribution:
        {title: 'Attribution', description: 'Attribution assigned to the table.', type: 'string'},
    attributionLink: {type: 'string', title: 'Attribution link'},
    baseTableIds: {type: 'array', display: false},
    kind: {type: 'string', display: false},
    tablePropertiesJson: stringAsObject('Custom Properties'),
    isExportable: {title: 'Exportable?', type: 'boolean'},
    columns: {type: 'array', title: 'Columns', display: false, items: columnAdvice} as
        ArrayRenderAdvice,
    tablePropertiesJsonSchema: stringAsObject('Properties Schema'),
    columnPropertiesJsonSchema: stringAsObject('Column Properties Schema')
  }
};

const tableAdvice = (table: gapi.client.fusiontables.Table) =>
    !table.tablePropertiesJsonSchema || table.tablePropertiesJsonSchema == '' ?
    genericTableAdvice :
    {
      ...genericTableAdvice,
      properties: {
        ...genericTableAdvice.properties,
        tablePropertiesJson: stringAsObject(
            'Custom Properties',
            renderAdvice(
                JSON.parse(table.tablePropertiesJsonSchema),
                (table.columns || []).map(c => c.name || '')) as ObjectRenderAdvice)
      }
    };
var editorFactory: ValueEditorFactory|undefined;
var editorFactoryId: string|undefined;
export function tableMeta(model: MetaViewModel): TemplateResult {
  if (!editorFactory || !editorFactoryId || model.table.tableId != editorFactoryId) {
    editorFactory = valueEditorFactory(tableAdvice(model.table));
    editorFactoryId = model.table.tableId;
  }
  const editor = editorFactory(model.table, updateValue, onchange, redrawPage);
  return html`
    <div class="pure-form pure-form-aligned">
      ${editor}
    </div>
    <div class="pure-button-primary pure-button"
      ?disabled=${!model.isDirty}
      @click=${model.saveChanges}>Save changes</div>`;

  function updateValue(v: any) {
    console.log('updated ' + JSON.stringify(v));
  }

  function onchange() {
    const wasClean = !model.isDirty;
    if (wasClean) {
      model.isDirty = true;
      redrawPage();
    }
  }
}