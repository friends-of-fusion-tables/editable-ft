import {html, TemplateResult} from '../node_modules/lit-html/lit-html.js';
import {ArrayRenderAdvice} from './objectEditor';
import {ObjectRenderAdvice, valueEditorFactory} from './objectEditor.js';
import {redrawPage} from './pageView.js';
import {MetaViewModel} from './viewModel.js';

// Based on https://developers.google.com/fusiontables/docs/v2/reference/table and
// https://developers.google.com/fusiontables/docs/v2/reference/column
const advice: ObjectRenderAdvice = {
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
    columnPropertiesJsonSchema: {type: 'string', display: false},
    isExportable: {title: 'Exportable?', type: 'boolean'},
    columns: {
      type: 'array',
      title: 'Columns',
      items: {
        type: 'object',
        properties: {
          name: {type: 'string', title: 'Name'},
          description: {type: 'string', title: 'Description'},
          type: {type: 'string', title: 'Type', enum: ['DATETIME', 'LOCATION', 'NUMBER', 'STRING']},
          validValues: {
            type: 'array',
            description: 'List of valid values used to validate data ' +
                'and supply a drop-down list of values in the web application',
            items: {type: 'string'}
          },
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
          },
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
      }
    } as ArrayRenderAdvice
  }
};
const editorFactory = valueEditorFactory(advice);

export function tableMeta(model: MetaViewModel): TemplateResult {
  const factory: TemplateResult = editorFactory(model.table, updateValue, onchange, redrawPage);
  return html`
    <div class="pure-form pure-form-aligned">
      ${factory}
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