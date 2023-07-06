// @ts-nocheck

import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SEditCellDatePicker: typeof import('./dist/S-EditCell/date-picker')['default']
    SEditCellTreeSelect: typeof import('./dist/S-EditCell/tree-select')['default']
    SEditCellTextarea: typeof import('./dist/S-EditCell/textarea')['default']
    SEditCellSelect: typeof import('./dist/S-EditCell/select')['default']
    SEditCellInput: typeof import('./dist/S-EditCell/input')['default']
    SIconSelect: typeof import('./dist/S-IconSelect')['default']
    SEllipsis: typeof import('./dist/S-Ellipsis')['default']
    STable: typeof import('./dist/S-Table')['default']
    STree: typeof import('./dist/S-Tree')['default']
    SForm: typeof import('./dist/S-Form')['default']
    SIcon: typeof import('./dist/S-Icon')['default']
  }
}

declare global {
  export type isIconType = typeof import('./dist/S-Icon')['isIconType']
  export type forIconType = typeof import('./dist/S-Icon')['forIconType']
  export type formValidator = typeof import('./dist/S-Form')['formValidator']
  export type formGroupsDefiner = typeof import('./dist/S-Form')['formGroupsDefiner']
  
  export type SEditCellDatePicker = typeof import('./dist/S-EditCell/date-picker')['default']
  export type SEditCellTreeSelect = typeof import('./dist/S-EditCell/tree-select')['default']
  export type SEditCellTextarea = typeof import('./dist/S-EditCell/textarea')['default']
  export type SEditCellSelect = typeof import('./dist/S-EditCell/select')['default']
  export type SEditCellInput = typeof import('./dist/S-EditCell/input')['default']
  export type SIconSelect = typeof import('./dist/S-IconSelect')['default']
  export type SEllipsis = typeof import('./dist/S-Ellipsis')['default']
  export type STable = typeof import('./dist/S-Table')['default']
  export type STree = typeof import('./dist/S-Tree')['default']
  export type SForm = typeof import('./dist/S-Form')['default']
  export type SIcon = typeof import('./dist/S-Icon')['default']

  export type { SEditCellSelectValueType, SEditCellSelectOptionType } from './dist/S-EditCell/select'
  export type { SEditCellPanelMode, SEditCellPickerMode } from './dist/S-EditCell/date-picker'
  export type { SEditCellTreeSelectOptionType } from './dist/S-EditCell/tree-select'
  export type { SIconSelectOptions } from './dist/S-IconSelect'

  export type {
    SFormType,
    SFormGridGutter,
    SFormGrid, 
    SFormColItem, 
    SFormColPartItem,
    SFormRowItem, 
    SFormGroupItem,
    SFormGroupPartItem,
    SFormNormalizeType,
    SFormValidatorRule,
    SFormGroupsDefiner,
    SFormValidatorManager,
  } from './dist/S-Form'


  export type  {
    STableSettingsType,
    STableStickyType,
    STableScrollType,
    STablePagination,
    STableRecordType,
    STableRowKey,
    STableRowChildren,
    STableLoadSources,
    STableFooterRender,
    STableHeaderCellRender,
    STableBodyerCellRender,
    STableBodyerExpandRender,
    STableCustomHeaderRowAttrs,
    STableCustomBodyerRowAttrs,
    STableCustomBodyerRowStates,
    STablePartColumnType,
    STableColumnType,
    STableKey,
    STableSize,
    STableSortDirections,
    STablePartStickyType,
    STablePartScrollType,
    STablePartPagination,
    STableColumnTypes
  } from './dist/S-Table'

  export type  {
    STreeFilterProps,
    STreeFieldNames,
    STreeSourceNode,
    STreeTargetNode,
    STreeLoadData,
    STreeMethoder,
    STreeTransformer,
    STreeTargeter,
    STreeSourcer,
    STreeStater,
    STreeCacher,
    STreeKey,
    STreeKeys,
    STreeEventDrop,
    STreeEventDropHandler,
    STreeEventDragstart,
    STreeEmiterCheck,
    STreeEmiterSelect,
    STreeEmiterExpand,
    STreeEmiterChange,
    STreeSourceNodes,
    STreeTargetNodes,
    STreeSpreadNodes,
    STreePartTargetNode,
    STreePartSourceNode,
  } from './dist/S-Tree'
}

export {}