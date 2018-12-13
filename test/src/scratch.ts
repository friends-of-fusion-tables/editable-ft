import {renderAdvice, RenderAdvice, valueEditorFactory} from '../../src/objectEditor'
import {html, render} from '../../node_modules/lit-html/lit-html';

const properties = {
  'force_rank': true,
  'source_key_column': 'Title',
  'scrape_rating_requests': {},
  'subtitle': 'Big Bang Theory character',
  'active': true,
  'in_maintenance': true,
  'english_description': 'Fictional character on the TV program Big Bang Theory.',
  'batch_id': 'exp',
  'sideways_vr': {'name_msg': '', 'visible': false},
  'text_lang': 'en',
  'type_prefix': '/kp_lw',
  'recon_score_threshold': 0.9,
  'experiment_cls': ['207870049'],
  'entity_pattern': ['big bang theory X', 'X big bang theory'],
  'global_assertions': [
    {'val': '/fictional_universe/fictional_character', 'pred': '/type/object/type'},
    {
      'val': '/m/02r5qtm',
      'pred': '/tv/tv_character/appeared_in_tv_program./tv/regular_tv_appearance/series'
    }
  ],
  'triggering_lang_list': ['en-*'],
  'override_subtitles': true,
  'english_name': 'Big Bang Theory character',
  'kp_lw_ids': true,
  'type': '/kp_lw/big_bang_theory_character',
  'scrape_experiment_epoch': '2018-1003-102042',
  'in_live_experiment': false,
  'reconciliation_type': ['/tv/tv_character'],
  'eas_experiment_ids': {
    'kp_sxs_unrated_force': 'kp-lightweight.Sa391fa28920a4d3ebfca090b30f8f5c2',
    'tts_sxs_unrated_sample': 'kp-lightweight.S0ec8f900c2d348099e1c1cd253d2af76',
    'kp_sxs_unrated_random': 'kp-lightweight.S2703d9aa2e3e45b8a501fd318881b71c',
    'tts_sxs_unrated': 'kp-lightweight.Sc8ba016506ef40e6ae1bc0aa64aa88bd',
    'list_sxs_unrated': 'kp-lightweight.Sfe50eeb23dfb46e5b6804003d2a766fb',
    'pp_sxs_unrated': 'kp-lightweight.Sf6f6991468244f20a1e19c2fd3a8ad7e',
    'kp_hmetric_unrated': 'kp-lightweight.Sf56ba69bdcb244f8b0ea57403adf91cf',
    'kp_sxs_unrated_best': 'kp-lightweight.S4e02b916d3e9485cb703907771a26698',
    'kp_hmetric_unrated_sample': 'kp-lightweight.Sf56ba69bdcb244f8b0ea57403adf91cf'
  },
  'collection': '/collection/knowledge_panels/lw_big_bang_theory_character',
  'generate_production_collection_triples': true,
  'associated_tables': {
    'row_errors_merge': '',
    'kp_hmetric_unrated_sample': '1Y2Tyr_iW6Z2PH-6sHMo1tMt3X4tpoxgA_CfHM5qs',
    'triggering_aliases': '1Jh1H83ztsJa2BIG66_M8t9rCaJQtO3tZdrH8m4IR',
    'pattern_gen': '',
    'pp_sxs_unrated': '1VMd6com6DThB8-qp6f2RNt-sxmaqyk0Tc61kxmaF',
    'cvt_data_merge': '',
    'cvt_data': '',
    'kp_sxs_unrated_force': '1scxLTuRkLVBvnaFGEKCIFBNhIydVw7jJFKbLaFOc',
    'kp_sxs_rated_random': '',
    'suggested_attributes': '1wUUW1Sk7nM7ZhLZzPF0mLJKuCCXPCofzf71hNaOF',
    'existing_facts': '',
    'tts_sxs_unrated_sample': '',
    'kp_hmetric_unrated': '1Y2Tyr_iW6Z2PH-6sHMo1tMt3X4tpoxgA_CfHM5qs',
    'row_errors': '',
    'knowledge_panel_scrapes_rated': '',
    'kp_sxs_unrated_best': '',
    'kp_sxs_unrated_random': '1t4C6_ioXSv3gLnQreVa6jbG-lDTgNU2Qr_q8wtBY',
    'tts_sxs_unrated': '',
    'list_sxs_unrated': '1yskEExyuhPN5V1TQIPSc0mPRNHWgcm7WznD_3W87',
    'reconciliation_worksheet': '13m8xLGUR3J-2AnGTmfG7abiuUWkIQZ2Pn2EIqyFp',
    'triggering_aliases_merge': '1cflzTbj8PA_NURU2uGiBqnHHzrjRMJTaR06WEEb2',
    'tts_sxs_rated': ''
  },
  'batch_associated_tables': {},
  'generate_triples': true,
  'fact_list': [
    'Portrayed by',
    'Born',
    'Significant other',
    'Children',
    'Parents',
    'Siblings',
    'Occupations',
    'IQ',
    'First episode'
  ],
  'image_display': 'CROPPING_ALLOWED',
  'in_prod': false,
  'list_info': {
    'list_sort_type': 'POPULARITY',
    'list_sort_by': 'Title',
    'enable_list': true,
    'list_sort_direction': 'DESCENDING',
    'list_title': 'Big Bang Theory characters',
    'list_query_phrase': ['list of T', 'T']
  }
};
const schema = {
  'title': 'JSON schema for Lightweight Verticals table properties.',
  'definitions': {
    'kg_schema_field': {'readOnly': true},
    'string': {
      'slash_delimited': {'type': 'string', 'pattern': '^(\/[a-z0-9_]+)+$'},
      'docid': {'type': 'string', 'pattern': '^[0-9a-zA-Z_-]+$'},
      'experiment_id':
          {'type': 'string', 'pattern': '^[a-z-]+[.][0-9a-zA-Z_-]{10,}$', 'readOnly': true}
    },
    'rating_request': {
      'type': 'object',
      'title': 'Rating request',
      'properties': {
        'eas_experiment_id': {
          'title': 'Experiment ID',
          'description': 'EAS experiment ID for scrapes to be rated',
          '$ref': '#/definitions/string/experiment_id',
          'readOnly': true
        },
        'experiment_type': {
          'type': 'string',
          'title': 'Experiment type',
          'enum': ['LAUNCH', 'TUNING', 'OTHER'],
          'readOnly': true
        },
        'furball_request_id': {
          'type': 'number',
          'title': 'Request ID (numeric)',
          'description': '[Deprecated] Use furball_request_id_str',
          'display': false,
          'readOnly': true
        },
        'furball_project_ids': {
          'type': 'array',
          'title': 'Project IDs',
          'description': 'Furball Project IDs associated with the rating request',
          'items': {'type': 'number', 'title': 'Furball project ID'},
          'readOnly': true
        },
        'buganizer_id': {
          'type': 'number',
          'title': 'Bug ID',
          'description': 'ID for the bug tracking the rating request',
          'readOnly': true
        },
        'status': {
          'type': 'string',
          'title': 'Rating status',
          'description': 'Overall status of the Furball rating projects',
          'readOnly': true
        },
        'scrape_table_id': {
          'title': 'Scrape table',
          'description': 'Table with the rated scrapes for each entity',
          '$ref': '#/definitions/string/docid',
          'readOnly': true
        },
        'furball_request_id_str': {
          'type': 'string',
          'title': 'Request ID',
          'description': 'ID for the rating request in Furball as string',
          'pattern': '^\\d+$',
          'readOnly': true
        }
      },
      'readOnly': true
    },
    'batch_associated_table': {
      'type': 'object',
      'description': '[Deprecated] Scrapes are now per vertical. DO NOT USE.',
      'properties': {'batch_id': {'type': 'string'}, 'doc_id': {'type': 'string'}}
    }
  },
  'type': 'object',
  'properties': {
    'batch_id': {
      'type': 'string',
      'title': 'Batch',
      'description': 'Batch of verticals this one belongs to',
      'enum': ['prod', 'launch', 'prep', 'exp', 'shell', 'test'],
      'default': 'exp',
      'display': false
    },
    'active': {'type': 'boolean', 'default': false, 'display': false},
    'english_name': {
      'type': 'string',
      'title': 'English name',
      'description':
          'English name for KG schema files (must be the same as subtitle for EN verticals)',
      '$ref': '#/definitions/kg_schema_field',
      'maxLength': 60
    },
    'english_description': {
      'type': 'string',
      'title': 'English description',
      'description': 'Short English description for this vertical for KG schema files',
      '$ref': '#/definitions/kg_schema_field'
    },
    'subtitle': {
      'type': 'string',
      'title': 'Subtitle',
      'description': 'Subtitle to use in KP card (also the English name for EN verticals)',
      'pattern': '^[^"]*$',
      '$ref': '#/definitions/kg_schema_field'
    },
    'override_subtitles': {
      'type': 'boolean',
      'title': 'Override Maze subtitles?',
      'description': 'For reconciled entities, use LW subtitle',
      'default': false
    },
    'type_prefix': {
      'title': 'Type prefix',
      'description': 'Prefix of type',
      '$ref': '#/definitions/string/slash_delimited',
      'minLength': 2,
      'maxLength': 30,
      'default': '/kp_lw',
      'display': false
    },
    'type': {
      'title': 'Type',
      'description': 'Overall type assertion for vertical',
      '$ref': '#/definitions/string/slash_delimited',
      'minLength': 10,
      'maxLength': 37,
      'display': false
    },
    'collection': {
      'title': 'Collection',
      'description': 'Collection to which all entities in this vertical belong',
      'type': 'string',
      'pattern': '^/collection(\/[a-z0-9_-]+)+$',
      'minLength': 1,
      '$ref': '#/definitions/kg_schema_field'
    },
    'source_key_column': {
      'type': 'string',
      'title': 'Source key',
      'description': 'Primary entity unique identifier column (set in the console)',
      'display': false
    },
    'text_lang': {
      'type': 'string',
      'title': 'Language',
      'description': 'BCP 47 language code for data in table',
      'enum': ['de', 'en', 'es', 'hi', 'id', 'ja', 'pt', 'ru', 'th'],
      'default': 'en',
      'display': false
    },
    'reconciliation_type': {
      'type': 'array',
      'title': 'Types for reconciliation',
      'description': 'Type constraints used during reconciliation with KG',
      'items': {'$ref': '#/definitions/string/slash_delimited', 'minLength': 1}
    },
    'fact_list': {
      'title': 'Fact list',
      'type': 'array',
      'minItems': 1,
      'items': {'type': 'string', 'minLength': 1, 'enum': ['$columns']}
    },
    'force_rank': {
      'type': 'boolean',
      'title': 'Force fact ordering',
      'description': 'Facts should appear in the above order in the KP',
      'default': true
    },
    'sideways_vr': {
      'type': 'object',
      'title': 'Sideways visual refinements',
      'description': 'For a list of related thumbnails (people also search for)',
      'additionalProperties': false,
      'properties': {
        'visible': {'type': 'boolean', 'title': 'Make visible', 'default': false},
        'name_msg': {'type': 'string', 'title': 'Visible label for sideways'}
      }
    },
    'downwards_vr': {
      'type': 'array',
      'maxItems': 2,
      'title': 'Downwards visual refinements',
      'description': 'For an organically ranked list of thumbnails',
      'items': {
        'type': 'object',
        'properties': {
          'column': {
            'type': 'string',
            'title': 'Column',
            'enum': ['$columns'],
            'default': '$firstColumn'
          },
          'collections': {
            'type': 'array',
            'title': 'Collections',
            'minItems': 1,
            'items': {'type': 'string', 'minLength': 1, 'pattern': '^/collection(\/[a-z0-9_-]+)+$'}
          }
        },
        'required': ['collections', 'column'],
        'additionalProperties': false
      }
    },
    'triggering_lang_list': {
      'type': 'array',
      'title': 'Triggering language list',
      'minItems': 1,
      'items': {'type': 'string', 'minLength': 1, 'default': 'en-*'},
      'description': 'Specific languages-locales enabled in production'
    },
    'entity_pattern': {
      'type': 'array',
      'title': 'Entity patterns',
      'description': 'Alias for an entity using X as a placeholder, such as "... X ..."',
      'items':
          {'type': 'string', 'pattern': '(^\\S+.*\\bX\\b.*\\S+$)|(^X\\b.*\\S+$)|(^\\S+.*\\bX$)'}
    },
    'list_info': {
      'type': 'object',
      'title': 'Vertical level list-seeking queries',
      'properties': {
        'enable_list': {'type': 'boolean', 'title': 'Enable list queries', 'default': false},
        'list_title': {
          'type': 'string',
          'title': 'List title',
          'description': 'Carousel display title, usually the plural of this vertical\'s name'
        },
        'list_sort_type': {
          'type': 'string',
          'title': 'Sort type',
          'enum': ['POPULARITY', 'COLUMN'],
          'default': 'POPULARITY'
        },
        'list_sort_by': {
          'type': 'string',
          'title': 'Sort Column',
          'description': 'Column to sort the list by if not sorting by popularity',
          'enum': ['$columns'],
          'default': '$firstColumn'
        },
        'list_sort_direction': {
          'type': 'string',
          'title': 'Sort direction',
          'enum': ['ASCENDING', 'DESCENDING'],
          'default': 'DESCENDING'
        },
        'tagline_column': {
          'type': 'array',
          'title': 'Taglines',
          'description': 'Column with values for tagline',
          'minItems': 0,
          'maxItems': 3,
          'items': {'type': 'string', 'enum': ['$columns'], 'default': '$firstColumn'}
        },
        'tagline_column_name': {
          'display': false,
          'type': 'array',
          'title': 'Taglines',
          'description': '[Deprecated] Unsupported tagline UI. DO NOT USE.',
          'minItems': 0,
          'maxItems': 3,
          'items': {'type': 'string', 'enum': ['$columns'], 'default': '$firstColumn'}
        },
        'list_query_phrase': {
          'type': 'array',
          'title': 'Search queries that should show this list',
          'minItems': 1,
          'description': 'T is the title placeholder',
          'items': {'type': 'string', 'minLength': 1, 'default': 'list of T'}
        }
      }
    },
    'url_pattern': {
      'type': 'array',
      'title': 'URL patterns',
      'description': 'Patterns used for result URL filtering',
      'items': {'type': 'string'},
      'display': false
    },
    'global_assertions': {
      'type': 'array',
      'title': 'Global assertions',
      'items': {
        'type': 'object',
        'properties': {
          'pred': {
            'title': 'Predicate path',
            'type': 'string',
            'pattern': '^(\/[a-z][a-z0-9._]+)+(:[A-Z]+)?$'
          },
          'val': {'type': 'string', 'title': 'Value'},
          'val_type': {
            'type': 'string',
            'title': '[Deprecated] Value type',
            'enum': [
              'ID',
              'TEXT',
              'DATETIME',
              'BOOLEAN',
              'INT',
              'RAWSTRING',
              'URL',
              'KEY',
              'FLOAT',
              'PROTO'
            ],
            'default': 'TEXT',
            'display': false
          }
        },
        'required': ['pred', 'val'],
        'additionalProperties': false
      }
    },
    'associated_tables': {
      'type': 'object',
      'title': 'Other tables associated with the data in this table',
      'properties': {
        'raw_data_backup': {
          'title': 'Backup [UNUSED]',
          'description': 'Backup of raw data table',
          '$ref': '#/definitions/string/docid',
          'display': false
        },
        'triggering_aliases': {
          'title': 'Triggering aliases',
          'description': 'Table with aliases and ratings used for triggering',
          '$ref': '#/definitions/string/docid'
        },
        'triggering_aliases_merge': {
          'title': 'Triggering aliases merged with entities',
          'description': 'Triggering aliases merge table',
          '$ref': '#/definitions/string/docid'
        },
        'knowledge_panel_scrapes_unrated': {
          'title': '[Deprecated] KP scrapes',
          'description': 'Table with KP scrapes of best query for each entity',
          '$ref': '#/definitions/string/docid',
          'display': false
        },
        'knowledge_panel_scrapes_rated': {
          'title': 'Rated H-metric import',
          'description': 'Table with ratings of KP scrapes (H-eval)',
          '$ref': '#/definitions/string/docid'
        },
        'reconciliation_worksheet': {
          'title': 'Reconcilation worksheet table',
          'description': 'Table with reconciliation candidates',
          '$ref': '#/definitions/string/docid'
        },
        'kp_sxs_unrated_random': {
          'title': 'Random SxS',
          'description': 'Table with SxS KP scrapes of random queries for each entity',
          '$ref': '#/definitions/string/docid'
        },
        'kp_sxs_unrated_best': {
          'title': 'Best case query SxS',
          'description': 'Table with SxS KP scrapes of best case query for each entity',
          '$ref': '#/definitions/string/docid'
        },
        'kp_sxs_unrated_force': {
          'title': 'Force-triggered SxS',
          'description': 'Table with SxS KP scrapes of force-triggered best query for each entity',
          '$ref': '#/definitions/string/docid'
        },
        'kp_sxs_rated_random': {
          'title': 'Rated random SxS import',
          'description': 'Table with ratings of SxS scrapes',
          '$ref': '#/definitions/string/docid'
        },
        'existing_facts': {
          'title': 'Existing facts table',
          'description': 'Table with existing KP attributes and KG data for reconciled entities',
          '$ref': '#/definitions/string/docid'
        },
        'list_sxs_unrated': {
          'title': 'List SxS',
          'description': 'Table with SxS scrapes of all list queries for a vertical',
          '$ref': '#/definitions/string/docid'
        },
        'pp_sxs_unrated': {
          'title': 'Entity-attribute SxS (Porky Pig)',
          'description':
              'Table with SxS scrapes for all Porky Pig (answer box) scrapes for a vertical',
          '$ref': '#/definitions/string/docid'
        },
        'kp_hmetric_unrated': {
          'title': 'Knowledge Panel (H-metric)',
          'description': 'Table with SxS KP component scrapes of best queries for each entity',
          '$ref': '#/definitions/string/docid'
        },
        'row_errors': {
          'title': 'Rows with invalid values',
          'description': 'Result of vertical cell value validation',
          '$ref': '#/definitions/string/docid'
        },
        'row_errors_merge': {
          'title': 'Rows with invalid values merged with entities',
          'description': 'Entity table rows combined errors',
          '$ref': '#/definitions/string/docid'
        },
        'suggested_attributes': {
          'title': 'Suggested attributes table',
          'description': 'Suggested attributes generated from Attribute Finder',
          '$ref': '#/definitions/string/docid'
        },
        'cvt_data': {
          'title': 'CVT data',
          'description': 'Table with additional CVT data for a vertical',
          '$ref': '#/definitions/string/docid'
        },
        'cvt_data_merge': {
          'title': 'CVT data merged with entities',
          'description': 'Table with additional CVT data merged with the entities',
          '$ref': '#/definitions/string/docid'
        },
        'kp_hmetric_unrated_sample': {
          'title': 'Sampled H-metric',
          'description': 'Table with KP component scrapes for sampled queries',
          '$ref': '#/definitions/string/docid'
        },
        'tts_sxs_unrated': {
          'title': 'Text-to-speech (TTS) SxS',
          'description': 'Table with vocalized knowledge answer scrapes',
          '$ref': '#/definitions/string/docid'
        },
        'tts_sxs_rated': {
          'title': 'Rated text-to-speech (TTS) SxS',
          'description': 'Table with vocalized knowledge answer ratings',
          '$ref': '#/definitions/string/docid'
        },
        'tts_sxs_unrated_sample': {
          'title': 'Sampled text-to-speech (TTS) SxS',
          'description': 'Table with vocalized answer scrapes for sampled queries',
          '$ref': '#/definitions/string/docid'
        },
        'pattern_gen': {
          'title': 'PatternGen results spreadsheet',
          'description': 'Spreadsheet with suggested entity and list triggering patterns',
          '$ref': '#/definitions/string/docid'
        }
      }
    },
    'batch_associated_tables': {
      'type': 'object',
      'title': 'Batch associated table doc IDs, not for manual entry',
      'description': '[Deprecated] Scrapes are now per vertical. DO NOT USE.',
      'display': false,
      'additionalProperties': false,
      'properties': {
        'kp_sxs_unrated_random': {'$ref': '#/definitions/batch_associated_table'},
        'kp_sxs_unrated_best': {'$ref': '#/definitions/batch_associated_table'},
        'kp_sxs_rated_random': {'$ref': '#/definitions/batch_associated_table'}
      }
    },
    'default_image_query': {
      'type': 'string',
      'title': 'Default image query',
      'description': '[Deprecated] Used if no entity-specific queries return good images',
      'display': false
    },
    'image_display': {
      'type': 'string',
      'title': 'Image display',
      'description': 'Controls how images appear for this vertical',
      'enum': ['CROPPING_ALLOWED', 'CROPPING_DISALLOWED', 'HIDE_IMAGE'],
      'default': 'CROPPING_ALLOWED'
    },
    'generate_triples': {'type': 'boolean', 'title': 'Generate triples?', 'default': true},
    'generate_production_collection_triples': {
      'type': 'boolean',
      'title': '[Deprecated] Generate production collection triples?',
      'description':
          'Generate collection triples in production instead of using the collections pipeline',
      'default': false,
      'display': false
    },
    'in_live_experiment': {
      'type': 'boolean',
      'title': 'Enable live experiment?',
      'description': 'Only for use by engineering',
      'default': false,
      'display': false
    },
    'in_prod': {
      'type': 'boolean',
      'title': '[Deprecated] In prod?',
      'description': 'Has this vertical been pushed to production?',
      'default': false,
      'display': false
    },
    'kp_lw_ids': {
      'type': 'boolean',
      'title': 'Use new IDs?',
      'description': 'Generate IDs starting with /kp_lw/{type}',
      'default': true,
      'display': false
    },
    'reconcile_type': {
      'title': '(Ignore)',
      'description': '[Deprecated] Use \'Types for reconciliation\'',
      '$ref': '#/definitions/string/slash_delimited',
      'readOnly': true,
      'display': false
    },
    'downward_visual_refinement': {
      'type': 'string',
      'title': 'Downward visual refinement',
      'description': 'For an organically ranked list of thumbnails',
      'enum': ['$columns'],
      'readOnly': true,
      'display': false
    },
    'data_origin': {
      'type': 'string',
      'title': 'Data origin',
      'enum': ['MANUAL', 'KNOWLEDGE_GRAPH'],
      'default': 'MANUAL',
      'display': false
    },
    'assert_common_topic': {
      'type': 'boolean',
      'title': 'Assert as /common/topic?',
      'description':
          'Assert all entities in this vertical as type /common/topic. Temporary for transition, until we assert /common/topic by default',
      'default': false,
      'display': false
    },
    'recon_score_threshold': {
      'type': 'number',
      'title': 'Recon score threshold',
      'description': 'Ignore reconciliation candidates with scores lower than this',
      'display': false
    },
    'eas_experiment_ids': {
      'type': 'object',
      'title': 'EAS experiment IDs associated with the data in this table',
      'properties': {
        'kp_sxs_unrated_random': {
          'title': 'SxS random KP experiment ID',
          'description': 'Current experiment ID for SxS scrapes of random queries',
          '$ref': '#/definitions/string/experiment_id'
        },
        'kp_sxs_unrated_best': {
          'title': 'SxS best query KP experiment ID',
          'description': 'Current experiment ID for best case query scrapes',
          '$ref': '#/definitions/string/experiment_id'
        },
        'kp_sxs_unrated_force': {
          'title': 'SxS force-triggered experiment ID',
          'description': 'Current experiment ID for force-triggered best query scrapes',
          '$ref': '#/definitions/string/experiment_id'
        },
        'list_sxs_unrated': {
          'title': 'SxS list experiment ID',
          'description': 'Current experiment ID for scrapes of all list queries',
          '$ref': '#/definitions/string/experiment_id'
        },
        'pp_sxs_unrated': {
          'title': 'SxS Porky Pig experiment ID',
          'description': 'Current experiment ID for scrapes for all Porky Pig (answer box)',
          '$ref': '#/definitions/string/experiment_id'
        },
        'kp_hmetric_unrated': {
          'title': 'H-metric KP experiment ID',
          'description': 'Current experiment ID for scrapes for all H-metric KP scrapes',
          '$ref': '#/definitions/string/experiment_id'
        },
        'kp_hmetric_unrated_sample': {
          'title': 'Sampled H-metric KP experiment ID',
          'description': 'Current experiment ID for sampled H-metric scrapes',
          '$ref': '#/definitions/string/experiment_id'
        },
        'tts_sxs_unrated': {
          'title': 'TTS SxS experiment ID',
          'description': 'Current experiment ID for SxS TTS scrapes',
          '$ref': '#/definitions/string/experiment_id'
        },
        'tts_sxs_unrated_sample': {
          'title': 'Sampled TTS SxS experiment ID',
          'description': 'Current experiment ID for sampled SxS TTS scrapes',
          '$ref': '#/definitions/string/experiment_id'
        }
      },
      'readOnly': true
    },
    'scrape_rating_requests': {
      'type': 'object',
      'title': 'Rating requests for scrapes',
      'properties': {
        'kp_sxs_rated_random': {
          'type': 'array',
          'title': 'SxS random rating requests',
          'items': {'$ref': '#/definitions/rating_request'},
          'readOnly': true
        },
        'knowledge_panel_scrapes_rated': {
          'type': 'array',
          'title': 'H-metric rating requests',
          'items': {'$ref': '#/definitions/rating_request'},
          'readOnly': true
        },
        'tts_sxs_rated': {
          'type': 'array',
          'title': 'TTS (text-to-speech) rating requests',
          'items': {'$ref': '#/definitions/rating_request'},
          'readOnly': true
        }
      },
      'readOnly': true
    },
    'in_maintenance': {
      'type': 'boolean',
      'title': 'In maintenance',
      'description': 'Is this a maintenance copy of a prod vertical?',
      'default': false,
      'display': false
    },
    'scrape_experiment_epoch': {
      'type': 'string',
      'title': 'Epoch of the last successful scrape experiment data pipeline',
      'description': 'E.g., 2017-0314-230104',
      'pattern': '^20\\d\\d-[0-1]\\d[0-3]\\d-[0-2]\\d[0-5]\\d[0-5]\\d$',
      'display': false
    },
    'bypass_validation': {
      'type': 'string',
      'description': 'Change validation errors to warnings for maintenance',
      'enum': ['NONE', 'GRAPH_PREDICATE_LEADING_DIGITS'],
      'display': false
    },
    'entity_assertion': {
      'type': 'array',
      'title': 'Entity assertions',
      'display': false,
      'items': {
        'type': 'object',
        'properties': {
          'pred': {'title': 'Predicate path', 'type': 'string'},
          'value': {'type': 'string', 'title': 'Value'}
        },
        'additionalProperties': false
      }
    },
    'experiment_cls': {
      'type': 'array',
      'title': 'Experiment Changelists',
      'description':
          'External experiment CLs, such as from Grammy or Answer Config. Turns off app schema.',
      'items': {'type': 'string', 'pattern': '^\\d+$', 'title': 'CL number'}
    }
  },
  'required': ['type'],
  'additionalProperties': false
};

const advice = renderAdvice(schema, [
                 'Title',
                 'Url',
                 'Born',
                 'Portrayed by',
                 'IQ',
                 'Occupations',
                 'First episode',
                 'Parents',
                 'Childfren',
                 'Significant other'
               ]) as RenderAdvice;
const factory = valueEditorFactory(advice);
function draw() {
  render(
      html`
<div class="pure-form pure-form-aligned" style="margin:10%">
  <legend>Table properties</legend>
  ${
          factory(
              properties,
              (v) => console.log(JSON.stringify(v)),
              (e: Event) => console.log('event: ' + JSON.stringify(e)),
              draw)}
</div>
    `,
      document.body);
}
draw();
