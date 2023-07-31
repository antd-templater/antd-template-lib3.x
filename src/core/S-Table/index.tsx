import { VNode, HTMLAttributes, SlotsType, DeepReadonly, ComputedRef, Ref, isVNode, defineComponent, onMounted, computed, reactive, ref, inject, watch, readonly, toRaw, UnwrapRef, unref, nextTick } from 'vue'
import { defaultConfigProvider } from 'ant-design-vue/es/config-provider'
import * as VueTypes from 'vue-types'
import helper from '@/helper'

import './index.less'

export interface STableStickyType {
  topHeader: boolean | number;
  leftBodyer: number;
  rightBodyer: number;
  bottomFooter: boolean | number;
  rightScrollbar: boolean | number;
  bottomScrollbar: boolean | number;
}

export interface STableScrollType {
  x: number | string | false;
  y: number | 'auto' | false;
  scrollToFirstXOnChange: boolean;
  scrollToFirstYOnChange: boolean;
  getScrollResizeContainer?: () => HTMLElement;
}

export interface STableRecordType {
  [field: string]: any;
}

export interface STablePaginateType {
  hideOnSinglePage: boolean;
  defaultPageSize: number;
  pageSizeOptions: Array<string | number>;
  showSizeChanger?: boolean;
  showQuickJumper: boolean;
  showLessItems: boolean;
  loadPageSize?: number;
  loadPageNo?: number;
  totalSize: number;
  totalPage: number;
  pageSize: number;
  pageNo: number;
  visible: boolean;
  simple: boolean;
  mode: 'local' | 'remote';
  size: 'default' | 'small';
  showTotal?:	(total: number, range: [number, number]) => void;
}

export interface STableRowKey<RecordType = STableRecordType> {
  (record: DeepReadonly<RecordType>): string
}

export interface STableTreeKey<RecordType = STableRecordType> {
  (record: DeepReadonly<RecordType>): string
}

export interface STableLoadSource<RecordType = STableRecordType> {
  (
    options: {
      action: 'sorter' | 'paginate';
      sorter: Array<{ field: string | string[]; value: 'ascend'| 'descend'; }>;
      paginate: { pageSize: number; pageNo: number; mode: 'local' | 'remote'; };
    }
  ): Array<RecordType> | {
    data: Array<RecordType>;
    page: number;
    total: number;
  };
}

export interface STableSettingsType<RecordType = STableRecordType> {
  key: string;
  title: string;
  column: STableColumnType<RecordType>;
  children?: STableSettingsType[];
}

export interface STableExpanderRender<RecordType = STableRecordType> {
  (option: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; expanded: boolean; }): VNode;
}

export interface STableHeaderCellRender<RecordType = STableRecordType> {
  (option: { title: string | number; column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }): VNode | STableRefWrapper<{
    props?: {
      align?: 'left' | 'center' | 'right';
      fixed?: 'left' | 'right' | false;
      width?: number | string;
      minWidth?: number;
      maxWidth?: number;
      resizable?: boolean;
      ellipsis?: boolean;
      colSpan?: number;
      rowSpan?: number;
      sorter?: boolean;
      sorterField?: string | string[];
      sortDirections?: STableSortDirections;
    };
    children?: any;
  }>;
}

export interface STableBodyerCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; }): VNode | STableRefWrapper<{
    props?: {
      align?: 'left' | 'center' | 'right';
      ellipsis?: boolean;
    };
    children?: any;
  }>;
}

export interface STableFooterCellRender<RecordType = STableRecordType> {
  (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }): VNode | STableRefWrapper<{
    props?: {
      colSpan?: number;
      rowSpan?: number;
    };
    children?: any;
  }>;
}

export interface STableCustomHeaderRowAttrs<RecordType = STableRecordType> {
  (options: { columns: DeepReadonly<STableColumnType<RecordType>[]>; rowIndex: number; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowAttrs<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableCustomBodyerRowStates<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; }): STableRefWrapper<{
    draggable?: boolean;
    selectable?: boolean;
    expandable?: boolean;
  }>;
}

export interface STableCustomFooterRowAttrs<RecordType = STableRecordType> {
  (options: { record: DeepReadonly<RecordType>; rowIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }): STableRefWrapper<HTMLAttributes>;
}

export interface STableWrapRecordType<RecordType = STableRecordType> {
  key: STableKey;
  childKeys: STableKey[];
  parentKeys: STableKey[];
  referRecord: RecordType;
  treeChildren: STableWrapRecordType<RecordType>[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: number[];
  rowGlobalIndex: number;
  rowTreeKeyField: string;
  rowKeyField: string;
  rowHeight: number;
}

export interface STableWrapColumnType<RecordType = STableRecordType> {
  key: string;
  childKeys: string[];
  parentKeys: string[];
  referColumn: STableColumnType<RecordType>;
  cacheColumn: STablePartColumnType<RecordType>;
  treeChildren: STableWrapColumnType<RecordType>[];
  rowGroupLevel: number;
  rowGroupIndex: number;
  rowGroupIndexs: number[];
}

export interface STablePartColumnType<RecordType = STableRecordType> {
  key?: string;
  title: string;
  dataIndex: string | Array<string>;
  children?: STablePartColumnType<RecordType>[];
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | false;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
  ellipsis?: boolean;
  colSpan?: number;
  rowSpan?: number;
  sorter?: boolean;
  sorterField?: string | string[];
  sortDirections?: STableSortDirections;
  defaultSorterValue?: 'ascend'| 'descend';
  sorterValueChange?: (option: { value: 'ascend'| 'descend' | ''; values: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>; }) => void;
  customHeaderCellAttrs?: (option: { column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customBodyerCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>, rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customFooterCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }) => STableRefWrapper<HTMLAttributes>;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
  customFooterCellRender?: STableFooterCellRender;
}

export interface STableColumnType<RecordType = STableRecordType> {
  key: string;
  title: string;
  parentKey: string;
  dataIndex: string | Array<string>;
  children: STableColumnType<RecordType>[];
  align: 'left' | 'center' | 'right';
  fixed: 'left' | 'right' | false;
  width?: number | string;
  minWidth?: number;
  maxWidth?: number;
  resizable: boolean;
  ellipsis: boolean;
  colIndex: number;
  rowIndex: number;
  colOffset: number;
  rowOffset: number;
  colInitSpan: number;
  rowInitSpan: number;
  colMaxSpan: number;
  rowMaxSpan: number;
  colSpan: number;
  rowSpan: number;
  sorter: boolean;
  sortered: boolean;
  sorterField: string | string[];
  sortDirections?: STableSortDirections;
  defaultSorterValue: 'ascend'| 'descend' | '';
  currentSorterValue: 'ascend'| 'descend' | '';
  activedSorterValues: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>;
  sorterValueChange?: (option: { value: 'ascend'| 'descend' | ''; values: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>; }) => void;
  customHeaderCellAttrs?: (option: { column: DeepReadonly<STableColumnType<RecordType>>; rowIndex: number; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customBodyerCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>, rowIndex: number; groupIndex: number; groupLevel: number; groupIndexs: number[]; globalIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; }) => STableRefWrapper<HTMLAttributes>;
  customFooterCellAttrs?: (option: { value: any; record: DeepReadonly<RecordType>; rowIndex: number; column: DeepReadonly<STableColumnType<RecordType>>; colIndex: number; sources: DeepReadonly<RecordType[]>; paginate: DeepReadonly<STablePaginateType>; }) => STableRefWrapper<HTMLAttributes>;
  customHeaderCellRender?: STableHeaderCellRender;
  customBodyerCellRender?: STableBodyerCellRender;
  customFooterCellRender?: STableFooterCellRender;
}

type STableeDefineSlots<RecordType = STableRecordType> = SlotsType<{
  expander: Parameters<STableExpanderRender<RecordType>>[0];
  headerCell: Parameters<STableHeaderCellRender<RecordType>>[0];
  bodyerCell: Parameters<STableBodyerCellRender<RecordType>>[0];
  footerCell: Parameters<STableFooterCellRender<RecordType>>[0];
}>

type STableDefineMethods = {
  selectRowKeys(keys: STableKey[]): void;
  expandRowKeys(keys: STableKey[]): void;
  forceUpdate: () => void;
}

export type STableKey = string | number
export type STableSize = 'default' | 'middle' | 'small'
export type STableSortDirections = ['ascend'] | ['descend'] | ['ascend', 'descend']
export type STablePartStickyType = Partial<STableStickyType>
export type STablePartScrollType = Partial<STableScrollType>
export type STablePartPaginate = Partial<STablePaginateType>
export type STableRefWrapper<T> = ComputedRef<T> | Ref<T> | T

export const STable = defineComponent({
  name: 'STable',
  props: {
    size: VueTypes.string<STableSize>().def(undefined),
    layout: VueTypes.string<'auto' | 'fixed'>().def('auto'),
    rowKey: VueTypes.any<string | STableRowKey>().def('key'),
    treeKey: VueTypes.any<string | STableTreeKey>().def('children'),
    sticky: VueTypes.object<STablePartStickyType>().def(() => ({})),
    scroll: VueTypes.object<STablePartScrollType>().def(() => ({})),
    columns: VueTypes.array<STablePartColumnType>().def(() => ([])),
    sources: VueTypes.array<STableRecordType>().def(() => ([])),
    summarys: VueTypes.array<STableRecordType>().def(() => ([])),
    paginate: VueTypes.any<STablePartPaginate>().def(() => ({})),
    loadData: VueTypes.func<STableLoadSource>().def(undefined),
    headerCell: VueTypes.func<STableHeaderCellRender>().def(undefined),
    bodyerCell: VueTypes.func<STableBodyerCellRender>().def(undefined),
    footerCell: VueTypes.func<STableFooterCellRender>().def(undefined),
    customHeaderRowAttrs: VueTypes.func<STableCustomHeaderRowAttrs>().def(undefined),
    customBodyerRowAttrs: VueTypes.func<STableCustomBodyerRowAttrs>().def(undefined),
    customFooterRowAttrs: VueTypes.func<STableCustomFooterRowAttrs>().def(undefined),
    customBodyerRowStates: VueTypes.func<STableCustomBodyerRowStates>().def(undefined),
    selectedMode: VueTypes.string<'Radio' | 'Checkbox'>().def('Checkbox'),
    selectedRowKeys: VueTypes.array<STableKey>().def(() => []),
    expandedRowKeys: VueTypes.array<STableKey>().def(() => []),
    selectedStrictly: VueTypes.bool().def(true),
    preserveSelectedRowKeys: VueTypes.bool().def(false),
    preserveExpandedRowKeys: VueTypes.bool().def(false),
    defaultSelectAllRows: VueTypes.bool().def(false),
    defaultExpandAllRows: VueTypes.bool().def(false),
    columnSorterMultiple: VueTypes.bool().def(false),
    columnSorterTooltip: VueTypes.bool().def(true),
    expandRowByClick: VueTypes.bool().def(false),
    selectIndentSize: VueTypes.number().def(15),
    expandIndentSize: VueTypes.number().def(15),
    loadOnScroll: VueTypes.bool().def(false),
    showHeader: VueTypes.bool().def(true),
    showFooter: VueTypes.bool().def(true),
    loading: VueTypes.bool().def(false),
    virtual: VueTypes.bool().def(true),
    border: VueTypes.bool().def(false)
  },
  emits: {
    'update:loading': (loading: boolean) => true,
    'update:columns': (columns: STablePartColumnType[]) => true,
    'update:selectedRowKeys': (keys: Array<STableKey>) => true,
    'update:expandedRowKeys': (keys: Array<STableKey>) => true,
    'update:paginate': (paginate: STablePaginateType) => true,
    'update:sources': (sources: STableRecordType[]) => true,
    'sorter': (options: Array<{ field: string | string[]; value: 'ascend'| 'descend' }>) => true,
    'expand': (keys: Array<STableKey>) => true,
    'select': (keys: Array<STableKey>) => true,
    'paginate': (pages: STablePaginateType) => true
  },
  setup(props, context) {
    const watchDeepOptions = { immediate: true, deep: true }
    const renderRowPresets = reactive({ minBuffer: 5, maxBuffer: 10, minHeight: 32 })
    const renderRowRanger = reactive({ renderOffset: [0, ~~(window.innerHeight / renderRowPresets.minHeight)], renderBuffer: [0, 10] })
    const configProvider = inject('configProvider', defaultConfigProvider)

    const treeColumns: Ref<STableWrapColumnType[]> = ref([])
    const listColumns: Ref<Array<STableColumnType>[]> = ref([])
    const dataColumns: Ref<Array<STableColumnType>> = ref([])

    const columnSettingsAllKeys: Ref<string[]> = ref([])
    const columnSettingsAllTrees: Ref<STableSettingsType[]> = ref([])
    const columnSettingsCheckKeys: Ref<string[]> = ref([])

    const columnRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const columnCellAttrs: Ref<STableRefWrapper<HTMLAttributes>[][]> = ref([])
    const columnCellRender: Ref<Array<Array<any>>> = ref([])

    const treeSources: Ref<STableWrapRecordType[]> = ref([])
    const sourceRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const sourceRowStates: Ref<STableRefWrapper<ReturnType<STableCustomBodyerRowStates>>[]> = ref([])
    const sourceCellProps: Ref<Record<string, STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableBodyerCellRender>, VNode>>['props']>>[]> = ref([])
    const sourceCellAttrs: Ref<Record<string, STableRefWrapper<HTMLAttributes>>[]> = ref([])
    const sourceCellRender: Ref<Array<Record<string, any>>> = ref([])

    const listSummary: Ref<STableRecordType[]> = ref([])
    const summaryRowAttrs: Ref<STableRefWrapper<HTMLAttributes>[]> = ref([])
    const summaryCellProps: Ref<Record<string, STableRefWrapper<UnwrapRef<Exclude<ReturnType<STableFooterCellRender>, VNode>>['props']>>[]> = ref([])
    const summaryCellAttrs: Ref<Record<string, STableRefWrapper<HTMLAttributes>>[]> = ref([])
    const summaryCellRender: Ref<Array<Record<string, any>>> = ref([])

    const selectedRowKeys: Ref<Array<STableKey>> = ref(props.selectedRowKeys)
    const expandedRowKeys: Ref<Array<STableKey>> = ref(props.expandedRowKeys)
    const sourceRowKeys: Ref<Array<STableKey>> = ref([])
    const loading: Ref<boolean> = ref(props.loading)

    const Optionser = {
      // column - scrollable
      srcollTop: ref(0),
      scrollLeft: ref(0),
      srcollRight: ref(0),
      srcollBottom: ref(0),
      refTableWrapper: ref(null) as Ref<HTMLElement | null>,
      windowInnerWidth: ref(window.innerWidth),
      windowInnerHeight: ref(window.innerHeight),
      scrollResizeWidth: ref(0),
      scrollResizeHeight: ref(0),
      tableTheadSizes: ref([]) as Ref<Array<{
        colOffset: number;
        rowOffset: number;
        colIndex: number;
        rowIndex: number;
        colSpan: number;
        rowSpan: number;
        height: number;
        width: number;
      }>>,

      // column - resizable
      resizeRcordX: 0,
      resizeRcordScoll: 0,
      resizeRcordBound: 0,
      resizeRcordWidth: 0,
      resizeRcordColumn: null as STableColumnType | null

      // column - draggable
    }

    const Paginator = {
      paginate: reactive({
        showTotal: helper.isFunction(props.paginate.showTotal) ? props.paginate.showTotal : undefined,
        hideOnSinglePage: helper.isBoolean(props.paginate.hideOnSinglePage) ? props.paginate.hideOnSinglePage : true,
        defaultPageSize: helper.isFiniteNumber(props.paginate.defaultPageSize) && props.paginate.defaultPageSize > 0 ? ~~props.paginate.defaultPageSize : 20,
        pageSizeOptions: helper.isNotEmptyArray(props.paginate.pageSizeOptions) ? props.paginate.pageSizeOptions : [10, 15, 20, 25, 30, 50, 100, 200, 300, 500],
        showSizeChanger: helper.isBoolean(props.paginate.showSizeChanger) ? props.paginate.showSizeChanger : undefined,
        showQuickJumper: helper.isBoolean(props.paginate.showQuickJumper) ? props.paginate.showQuickJumper : false,
        showLessItems: helper.isBoolean(props.paginate.showLessItems) ? props.paginate.showLessItems : false,
        loadPageSize: helper.isFiniteNumber(props.paginate.loadPageSize) && props.paginate.loadPageSize > 0 ? ~~props.paginate.loadPageSize : undefined,
        loadPageNo: helper.isFiniteNumber(props.paginate.loadPageNo) && props.paginate.loadPageNo > 0 ? ~~props.paginate.loadPageNo : undefined,
        totalSize: helper.isFiniteNumber(props.paginate.totalSize) && props.paginate.totalSize > 0 ? ~~props.paginate.totalSize : 0,
        totalPage: helper.isFiniteNumber(props.paginate.totalPage) && props.paginate.totalPage > 0 ? ~~props.paginate.totalPage : 0,
        pageSize: helper.isFiniteNumber(props.paginate.pageSize) && props.paginate.pageSize > 0 ? ~~props.paginate.pageSize : (helper.isFiniteNumber(props.paginate.defaultPageSize) && props.paginate.defaultPageSize > 0 ? ~~props.paginate.defaultPageSize : 20),
        pageNo: helper.isFiniteNumber(props.paginate.pageNo) && props.paginate.pageNo > 0 ? ~~props.paginate.pageNo : 1,
        simple: helper.isBoolean(props.paginate.simple) ? props.paginate.simple : false,
        visible: helper.isBoolean(props.paginate.visible) ? props.paginate.visible : false,
        size: props.paginate.size && ['small', 'default'].includes(props.paginate.size) ? props.paginate.size : ((props.size || (configProvider.componentSize === 'large' ? 'default' : configProvider.componentSize)) === 'small' ? 'small' : 'default'),
        mode: (props.paginate.mode === 'local' ? 'local' : 'remote') as 'local' | 'remote'
      }),
      update: (paginate: STablePartPaginate) => {
        Paginator.paginate.mode = !Methoder.isOwnProperty(paginate, ['mode']) ? Paginator.paginate.mode : paginate.mode === 'local' ? 'local' : 'remote'
        Paginator.paginate.size = !Methoder.isOwnProperty(paginate, ['size']) ? Paginator.paginate.size : paginate.size === 'small' ? 'small' : 'default'
        Paginator.paginate.simple = !Methoder.isOwnProperty(paginate, ['simple']) ? Paginator.paginate.simple : paginate.simple === true
        Paginator.paginate.visible = !Methoder.isOwnProperty(paginate, ['visible']) ? Paginator.paginate.visible : paginate.visible === true
        Paginator.paginate.showTotal = !Methoder.isOwnProperty(paginate, ['showTotal']) ? Paginator.paginate.showTotal : helper.isFunction(paginate.showTotal) ? paginate.showTotal : undefined
        Paginator.paginate.showLessItems = !Methoder.isOwnProperty(paginate, ['showLessItems']) ? Paginator.paginate.showLessItems : paginate.showLessItems === true
        Paginator.paginate.defaultPageSize = !Methoder.isOwnProperty(paginate, ['defaultPageSize']) ? Paginator.paginate.defaultPageSize : helper.isFiniteNumber(paginate.defaultPageSize) && paginate.defaultPageSize > 0 ? paginate.defaultPageSize : 20
        Paginator.paginate.pageSizeOptions = !Methoder.isOwnProperty(paginate, ['pageSizeOptions']) ? Paginator.paginate.pageSizeOptions : helper.isNotEmptyArray(paginate.pageSizeOptions) ? paginate.pageSizeOptions : [10, 15, 20, 25, 30, 50, 100, 200, 300, 500]
        Paginator.paginate.showSizeChanger = !Methoder.isOwnProperty(paginate, ['showSizeChanger']) ? Paginator.paginate.showSizeChanger : helper.isBoolean(paginate.showSizeChanger) ? paginate.showSizeChanger : undefined
        Paginator.paginate.showQuickJumper = !Methoder.isOwnProperty(paginate, ['showQuickJumper']) ? Paginator.paginate.showQuickJumper : paginate.showQuickJumper === true
        Paginator.paginate.hideOnSinglePage = !Methoder.isOwnProperty(paginate, ['hideOnSinglePage']) ? Paginator.paginate.hideOnSinglePage : paginate.hideOnSinglePage !== false
        Paginator.paginate.pageNo = !Methoder.isOwnProperty(paginate, ['pageNo']) ? Paginator.paginate.pageNo : helper.isFiniteNumber(paginate.pageNo) && paginate.pageNo > 0 ? ~~paginate.pageNo : 1
        Paginator.paginate.pageSize = !Methoder.isOwnProperty(paginate, ['pageSize']) ? Paginator.paginate.pageSize : helper.isFiniteNumber(paginate.pageSize) && paginate.pageSize > 0 ? ~~paginate.pageSize : 20
        Paginator.paginate.totalSize = !Methoder.isOwnProperty(paginate, ['totalSize']) ? Paginator.paginate.totalSize : helper.isFiniteNumber(paginate.totalSize) && paginate.totalSize > 0 ? ~~paginate.totalSize : 0
        Paginator.paginate.totalPage = !Methoder.isOwnProperty(paginate, ['totalPage']) ? (~~(Paginator.paginate.totalSize / Paginator.paginate.pageSize) + (Paginator.paginate.totalSize % Paginator.paginate.pageSize ? 1 : 0)) : helper.isFiniteNumber(paginate.totalPage) && paginate.totalPage > 0 ? ~~paginate.totalPage : 0
        Paginator.paginate.loadPageNo = !Methoder.isOwnProperty(paginate, ['loadPageNo']) ? Paginator.paginate.loadPageNo : helper.isFiniteNumber(paginate.loadPageNo) && paginate.loadPageNo > 0 ? ~~paginate.loadPageNo : undefined
        Paginator.paginate.loadPageSize = !Methoder.isOwnProperty(paginate, ['loadPageSize']) ? Paginator.paginate.loadPageSize : helper.isFiniteNumber(paginate.loadPageSize) && paginate.loadPageSize > 0 ? ~~paginate.loadPageSize : undefined
        Paginator.paginate.pageNo = Paginator.paginate.pageNo <= Paginator.paginate.totalPage ? Paginator.paginate.pageNo : Paginator.paginate.totalPage
        Paginator.paginate.pageNo = Paginator.paginate.pageNo > 0 ? Paginator.paginate.pageNo : 1
      }
    }

    const Normalizer = {
      size: computed(() => {
        return props.size || (configProvider.componentSize === 'large' ? 'default' : configProvider.componentSize)
      }),

      sticky: computed(() => ({
        topHeader: props.sticky.topHeader ?? false,
        leftBodyer: props.sticky.leftBodyer ?? 0,
        rightBodyer: props.sticky.rightBodyer ?? 0,
        bottomFooter: props.sticky.bottomFooter ?? false,
        rightScrollbar: props.sticky.rightScrollbar ?? true,
        bottomScrollbar: props.sticky.bottomScrollbar ?? true
      })),

      scroll: computed(() => ({
        x: props.scroll.x ?? false,
        y: props.scroll.y ?? false,
        scrollToFirstXOnChange: props.scroll.scrollToFirstXOnChange !== false,
        scrollToFirstYOnChange: props.scroll.scrollToFirstYOnChange !== false,
        getScrollResizeContainer: props.scroll.getScrollResizeContainer
      })),

      loadOnScroll: computed(() => (
        (props.loadOnScroll !== false && Paginator.paginate.mode === 'local') ||
        (props.loadOnScroll === true && Paginator.paginate.visible === false)
      ))
    }

    const Computer = {
      isFixedTop: computed(() => {
        return /^[+-]?\d+\.?\d*(px)?$/.test(`${Normalizer.scroll.value.y}`)
      }),
      fixedLeftIndex: computed(() => {
        const indexs: number[] = []

        for (const columns of listColumns.value) {
          for (const column of columns) {
            if (column && column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'left') {
              indexs.push(column.colOffset + column.colSpan - 1)
            }
          }
        }

        return indexs.length > 0 ? Math.max(...indexs) : -1
      }),
      fixedRightIndex: computed(() => {
        const indexs: number[] = []

        for (const columns of listColumns.value) {
          for (const column of columns) {
            if (column && column.colSpan > 0 && column.rowSpan > 0 && column.fixed === 'right') {
              indexs.push(column.colOffset)
            }
          }
        }

        indexs.splice(0, indexs.length, ...indexs.filter(index => index > Computer.fixedLeftIndex.value))

        return indexs.length > 0 ? Math.min(...indexs) : -1
      }),
      tableBodyWidth: computed(() => {
        const x = Normalizer.scroll.value.x
        const resizeWidth = Optionser.scrollResizeWidth.value
        const windowWidth = Optionser.windowInnerWidth.value

        if (/^0$|^-\d+\.?\d*(px)?$/.test(`${x}`)) {
          return (resizeWidth || windowWidth) + parseInt(`${x}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${x}`)) {
          return parseInt(`${x}`) + 'px'
        }

        if (typeof x === 'string') {
          return x || '100%'
        }

        return '100%'
      }),
      tableBodyHeight: computed(() => {
        const y = Normalizer.scroll.value.y
        const paginate = Paginator.paginate
        const pageHide = paginate.visible !== true || (paginate.totalPage <= 1 && paginate.hideOnSinglePage)
        const pageHeight = paginate.size === 'small' || paginate.simple ? 36 : 44
        const resizeHeight = Optionser.scrollResizeHeight.value
        const windowHeight = Optionser.windowInnerHeight.value

        if (/^0$|^-\d+\.?\d*(px)?$/.test(`${y}`)) {
          return pageHide
            ? (resizeHeight || windowHeight) + parseInt(`${y}`) + 'px'
            : (resizeHeight || windowHeight) + parseInt(`${y}`) - pageHeight + 'px'
        }

        if (/^\d+\.?\d*(px)?$/.test(`${y}`)) {
          return !pageHide
            ? parseInt(`${y}`) + 'px'
            : parseInt(`${y}`) - pageHeight + 'px'
        }

        return 'auto'
      }),
      filterListColumns: computed(() => {
        const filterColumns = (columns: STableWrapColumnType[], wraps: STableWrapColumnType[] = [], parent?: STableWrapColumnType | null) => {
          let offset = parent ? parent.referColumn.colOffset : 0

          for (const [index, column] of columns.entries()) {
            if (!columnSettingsCheckKeys.value.includes(column.key)) {
              continue
            }

            const wrapColumn: STableWrapColumnType = {
              ...column,
              referColumn: reactive({
                ...column.referColumn,
                colOffset: offset + index,
                rowOffset: parent ? parent.referColumn.rowIndex + 1 : 0,
                colMaxSpan: 1,
                rowMaxSpan: parent ? parent.referColumn.rowMaxSpan + 1 : 1,
                colSpan: 1,
                rowSpan: 1
              }),
              treeChildren: []
            }

            wraps.push(wrapColumn)

            if (helper.isNotEmptyArray(column.treeChildren)) {
              const childTrees = filterColumns(column.treeChildren, [], wrapColumn)
              const rowMaxSpan = Math.max(...childTrees.map(child => child.referColumn.rowMaxSpan), wrapColumn.referColumn.rowMaxSpan)
              const colMaxSpan = childTrees.reduce((colMaxSpan, child) => colMaxSpan + child.referColumn.colMaxSpan, 0) || 1
              wrapColumn.referColumn.rowMaxSpan = rowMaxSpan
              wrapColumn.referColumn.colMaxSpan = colMaxSpan
              wrapColumn.treeChildren = childTrees
              offset += colMaxSpan - 1
            }
          }

          return wraps
        }

        const updateColumns = (columns: STableWrapColumnType[], arrays: STableColumnType[][] = [], isRoot: boolean = true) => {
          for (const wrap of columns) {
            const colOffset = wrap.referColumn.colOffset
            const rowOffset = wrap.referColumn.rowOffset

            arrays[rowOffset] = arrays[rowOffset] || []
            arrays[rowOffset][colOffset] = arrays[rowOffset][colOffset] || wrap.referColumn

            if (helper.isNotEmptyArray(wrap.treeChildren)) {
              updateColumns(wrap.treeChildren, arrays, false)
            }
          }

          if (isRoot === true) {
            for (const columns of arrays) {
              for (const column of columns) {
                if (column) {
                  column.colSpan = Number.isFinite(column.colInitSpan) ? column.colInitSpan : column.colMaxSpan
                  column.rowSpan = Number.isFinite(column.rowInitSpan) ? column.rowInitSpan : column.rowIndex < column.rowMaxSpan - 1 ? 1 : arrays.length - column.rowIndex
                }
              }
            }

            const rows = arrays.length as number
            const cols = Math.max(...arrays.map(arr => arr.length), 0) as number
            const arrs = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)) as number[][]

            for (const [rowIndex, columns] of arrays.entries()) {
              for (const [colIndex, column] of columns.entries()) {
                if (column) {
                  column.colOffset = arrs[rowIndex].findIndex(index => index === 0)
                  column.rowOffset = arrs.map(arr => arr[colIndex]).findLastIndex(index => index === 1) + 1
                  column.colOffset = column.colOffset > -1 ? column.colOffset : arrs[rowIndex].length
                  column.rowOffset = column.rowOffset > -1 ? column.rowOffset : 0

                  for (let rowOffset = 0; rowOffset < column.rowSpan; rowOffset++) {
                    for (let colOffset = 0; colOffset < column.colSpan; colOffset++) {
                      arrs[rowIndex + rowOffset] = arrs[rowIndex + rowOffset] || []
                      arrs[rowIndex + rowOffset][colIndex + colOffset] = 1
                    }
                  }
                }
              }
            }
          }

          return arrays
        }

        return updateColumns(filterColumns(treeColumns.value))
      }),
      filterDataColumns: computed(() => {
        const dataColumns: STableColumnType[] = []

        for (const columns of Computer.filterListColumns.value) {
          for (const column of columns) {
            if (!column) {
              continue
            }

            if (column.rowIndex === column.rowMaxSpan - 1) {
              dataColumns[column.colOffset] = column
            }
          }
        }

        return dataColumns
      }),
      filterPageSources: computed(() => {
        return treeSources.value.filter(record => (
          Normalizer.loadOnScroll.value === true ||
          record.rowGroupIndex >= Paginator.paginate.pageSize * (Paginator.paginate.pageNo - 1) ||
          record.rowGroupIndex < Paginator.paginate.pageSize * Paginator.paginate.pageNo
        ))
      }),
      filterRangeSources: computed(() => {
        const renderBufferOne = renderRowRanger.renderBuffer[0]
        const renderBufferTwo = renderRowRanger.renderBuffer[1]
        const renderOffsetOne = renderRowRanger.renderOffset[0]
        const renderOffsetTwo = renderRowRanger.renderOffset[1]
        const renderRangerOne = renderOffsetOne - renderBufferOne > 0 ? renderOffsetOne - renderBufferOne : 0
        const renderRangerTwo = renderOffsetTwo + renderBufferTwo < treeSources.value.length ? renderOffsetTwo + renderBufferTwo : treeSources.value.length

        const filterByPaginate = (record: STableWrapRecordType, index: number) => {
          return (
            Normalizer.loadOnScroll.value === true ||
            record.rowGroupIndex >= Paginator.paginate.pageSize * (Paginator.paginate.pageNo - 1) ||
            record.rowGroupIndex < Paginator.paginate.pageSize * Paginator.paginate.pageNo
          )
        }

        const filterByExpaned = (record: STableWrapRecordType, index: number) => {
          return record.parentKeys.every(key => expandedRowKeys.value.includes(key))
        }

        const filterByRange = (record: STableWrapRecordType, index: number) => {
          return index >= renderRangerOne && index <= renderRangerTwo
        }

        return treeSources.value.filter(filterByPaginate).filter(filterByExpaned).filter(filterByRange)
      }),
      filterPageSummary: computed(() => {
        return listSummary.value.filter(summary => summary)
      })
    }

    const Methoder = {
      getValue(value: any) {
        return toRaw(unref(value))
      },

      isVueNode(value: any) {
        return helper.isObject(value) && isVNode(value)
      },

      isOwnProperty(obj: any, keys: any[]) {
        for (const key of keys) {
          if (!helper.isNotEmptyArray(obj) && !helper.isNotEmptyObject(obj)) {
            return false
          }

          if (!helper.isString(key) && !helper.isFiniteNumber(key)) {
            return false
          }

          if (!Object.hasOwn(obj, key)) {
            return false
          }

          obj = (obj as any)[key]
        }

        return true
      },

      restoreColumns(parts: STableWrapColumnType[]) {
        return parts.map<STablePartColumnType>(part => {
          const column: STablePartColumnType = {
            ...part.cacheColumn,

            children: helper.isNotEmptyArray(part.treeChildren)
              ? Methoder.restoreColumns(part.treeChildren)
              : !helper.isArray(part.cacheColumn.children)
                ? part.cacheColumn.children
                : []
          }

          return column
        })
      },

      restoreSources(parts: STableWrapRecordType[]) {
        return parts.map<STableRecordType>(part => {
          const record: STableRecordType = {
            ...part.referRecord,

            [part.rowTreeKeyField]: helper.isNotEmptyArray(part.treeChildren)
              ? Methoder.restoreSources(part.treeChildren)
              : !helper.isArray(part.referRecord[part.rowTreeKeyField])
                ? part.referRecord[part.rowTreeKeyField]
                : []
          }

          return record
        })
      },

      extractTreeColumns(columns: STableWrapColumnType[], rowIndex: number, colIndex: number) {
        for (const column of columns) {
          if (column.referColumn.rowIndex !== rowIndex) {
            const treeColumn = Methoder.extractTreeColumns(column.treeChildren, rowIndex, colIndex) as STableWrapColumnType | null

            if (treeColumn) {
              return treeColumn as STableWrapColumnType
            }
          }

          if (column.referColumn.rowIndex === rowIndex && column.referColumn.colIndex === colIndex) {
            return column
          }
        }

        return null
      },

      extractListColumns(arrays: STableColumnType[][], rowIndex: number, colIndex: number) {
        for (const columns of arrays) {
          for (const column of columns) {
            if (column?.rowIndex === rowIndex && column?.colIndex === colIndex) {
              return column
            }
          }
        }

        return null
      },

      isColumnsChanged(parts: STablePartColumnType[], temps: STableWrapColumnType[]) {
        if (parts.length !== temps.length) {
          return true
        }

        for (const index of parts.keys()) {
          let changed = false
          const propColumn = toRaw(parts[index])
          const tempColumn = toRaw(temps[index])
          const cacheColumn = tempColumn.cacheColumn

          changed = !helper.toDeepEqual(propColumn, cacheColumn, {
            filter: [
              'key',
              'title',
              'dataIndex',
              'align',
              'fixed',
              'width',
              'minWidth',
              'maxWidth',
              'resizable',
              'ellipsis',
              'colSpan',
              'rowSpan',
              'sorter',
              'sorterField',
              'sortDirections',
              'defaultSorterValue',
              'sorterValueChange',
              'customHeaderCellAttrs',
              'customBodyerCellAttrs',
              'customHeaderCellRender',
              'customBodyerCellRender'
            ]
          })

          if (!changed) {
            if (!helper.isArray(propColumn.children)) {
              changed = (propColumn.children !== undefined && propColumn.children !== null) || !helper.isEmptyArray(tempColumn.treeChildren)
            }

            if (helper.isArray(propColumn.children)) {
              changed = Methoder.isColumnsChanged(propColumn.children, tempColumn.treeChildren)
            }
          }

          if (changed) {
            return true
          }
        }

        return false
      },

      isSourcesChanged(parts: STableRecordType[], temps: STableWrapRecordType[]) {
        if (parts.length !== temps.length) {
          return true
        }

        for (const index of parts.keys()) {
          let changed = false
          let treeKey = 'children'
          let rowKey = 'key'

          const partRecord = toRaw(parts[index])
          const tempRecord = toRaw(temps[index])
          const referRecord = tempRecord.referRecord

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(partRecord) : treeKey
          treeKey = helper.isNotEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNotEmptyString(treeKey) ? treeKey.trim() : 'children'

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(partRecord) : rowKey
          rowKey = helper.isNotEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNotEmptyString(rowKey) ? rowKey.trim() : 'key'

          if (partRecord !== referRecord && partRecord[rowKey] !== referRecord[rowKey]) {
            return true
          }

          if (!helper.isArray(partRecord[treeKey])) {
            changed = (partRecord[treeKey] !== undefined && partRecord[treeKey] !== null) || !helper.isEmptyArray(tempRecord.treeChildren)
          }

          if (helper.isArray(partRecord[treeKey])) {
            changed = Methoder.isSourcesChanged(partRecord[treeKey], tempRecord.treeChildren)
          }

          if (changed) {
            return true
          }
        }

        return false
      },

      isSummaryChanged(parts: STableRecordType[], temps: STableRecordType[]) {
        if (parts.length !== temps.length) {
          return true
        }

        for (const index of parts.keys()) {
          const partRecord = toRaw(parts[index])
          const tempRecord = toRaw(temps[index])

          if (parts === temps) {
            break
          }

          if (!helper.toDeepEqual(partRecord, tempRecord)) {
            return true
          }
        }

        return false
      },

      normalizeTreeColumns(columns: STablePartColumnType[], wraps: STableWrapColumnType[] = [], parent?: STableWrapColumnType | null) {
        let offset = parent ? parent.referColumn.colOffset : 0

        for (const [index, column] of columns.entries()) {
          const wrapColumn: STableWrapColumnType = {
            key: column.key || (helper.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex),
            childKeys: [],
            parentKeys: parent ? [...parent.parentKeys, parent.key] : [],
            referColumn: {
              key: column.key || (helper.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex),
              title: column.title,
              parentKey: parent ? parent.key : '',
              dataIndex: column.dataIndex,
              children: [],
              align: column.align ?? parent?.referColumn.align ?? 'left',
              fixed: column.fixed ?? parent?.referColumn.fixed ?? false,
              width: column.width,
              minWidth: column.minWidth,
              maxWidth: column.maxWidth,
              resizable: column.resizable ?? parent?.referColumn.resizable ?? false,
              ellipsis: column.ellipsis ?? parent?.referColumn.ellipsis ?? false,
              colIndex: offset + index,
              rowIndex: parent ? parent.referColumn.rowIndex + 1 : 0,
              colOffset: offset + index,
              rowOffset: parent ? parent.referColumn.rowIndex + 1 : 0,
              colInitSpan: helper.isFiniteNumber(column.colSpan) ? column.colSpan : NaN,
              rowInitSpan: helper.isFiniteNumber(column.rowSpan) ? column.rowSpan : NaN,
              colMaxSpan: 1,
              rowMaxSpan: parent ? parent.referColumn.rowMaxSpan + 1 : 1,
              colSpan: 1,
              rowSpan: 1,
              sorter: column.sorter ?? parent?.referColumn.sorter ?? false,
              sortered: false,
              sortDirections: column.sortDirections ?? parent?.referColumn.sortDirections,
              sorterField: column.sorterField ?? column.dataIndex,
              defaultSorterValue: column.defaultSorterValue || '',
              currentSorterValue: '',
              activedSorterValues: [] as Array<{ field: string | string[]; value: 'ascend'| 'descend'; }>,
              sorterValueChange: column.sorterValueChange ?? parent?.referColumn.sorterValueChange,
              customHeaderCellAttrs: column.customHeaderCellAttrs ?? parent?.referColumn.customHeaderCellAttrs,
              customBodyerCellAttrs: column.customBodyerCellAttrs ?? parent?.referColumn.customBodyerCellAttrs,
              customFooterCellAttrs: column.customFooterCellAttrs ?? parent?.referColumn.customFooterCellAttrs,
              customHeaderCellRender: column.customHeaderCellRender ?? parent?.referColumn.customHeaderCellRender,
              customBodyerCellRender: column.customBodyerCellRender ?? parent?.referColumn.customBodyerCellRender,
              customFooterCellRender: column.customFooterCellRender ?? parent?.referColumn.customFooterCellRender
            },
            cacheColumn: column,
            treeChildren: [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? [...parent.rowGroupIndexs, index] : [index]
          }

          wraps.push(wrapColumn)

          if (helper.isNotEmptyArray(column.children)) {
            const childTrees = Methoder.normalizeTreeColumns(column.children, [], wrapColumn)
            const childKeys = [...childTrees.map(tree => tree.key), ...childTrees.map(tree => tree.childKeys).flat()]
            const rowMaxSpan = Math.max(...childTrees.map(child => child.referColumn.rowMaxSpan), wrapColumn.referColumn.rowMaxSpan)
            const colMaxSpan = childTrees.reduce((colMaxSpan, child) => colMaxSpan + child.referColumn.colMaxSpan, 0) || 1
            wrapColumn.referColumn.rowMaxSpan = rowMaxSpan
            wrapColumn.referColumn.colMaxSpan = colMaxSpan
            wrapColumn.treeChildren = childTrees
            wrapColumn.childKeys = childKeys
            offset += colMaxSpan - 1
          }
        }

        return wraps
      },

      normalizeTreeSources(sources: STableRecordType[], wraps: STableWrapRecordType[] = [], parent?: STableWrapRecordType) {
        const TempCacher = {
          offset: -1
        }

        for (const [index, source] of sources.entries()) {
          let rowKey = 'key'
          let treeKey = 'children'

          TempCacher.offset = TempCacher.offset + 1

          rowKey = helper.isFunction(props.rowKey) ? props.rowKey(source) : rowKey
          rowKey = helper.isNotEmptyString(props.rowKey) ? props.rowKey : rowKey
          rowKey = helper.isNotEmptyString(rowKey) ? rowKey.trim() : 'key'

          treeKey = helper.isFunction(props.treeKey) ? props.treeKey(source) : treeKey
          treeKey = helper.isNotEmptyString(props.treeKey) ? props.treeKey : treeKey
          treeKey = helper.isNotEmptyString(treeKey) ? treeKey.trim() : 'children'

          const cacheRecord = treeSources.value.find(wrap => {
            const isSomeRowKeyField = wrap.rowKeyField === rowKey
            const isExistRowKeyValue = helper.isNotEmptyString(wrap.key) || helper.isFiniteNumber(wrap.key)
            return isSomeRowKeyField && isExistRowKeyValue ? wrap.key === source[rowKey] : toRaw(wrap.referRecord) === toRaw(source)
          })

          const wrapRecord: STableWrapRecordType = {
            key: source[rowKey],
            childKeys: [],
            parentKeys: parent ? [...parent.parentKeys, parent.key] : [],
            referRecord: source,
            treeChildren: [],
            rowGroupLevel: parent ? parent.rowGroupLevel + 1 : 1,
            rowGroupIndex: parent ? parent.rowGroupIndex : index,
            rowGroupIndexs: parent ? [...parent.rowGroupIndexs, index] : [index],
            rowGlobalIndex: TempCacher.offset,
            rowTreeKeyField: treeKey,
            rowKeyField: rowKey,
            rowHeight: cacheRecord ? cacheRecord.rowHeight : renderRowPresets.minHeight
          }

          wraps.push(wrapRecord)

          if (helper.isNotEmptyArray(source[wrapRecord.rowTreeKeyField])) {
            const childTrees = Methoder.normalizeTreeSources(source[wrapRecord.rowTreeKeyField], [], wrapRecord)
            const childKeys = [...childTrees.map(tree => tree.key), ...childTrees.map(tree => tree.childKeys).flat()]
            TempCacher.offset = wrapRecord.rowGlobalIndex + childKeys.length
            wrapRecord.treeChildren = childTrees
            wrapRecord.childKeys = childKeys
          }

          if (!sourceRowKeys.value.includes(wrapRecord.key)) {
            props.defaultSelectAllRows && !selectedRowKeys.value.includes(wrapRecord.key) && selectedRowKeys.value.push(wrapRecord.key)
            props.defaultExpandAllRows && !expandedRowKeys.value.includes(wrapRecord.key) && expandedRowKeys.value.push(wrapRecord.key)
            sourceRowKeys.value.push(wrapRecord.key)
          }
        }

        return wraps
      },

      normalizeTreeSettings(columns: STableWrapColumnType[], settings?: STableSettingsType[]) {
        settings = settings || columnSettingsAllTrees.value

        for (const wrap of columns) {
          const setting = {
            key: wrap.referColumn.key,
            title: wrap.referColumn.title,
            disabled: wrap.referColumn.fixed === 'left' || wrap.referColumn.fixed === 'right',
            column: wrap.referColumn,
            children: []
          }

          if (helper.isNotEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeTreeSettings(wrap.treeChildren, setting.children)
          }

          if (!columnSettingsAllKeys.value.includes(wrap.referColumn.key)) {
            columnSettingsCheckKeys.value.push(wrap.referColumn.key)
            columnSettingsAllKeys.value.push(wrap.referColumn.key)
          }

          settings.push(setting)
        }

        return settings
      },

      normalizeListColumns(columns: STableWrapColumnType[], arrays: STableColumnType[][]) {
        for (const wrap of columns) {
          const colOffset = wrap.referColumn.colOffset
          const rowOffset = wrap.referColumn.rowOffset

          arrays[rowOffset] = arrays[rowOffset] || []
          arrays[rowOffset][colOffset] = arrays[rowOffset][colOffset] || wrap.referColumn

          if (helper.isNotEmptyArray(wrap.treeChildren)) {
            Methoder.normalizeListColumns(wrap.treeChildren, arrays)
          }
        }

        return arrays
      },

      normalizeDataColumns(arrays: Array<STableColumnType>[] = []) {
        const dataColumns: STableColumnType[] = []

        for (const columns of arrays) {
          for (const column of columns) {
            if (!column) {
              continue
            }

            if (column.rowIndex === column.rowMaxSpan - 1) {
              dataColumns[column.colOffset] = column
            }
          }
        }

        return dataColumns
      },

      normalizeListSummary(summarys: Array<STableRecordType> = []) {
        return summarys.map(record => record)
      },

      normalizeInitColumns(arrays: STableColumnType[][] = []) {
        for (const [rowIndex, columns] of arrays.entries()) {
          if (helper.isFunction(props.customHeaderRowAttrs)) {
            columnRowAttrs.value[rowIndex] = columnRowAttrs.value[rowIndex] || props.customHeaderRowAttrs({ columns: readonly(columns), rowIndex })
          }

          if (columnRowAttrs.value[rowIndex] === undefined) {
            columnRowAttrs.value[rowIndex] = {}
          }
        }

        for (const column of arrays.flat()) {
          if (!column) {
            continue
          }

          const rowIndex = column.rowIndex
          const colIndex = column.colIndex

          if (helper.isFunction(column.customHeaderCellAttrs)) {
            columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
            columnCellAttrs.value[rowIndex][colIndex] = columnCellAttrs.value[rowIndex][colIndex] || column.customHeaderCellAttrs({ column: readonly(column), rowIndex, colIndex })
          }

          if (helper.isFunction(column.customHeaderCellRender)) {
            if (!Methoder.isOwnProperty(columnCellRender.value, [rowIndex, colIndex])) {
              const renderNode = column.customHeaderCellRender({ title: column.title, column: readonly(column), rowIndex, colIndex })

              columnCellRender.value[rowIndex] = helper.isArray(columnCellRender.value[rowIndex]) ? columnCellRender.value[rowIndex] : []
              columnCellRender.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined

              if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.props)) {
                column.align = Object.hasOwn(renderNode.props, 'align') ? renderNode.props.align || 'left' : column.align
                column.fixed = Object.hasOwn(renderNode.props, 'fixed') ? renderNode.props.fixed || false : column.fixed
                column.width = Object.hasOwn(renderNode.props, 'width') ? renderNode.props.width || undefined : column.width
                column.minWidth = Object.hasOwn(renderNode.props, 'minWidth') ? renderNode.props.minWidth || undefined : column.minWidth
                column.maxWidth = Object.hasOwn(renderNode.props, 'maxWidth') ? renderNode.props.maxWidth || undefined : column.maxWidth
                column.resizable = Object.hasOwn(renderNode.props, 'resizable') ? renderNode.props.resizable || false : column.resizable
                column.ellipsis = Object.hasOwn(renderNode.props, 'ellipsis') ? renderNode.props.ellipsis || false : column.ellipsis
                column.colSpan = Object.hasOwn(renderNode.props, 'colSpan') ? helper.isFiniteNumber(renderNode.props.colSpan) ? renderNode.props.colSpan : column.colSpan : column.colSpan
                column.rowSpan = Object.hasOwn(renderNode.props, 'rowSpan') ? helper.isFiniteNumber(renderNode.props.rowSpan) ? renderNode.props.rowSpan : column.rowSpan : column.rowSpan
                column.sorter = Object.hasOwn(renderNode.props, 'sorter') ? renderNode.props.sorter || false : column.sorter
                column.sorterField = Object.hasOwn(renderNode.props, 'sorterField') ? renderNode.props.sorterField || '' : column.sorterField
                column.sortDirections = Object.hasOwn(renderNode.props, 'sortDirections') ? renderNode.props.sortDirections || undefined : column.sortDirections
              }
            }
          }

          if (!helper.isFunction(column.customHeaderCellRender) && helper.isFunction(props.headerCell)) {
            if (!Methoder.isOwnProperty(columnCellRender.value, [rowIndex, colIndex])) {
              const renderNode = props.headerCell({ title: column.title, column: readonly(column), rowIndex, colIndex })

              columnCellRender.value[rowIndex] = helper.isArray(columnCellRender.value[rowIndex]) ? columnCellRender.value[rowIndex] : []
              columnCellRender.value[rowIndex][colIndex] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined

              if (helper.isObject(renderNode) && !isVNode(renderNode) && helper.isNotEmptyObject(renderNode.props)) {
                column.align = Object.hasOwn(renderNode.props, 'align') ? renderNode.props.align || 'left' : column.align
                column.fixed = Object.hasOwn(renderNode.props, 'fixed') ? renderNode.props.fixed || false : column.fixed
                column.width = Object.hasOwn(renderNode.props, 'width') ? renderNode.props.width || undefined : column.width
                column.minWidth = Object.hasOwn(renderNode.props, 'minWidth') ? renderNode.props.minWidth || undefined : column.minWidth
                column.maxWidth = Object.hasOwn(renderNode.props, 'maxWidth') ? renderNode.props.maxWidth || undefined : column.maxWidth
                column.resizable = Object.hasOwn(renderNode.props, 'resizable') ? renderNode.props.resizable || false : column.resizable
                column.ellipsis = Object.hasOwn(renderNode.props, 'ellipsis') ? renderNode.props.ellipsis || false : column.ellipsis
                column.colSpan = Object.hasOwn(renderNode.props, 'colSpan') ? helper.isFiniteNumber(renderNode.props.colSpan) ? renderNode.props.colSpan : column.colSpan : column.colSpan
                column.rowSpan = Object.hasOwn(renderNode.props, 'rowSpan') ? helper.isFiniteNumber(renderNode.props.rowSpan) ? renderNode.props.rowSpan : column.rowSpan : column.rowSpan
                column.sorter = Object.hasOwn(renderNode.props, 'sorter') ? renderNode.props.sorter || false : column.sorter
                column.sorterField = Object.hasOwn(renderNode.props, 'sorterField') ? renderNode.props.sorterField || '' : column.sorterField
                column.sortDirections = Object.hasOwn(renderNode.props, 'sortDirections') ? renderNode.props.sortDirections || undefined : column.sortDirections
              }
            }
          }

          if (columnCellAttrs.value[rowIndex]?.[colIndex] === undefined) {
            columnCellAttrs.value[rowIndex] = columnCellAttrs.value[rowIndex] || []
            columnCellAttrs.value[rowIndex][colIndex] = {}
          }

          if (columnCellRender.value[rowIndex]?.[colIndex] === undefined) {
            columnCellRender.value[rowIndex] = columnCellRender.value[rowIndex] || []
            columnCellRender.value[rowIndex][colIndex] = column.title
          }
        }

        return arrays
      },

      normalizeInitSources(sources: STableWrapRecordType[]) {
        for (const option of sources) {
          const record = readonly(option.referRecord)
          const rowIndex = option.rowGroupIndex
          const groupLevel = option.rowGroupLevel
          const groupIndex = option.rowGroupIndex
          const groupIndexs = option.rowGroupIndexs
          const globalIndex = option.rowGlobalIndex

          if (helper.isFunction(props.customBodyerRowAttrs)) {
            sourceRowAttrs.value[globalIndex] = sourceRowAttrs.value[globalIndex] || props.customBodyerRowAttrs({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (helper.isFunction(props.customBodyerRowStates)) {
            sourceRowStates.value[globalIndex] = sourceRowStates.value[globalIndex] || props.customBodyerRowStates({ record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex })
          }

          if (sourceRowAttrs.value[globalIndex] === undefined) {
            sourceRowAttrs.value[globalIndex] = {}
          }

          if (sourceRowStates.value[globalIndex] === undefined) {
            sourceRowStates.value[globalIndex] = {}
          }
        }

        for (const item of dataColumns.value) {
          const column = readonly(item)
          const columnKey = column.key
          const colIndex = column.colIndex
          const dataIndex = column.dataIndex

          for (const option of sources) {
            const record = readonly(option.referRecord)
            const rowIndex = option.rowGroupIndex
            const groupLevel = option.rowGroupLevel
            const groupIndex = option.rowGroupIndex
            const groupIndexs = option.rowGroupIndexs
            const globalIndex = option.rowGlobalIndex

            let value
            let index = 0

            value = helper.isArray(dataIndex) && helper.isObject(record) ? record[dataIndex[index++]] : value
            value = helper.isString(dataIndex) ? record[dataIndex] : value

            if (helper.isNotEmptyArray(dataIndex)) {
              while (index < dataIndex.length) {
                if (!helper.isArray(value) || !helper.isObject(value)) {
                  value = undefined
                  break
                }
                value = value[column.dataIndex[index++]]
              }
            }

            if (helper.isFunction(column.customBodyerCellAttrs)) {
              sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || []
              sourceCellAttrs.value[globalIndex][columnKey] = sourceCellAttrs.value[globalIndex][columnKey] || column.customBodyerCellAttrs({ value, record, rowIndex, groupIndex, groupLevel, groupIndexs, globalIndex, column, colIndex })
            }

            if (helper.isFunction(column.customBodyerCellRender)) {
              if (!Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])) {
                const renderNode = column.customBodyerCellRender({
                  value,
                  record,
                  rowIndex,
                  groupIndex,
                  groupLevel,
                  groupIndexs,
                  globalIndex,
                  column,
                  colIndex
                })

                sourceCellProps.value[globalIndex] = helper.isObject(sourceCellProps.value[globalIndex]) ? sourceCellProps.value[globalIndex] : {}
                sourceCellRender.value[globalIndex] = helper.isObject(sourceCellRender.value[globalIndex]) ? sourceCellRender.value[globalIndex] : {}
                sourceCellRender.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                sourceCellProps.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (!helper.isFunction(column.customBodyerCellRender) && helper.isFunction(props.bodyerCell)) {
              if (!Methoder.isOwnProperty(sourceCellProps.value, [globalIndex, columnKey])) {
                const renderNode = props.bodyerCell({
                  value,
                  record,
                  rowIndex,
                  groupIndex,
                  groupLevel,
                  groupIndexs,
                  globalIndex,
                  column,
                  colIndex
                })

                sourceCellProps.value[globalIndex] = helper.isObject(sourceCellProps.value[globalIndex]) ? sourceCellProps.value[globalIndex] : {}
                sourceCellRender.value[globalIndex] = helper.isObject(sourceCellRender.value[globalIndex]) ? sourceCellRender.value[globalIndex] : {}
                sourceCellRender.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                sourceCellProps.value[globalIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (sourceCellAttrs.value[globalIndex]?.[columnKey] === undefined) {
              sourceCellAttrs.value[globalIndex] = sourceCellAttrs.value[globalIndex] || {}
              sourceCellAttrs.value[globalIndex][columnKey] = {}
            }

            if (sourceCellProps.value[globalIndex]?.[columnKey] === undefined) {
              sourceCellProps.value[globalIndex] = sourceCellProps.value[globalIndex] || {}
              sourceCellProps.value[globalIndex][columnKey] = {}
            }

            if (sourceCellRender.value[globalIndex]?.[columnKey] === undefined) {
              sourceCellRender.value[globalIndex] = sourceCellRender.value[globalIndex] || {}
              sourceCellRender.value[globalIndex][columnKey] = value
            }
          }
        }
      },

      normalizeInitSummary(summarys: STableRecordType[]) {
        summaryRowAttrs.value = []
        summaryCellProps.value = []
        summaryCellAttrs.value = []
        summaryCellRender.value = []

        const sources = readonly(Computer.filterPageSources.value)
        const paginate = readonly(Paginator.paginate)

        for (const [rowIndex, record] of summarys.entries()) {
          if (helper.isFunction(props.customFooterRowAttrs)) {
            summaryRowAttrs.value[rowIndex] = summaryRowAttrs.value[rowIndex] || props.customFooterRowAttrs({ record: readonly(record), rowIndex, sources, paginate })
          }

          if (summaryRowAttrs.value[rowIndex] === undefined) {
            summaryRowAttrs.value[rowIndex] = {}
          }
        }

        for (const item of dataColumns.value) {
          const column = readonly(item)
          const columnKey = column.key
          const colIndex = column.colIndex
          const dataIndex = column.dataIndex

          for (const [rowIndex, record] of summarys.entries()) {
            let value
            let index = 0

            value = helper.isArray(dataIndex) && helper.isObject(record) ? record[dataIndex[index++]] : value
            value = helper.isString(dataIndex) ? record[dataIndex] : value

            if (helper.isNotEmptyArray(dataIndex)) {
              while (index < dataIndex.length) {
                if (!helper.isArray(value) || !helper.isObject(value)) {
                  value = undefined
                  break
                }
                value = value[column.dataIndex[index++]]
              }
            }

            if (helper.isFunction(column.customFooterCellAttrs)) {
              summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || []
              summaryCellAttrs.value[rowIndex][columnKey] = summaryCellAttrs.value[rowIndex][columnKey] || column.customFooterCellAttrs({ value, record, rowIndex, column, colIndex, sources, paginate })
            }

            if (helper.isFunction(column.customFooterCellRender)) {
              if (!Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])) {
                const renderNode = column.customFooterCellRender({
                  value,
                  record,
                  rowIndex,
                  column,
                  colIndex,
                  sources,
                  paginate
                })

                summaryCellProps.value[rowIndex] = helper.isObject(summaryCellProps.value[rowIndex]) ? summaryCellProps.value[rowIndex] : {}
                summaryCellRender.value[rowIndex] = helper.isObject(summaryCellRender.value[rowIndex]) ? summaryCellRender.value[rowIndex] : {}
                summaryCellRender.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                summaryCellProps.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (!helper.isFunction(column.customFooterCellRender) && helper.isFunction(props.footerCell)) {
              if (!Methoder.isOwnProperty(summaryCellProps.value, [rowIndex, columnKey])) {
                const renderNode = props.footerCell({
                  value,
                  record,
                  rowIndex,
                  column,
                  colIndex,
                  sources,
                  paginate
                })

                summaryCellProps.value[rowIndex] = helper.isObject(summaryCellProps.value[rowIndex]) ? summaryCellProps.value[rowIndex] : {}
                summaryCellRender.value[rowIndex] = helper.isObject(summaryCellRender.value[rowIndex]) ? summaryCellRender.value[rowIndex] : {}
                summaryCellRender.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (isVNode(renderNode) ? renderNode : renderNode.children) : undefined
                summaryCellProps.value[rowIndex][columnKey] = helper.isObject(renderNode) ? (!isVNode(renderNode) && renderNode.props || undefined) : undefined
              }
            }

            if (summaryCellAttrs.value[rowIndex]?.[columnKey] === undefined) {
              summaryCellAttrs.value[rowIndex] = summaryCellAttrs.value[rowIndex] || {}
              summaryCellAttrs.value[rowIndex][columnKey] = {}
            }

            if (summaryCellProps.value[rowIndex]?.[columnKey] === undefined) {
              summaryCellProps.value[rowIndex] = summaryCellProps.value[rowIndex] || {}
              summaryCellProps.value[rowIndex][columnKey] = {}
            }

            if (summaryCellRender.value[rowIndex]?.[columnKey] === undefined) {
              summaryCellRender.value[rowIndex] = summaryCellRender.value[rowIndex] || {}
              summaryCellRender.value[rowIndex][columnKey] = value
            }
          }
        }
      },

      updatePropColumns(columns: STableWrapColumnType[]) {
        if (Methoder.isColumnsChanged(props.columns, columns)) {
          context.emit('update:sources', Methoder.restoreColumns(columns))
        }
      },

      updatePropSources(sources: STableWrapRecordType[]) {
        if (Methoder.isSourcesChanged(props.sources, sources)) {
          context.emit('update:sources', Methoder.restoreSources(sources))
        }
      },

      updatePropPaginate(paginate: STablePaginateType) {
        if (!helper.toDeepEqual(props.paginate, paginate)) {
          context.emit('update:paginate', { ...paginate })
        }
      },

      updateSetupSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => selectedRowKeys.value.includes(key)) || !selectedRowKeys.value.every(key => keys.includes(key))) {
          selectedRowKeys.value = keys
          Methoder.cleanSelectedRowKeys()
        }
      },

      updatePropSelectedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.selectedRowKeys.includes(key)) || !props.selectedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:selectedRowKeys', keys)
        }
      },

      updateSetupExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => expandedRowKeys.value.includes(key)) || !expandedRowKeys.value.every(key => keys.includes(key))) {
          expandedRowKeys.value = keys
          Methoder.cleanExpandedRowKeys()
        }
      },

      updatePropExpandedRowKeys(keys: STableKey[]) {
        keys = Array.from(new Set(keys))

        if (!keys.every(key => props.expandedRowKeys.includes(key)) || !props.expandedRowKeys.every(key => keys.includes(key))) {
          context.emit('update:expandedRowKeys', keys)
        }
      },

      cleanSelectedRowKeys() {
        if (props.selectedMode === 'Radio' && selectedRowKeys.value.length > 1) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => props.preserveSelectedRowKeys || sourceRowKeys.value.includes(key)).filter((_, index) => index < 1)
        }

        if (!props.preserveSelectedRowKeys && !selectedRowKeys.value.every(key => sourceRowKeys.value.includes(key))) {
          selectedRowKeys.value = selectedRowKeys.value.filter(key => sourceRowKeys.value.includes(key))
        }
      },

      cleanExpandedRowKeys() {
        if (!props.preserveExpandedRowKeys && !expandedRowKeys.value.every(key => sourceRowKeys.value.includes(key))) {
          expandedRowKeys.value = expandedRowKeys.value.filter(key => sourceRowKeys.value.includes(key))
        }
      },

      forceUpdate() {
        // Update Columns
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellRender.value = []
        columnSettingsAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(props.columns, [])
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value, [])
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        Methoder.normalizeTreeSettings(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)

        // Update DataSources
        sourceRowAttrs.value = []
        sourceRowStates.value = []
        sourceCellProps.value = []
        sourceCellAttrs.value = []
        sourceCellRender.value = []
        treeSources.value = Methoder.normalizeTreeSources(props.sources, [])
        Methoder.normalizeInitSources(Computer.filterRangeSources.value)

        // Update Summarys
        listSummary.value = Methoder.normalizeListSummary(props.summarys)

        // Update Clean RowKeys
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      }
    }

    const Observer = {
      intersectionObserver: new IntersectionObserver(() => {

      }),

      mutationObserver: new MutationObserver(() => {

      }),

      resizeObserver: new ResizeObserver(() => {
        Eventer.updateResizeContainer()
        Eventer.updateScrollContainer()
      })
    }

    const Eventer = {
      computeTableGroupStyle(column: STableColumnType, index?: number) {
        const style = {
          width: helper.isString(column.width) ? column.width : 'auto',
          minWidth: helper.isString(column.width) ? column.width : 'auto'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${column.width}`)) {
          style.width = parseInt(`${column.width}`) + 'px'
          style.minWidth = parseInt(`${column.width}`) + 'px'
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${column.minWidth}`)) {
          style.minWidth = parseInt(`${column.minWidth}`) + 'px'
        }

        return style
      },

      computeTableChildStyle(column: STableColumnType, type: string) {
        const style = {}
        const scrollLeft = Optionser.scrollLeft.value
        const srcollRight = Optionser.srcollRight.value
        const tableTheadSizes = Optionser.tableTheadSizes.value
        const currentFixedLeft = Computer.fixedLeftIndex.value > -1 && column.colOffset < Computer.fixedLeftIndex.value
        const currentFixedRight = Computer.fixedRightIndex.value > -1 && column.colOffset >= Computer.fixedRightIndex.value

        if (/^\+?\d+\.?\d*(px)?$/.test(`${column.minWidth}`)) {
          Object.assign(style, {
            minWidth: parseInt(`${column.minWidth}`) + 'px'
          })
        }

        if (/^\+?\d+\.?\d*(px)?$/.test(`${column.maxWidth}`)) {
          Object.assign(style, {
            maxWidth: parseInt(`${column.maxWidth}`) + 'px'
          })
        }

        if (typeof column.align === 'string') {
          Object.assign(style, {
            'text-align': column.align || 'left'
          })
        }

        if (column.ellipsis === true) {
          Object.assign(style, {
            'overflow': 'hidden',
            'white-space': 'nowrap',
            'text-overflow': 'ellipsis'
          })
        }

        if (currentFixedLeft === true) {
          const leftBodyer = helper.isFiniteNumber(Normalizer.sticky.value.leftBodyer) ? Normalizer.sticky.value.leftBodyer : 0
          const leftWidth = tableTheadSizes.reduce((total, item) => item.colOffset < column.colOffset ? total + item.width : total, leftBodyer)
          const boxShadow = '3px ' + (type === 'thead' ? '-1px' : '1px') + ' 3px 0 rgba(0, 0, 0, .15)'

          Object.assign(style, {
            'position': 'sticky',
            'left': leftWidth + 'px',
            'box-shadow': scrollLeft > 0 && column.colOffset === Computer.fixedLeftIndex.value - 1 ? boxShadow : 'none'
          })
        }

        if (currentFixedRight === true) {
          const rightBodyer = helper.isFiniteNumber(Normalizer.sticky.value.rightBodyer) ? Normalizer.sticky.value.rightBodyer : 0
          const rightWidth = tableTheadSizes.reduce((total, item) => item.colOffset >= column.colOffset ? total + item.width : total, rightBodyer)
          const boxShadow = '-3px ' + (type === 'thead' ? '-1px' : '1px') + ' 3px 0 rgba(0, 0, 0, .15)'

          Object.assign(style, {
            'position': 'sticky',
            'right': rightWidth + 'px',
            'box-shadow': srcollRight > 1 && column.colOffset === Computer.fixedLeftIndex.value ? boxShadow : 'none'
          })
        }

        return style
      },

      updateResizeContainer(entries: Array<any> = []) {
        if (Normalizer.scroll.value.getScrollResizeContainer) {
          const container = Normalizer.scroll.value.getScrollResizeContainer()
          const clientRect = container && container.getBoundingClientRect()
          Optionser.scrollResizeWidth.value = clientRect ? clientRect.width : 0
          Optionser.scrollResizeHeight.value = clientRect ? clientRect.height : 0
        }
      },

      updateScrollContainer(entries: Array<any> = []) {
        if (Optionser.refTableWrapper.value) {
          const scrollContainer = Optionser.refTableWrapper.value
          const offsetHeight = scrollContainer.offsetHeight || 0
          const offsetWidth = scrollContainer.offsetWidth || 0
          const scrollHeight = scrollContainer.scrollHeight || 0
          const scrollWidth = scrollContainer.scrollWidth || 0
          const scrollLeft = scrollContainer.scrollLeft || 0
          const scrollTop = scrollContainer.scrollTop || 0

          Optionser.srcollTop.value = scrollTop || 0
          Optionser.scrollLeft.value = scrollLeft || 0
          Optionser.srcollRight.value = scrollWidth - (scrollLeft + offsetWidth) || 0
          Optionser.srcollBottom.value = scrollHeight - (scrollTop + offsetHeight) || 0

          Optionser.tableTheadSizes.value = dataColumns.value.map(column => {
            const rowSpan = column.rowSpan
            const colSpan = column.colSpan
            const rowIndex = column.rowIndex
            const colIndex = column.colIndex
            const rowOffset = column.rowOffset
            const colOffset = column.colOffset
            const tableThead = scrollContainer.querySelector<HTMLElement>(`.s-table-thead-th[row-index="${rowIndex}"][col-index="${colIndex}"]`)

            return {
              rowSpan,
              colSpan,
              rowIndex,
              colIndex,
              rowOffset,
              colOffset,
              width: tableThead?.offsetWidth || 0,
              height: tableThead?.offsetHeight || 0
            }
          })
        }
      },

      documentMouseMove(event: MouseEvent) {
        if (Optionser.resizeRcordColumn) {
          const offsetX = event.clientX - Optionser.resizeRcordX
          const maxWidth = Optionser.resizeRcordColumn.maxWidth || Infinity
          const minWidth = Optionser.resizeRcordColumn.minWidth || 0
          const nowWidth = Optionser.resizeRcordWidth + offsetX || 0
          const nowBound = Optionser.resizeRcordBound + offsetX || 0
          const $wrapper = Optionser.refTableWrapper.value

          if ($wrapper && nowBound > 0) {
            nextTick(() => $wrapper.scroll({ left: Optionser.resizeRcordScoll + nowBound + 10 }))
          }

          Optionser.resizeRcordColumn.width = nowWidth < maxWidth ? nowWidth : maxWidth
          Optionser.resizeRcordColumn.width = nowWidth > minWidth ? nowWidth : minWidth
          Optionser.resizeRcordColumn.width = nowWidth > 0 ? nowWidth : 0

          return
        }
      },

      documentMouseup(event: MouseEvent) {
        if (Optionser.resizeRcordColumn) {
          const width = Optionser.resizeRcordColumn.width
          const rowIndex = Optionser.resizeRcordColumn.rowIndex
          const colIndex = Optionser.resizeRcordColumn.colIndex
          const treeColumn = Methoder.extractTreeColumns(treeColumns.value, rowIndex, colIndex)!
          treeColumn.referColumn.width = width
          treeColumn.cacheColumn.width = width
        }

        Optionser.resizeRcordX = 0
        Optionser.resizeRcordScoll = 0
        Optionser.resizeRcordBound = 0
        Optionser.resizeRcordWidth = 0
        Optionser.resizeRcordColumn = null
        Optionser.refTableWrapper.value?.classList.remove('user-select-none')
        Optionser.refTableWrapper.value?.classList.remove('cursor-column-resize')
      }
    }

    watch([() => props.columns, () => props.sources, () => props.summarys], () => {
      const columnsChanged = Methoder.isColumnsChanged(props.columns, treeColumns.value)
      const sourcesChanged = Methoder.isSourcesChanged(props.sources, treeSources.value)
      const summaryChanged = Methoder.isSummaryChanged(props.summarys, listSummary.value)
      const sourcesReseted = sourcesChanged && Methoder.isSourcesChanged(props.sources.slice(0, treeSources.value.length), treeSources.value)

      if (columnsChanged) {
        columnRowAttrs.value = []
        columnCellAttrs.value = []
        columnCellRender.value = []
        columnSettingsAllTrees.value = []
        treeColumns.value = Methoder.normalizeTreeColumns(props.columns, [])
        listColumns.value = Methoder.normalizeListColumns(treeColumns.value, [])
        dataColumns.value = Methoder.normalizeDataColumns(listColumns.value)
        Methoder.normalizeTreeSettings(treeColumns.value)
        Methoder.normalizeInitColumns(listColumns.value)
      }

      if (sourcesReseted) {
        sourceRowAttrs.value = []
        sourceRowStates.value = []
        sourceCellProps.value = []
        sourceCellAttrs.value = []
        sourceCellRender.value = []
      }

      if (sourcesChanged) {
        treeSources.value = Methoder.normalizeTreeSources(props.sources, [])
        Methoder.cleanSelectedRowKeys()
        Methoder.cleanExpandedRowKeys()
      }

      if (summaryChanged) {
        listSummary.value = Methoder.normalizeListSummary(props.summarys)
      }
    }, watchDeepOptions)

    watch(() => props.loading, state => { loading.value = state })
    watch(() => props.paginate, paginate => { Paginator.update(paginate) })
    watch(() => props.selectedMode, selectedMode => { selectedRowKeys.value = [] })
    watch(() => [...props.selectedRowKeys], () => { Methoder.updateSetupSelectedRowKeys(props.selectedRowKeys) })
    watch(() => [...props.expandedRowKeys], () => { Methoder.updateSetupExpandedRowKeys(props.expandedRowKeys) })

    watch([dataColumns, Computer.filterRangeSources], () => { Methoder.normalizeInitSources(Computer.filterRangeSources.value) }, watchDeepOptions)
    watch([listSummary, Computer.filterPageSources], () => { Methoder.normalizeInitSummary(Computer.filterPageSummary.value) }, watchDeepOptions)
    watch(() => selectedRowKeys.value, () => { Methoder.updatePropSelectedRowKeys(selectedRowKeys.value) }, watchDeepOptions)
    watch(() => expandedRowKeys.value, () => { Methoder.updatePropExpandedRowKeys(expandedRowKeys.value) }, watchDeepOptions)
    watch(() => Paginator.paginate, () => { Methoder.updatePropPaginate(Paginator.paginate) }, watchDeepOptions)
    watch(() => treeColumns.value, () => { Methoder.updatePropColumns(treeColumns.value) }, watchDeepOptions)
    watch(() => treeSources.value, () => { Methoder.updatePropSources(treeSources.value) }, watchDeepOptions)
    watch(() => loading.value, () => { context.emit('update:loading', loading.value) }, watchDeepOptions)

    onMounted(() => {
      Eventer.updateResizeContainer()
      Eventer.updateScrollContainer()
      Observer.resizeObserver.observe(Normalizer.scroll.value.getScrollResizeContainer?.() || document.documentElement)
      document.addEventListener('mousemove', event => Eventer.documentMouseMove(event))
      document.addEventListener('mouseup', event => Eventer.documentMouseup(event))
    })

    context.expose({
      selectRowKeys: Methoder.updateSetupSelectedRowKeys,
      expandRowKeys: Methoder.updateSetupExpandedRowKeys,
      forceUpdate: Methoder.forceUpdate
    })

    const RenderTableWrapper = (_: any, ctx: typeof context) => {
      const RenderColGroup = () => {
        return (
          <colgroup>
            { ref(Computer.filterDataColumns).value.map(column => <col style={Eventer.computeTableGroupStyle(column)}/>) }
          </colgroup>
        )
      }

      const RenderTableThead = () => {
        const style: any = { 'position': 'relative', 'z-index': 30 }
        const topHeader = Normalizer.sticky.value.topHeader
        const isFixedTop = Computer.isFixedTop.value

        if (isFixedTop || topHeader === true || helper.isFiniteNumber(topHeader)) {
          Object.assign(style, {
            'position': 'sticky',
            'top': /^\+?\d+\.?\d*$/.test(`${topHeader}`) ? `${topHeader}px` : 0,
            'z-index': 30
          })
        }

        return (
          <thead
            class='s-table-thead'
            style={style}
          >
            {
              ref(Computer.filterListColumns).value.map((columns, rowIndex) => (
                <tr
                  { ...toRaw(unref(columnRowAttrs.value[rowIndex])) }
                  style={{ 'position': 'relative', 'z-index': listColumns.value.length - rowIndex }}
                  class='s-table-thead-tr'
                  row-index={rowIndex}
                >
                  {
                    columns.filter(column => !!column && column.rowSpan > 0 && column.colSpan > 0).map(column => {
                      const rowIndex = column.rowIndex
                      const colIndex = column.colIndex
                      const headerCell = ctx.slots.headerCell
                      const renderTitle = Methoder.getValue(columnCellRender.value[rowIndex][colIndex])
                      const computeTitle = Methoder.isVueNode(renderTitle) || !helper.isFunction(headerCell)
                        ? renderTitle
                        : headerCell({
                          title: renderTitle,
                          column: readonly(column),
                          rowIndex, colIndex
                        })

                      const resizeActive = column.resizable === true && (column.minWidth || 0) < (column.maxWidth || Infinity)
                      const resizeDriver = resizeActive ? <span class='s-table-thead-th-resizable'/> : null

                      return (
                        <th
                          colspan={column.colSpan}
                          rowspan={column.rowSpan}
                          class='s-table-thead-th'
                          style={Eventer.computeTableChildStyle(column, 'thead')}
                          { ...toRaw(unref(columnCellAttrs.value[rowIndex][colIndex])) }
                          col-index={column.colIndex}
                          row-index={column.rowIndex}
                          col-offset={column.colOffset}
                          row-offset={column.rowOffset}
                        >
                          { computeTitle }
                          { resizeDriver }
                        </th>
                      )
                    })
                  }
                </tr>
              ))
            }
          </thead>
        )
      }

      const RenderTableTBody = () => {
        return (
          <tbody
            class='s-table-tbody'
            style={{ 'position': 'relative', 'z-index': 10 }}
          >
            {
              Computer.filterRangeSources.value.map(option => {
                const record = readonly(option.referRecord)
                const rowIndex = option.rowGroupIndex
                const groupLevel = option.rowGroupLevel
                const groupIndex = option.rowGroupIndex
                const groupIndexs = option.rowGroupIndexs
                const globalIndex = option.rowGlobalIndex

                return (
                  <tr
                    class='s-table-tbody-tr'
                    { ...toRaw(unref(sourceRowAttrs.value[globalIndex])) }
                    row-global-index={globalIndex}
                    row-group-index={groupIndex}
                    row-group-level={groupLevel}
                    row-index={rowIndex}
                  >
                    {
                      ref(Computer.filterDataColumns).value.map((column, colIndex) => {
                        const columnKey = column.key
                        const bodyerCell = ctx.slots.bodyerCell
                        const renderValue = Methoder.getValue(sourceCellRender.value[globalIndex][columnKey])
                        const computeValue = Methoder.isVueNode(renderValue) || !helper.isFunction(bodyerCell)
                          ? renderValue
                          : bodyerCell({
                            value: renderValue,
                            record,
                            rowIndex,
                            groupIndex,
                            groupLevel,
                            groupIndexs,
                            globalIndex,
                            column: readonly(column),
                            colIndex
                          })

                        return (
                          <td
                            colspan={column.colSpan}
                            class='s-table-tbody-td'
                            style={Eventer.computeTableChildStyle(column, 'tbody')}
                            { ...toRaw(unref(sourceCellAttrs.value[globalIndex][columnKey])) }
                            col-index={column.colIndex}
                            col-offset={column.colOffset}
                            row-global-index={globalIndex}
                            row-group-index={groupIndex}
                            row-group-level={groupLevel}
                            row-index={rowIndex}
                          >
                            { computeValue }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        )
      }

      const RenderTableTFoot = () => {
        const style: any = { 'position': 'relative', 'z-index': 50 }
        const bottomFooter = Normalizer.sticky.value.bottomFooter

        if (bottomFooter === true || helper.isFiniteNumber(bottomFooter)) {
          Object.assign(style, {
            'position': 'sticky',
            'bottom': /^\+?\d+\.?\d*$/.test(`${bottomFooter}`) ? `${bottomFooter}px` : 0,
            'z-index': 50
          })
        }

        return (
          <tfoot
            class='s-table-tfoot'
            style={style}
          >
            {
              listSummary.value.map((summary, rowIndex) => {
                const record = readonly(summary)

                return (
                  <tr
                    class='s-table-tfoot-tr'
                    { ...toRaw(unref(summaryRowAttrs.value[rowIndex])) }
                    row-index={rowIndex}
                  >
                    {
                      ref(Computer.filterDataColumns).value.map((column, colIndex) => {
                        const columnKey = column.key
                        const footerCell = ctx.slots.footerCell
                        const renderValue = Methoder.getValue(summaryCellRender.value[rowIndex][columnKey])
                        const computeValue = Methoder.isVueNode(renderValue) || !helper.isFunction(footerCell)
                          ? renderValue
                          : footerCell({
                            value: renderValue,
                            record,
                            rowIndex,
                            column: readonly(column),
                            colIndex,
                            sources: readonly(treeSources.value.map(refer => refer.referRecord)),
                            paginate: readonly(Paginator.paginate)
                          })

                        return (
                          <td
                            colspan={column.colSpan}
                            class='s-table-tfoot-td'
                            style={Eventer.computeTableChildStyle(column, 'tfoot')}
                            { ...toRaw(unref(sourceCellAttrs.value[rowIndex][columnKey])) }
                            col-index={column.colIndex}
                            col-offset={column.colOffset}
                            row-index={rowIndex}
                          >
                            { computeValue }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tfoot>
        )
      }

      const WrapperMousedown = (event: MouseEvent) => {
        if (!(event.target instanceof HTMLElement)) {
          return
        }

        if (!Optionser.resizeRcordColumn && event.target.classList.contains('s-table-thead-th-resizable')) {
          const $target = event.target
          const $wrapper = Optionser.refTableWrapper.value!
          const $theader = $target.closest('.s-table-thead-th')!
          const rowIndex = +$theader.getAttribute('row-index')!
          const colIndex = +$theader.getAttribute('col-index')!
          const findColumn = Methoder.extractListColumns(Computer.filterListColumns.value, rowIndex, colIndex)

          if (findColumn) {
            const colSpan = findColumn.colSpan
            const colOffset = findColumn.colOffset
            Optionser.resizeRcordColumn = Computer.filterDataColumns.value.find(column => colSpan + colOffset === column.colSpan + column.colOffset) || null
          }

          if (Optionser.resizeRcordColumn) {
            const rowIndex = Optionser.resizeRcordColumn.rowIndex
            const colIndex = Optionser.resizeRcordColumn.colIndex
            const $theader = $wrapper.querySelector(`.s-table-thead-th[row-index="${rowIndex}"][col-index="${colIndex}"]`)!
            const wrapperRect = $wrapper.getBoundingClientRect()
            const theaderRect = $theader.getBoundingClientRect()

            $wrapper.classList.add('user-select-none')
            $wrapper.classList.add('cursor-column-resize')
            Optionser.resizeRcordWidth = theaderRect.width
            Optionser.resizeRcordScoll = $wrapper.scrollLeft
            Optionser.resizeRcordBound = theaderRect.right - wrapperRect.right
            Optionser.resizeRcordX = event.clientX
          }
        }
      }

      const WrapperAttributes = {
        border: props.border === true || dataColumns.value.length > 1
      }

      return (
        <div
          ref={Optionser.refTableWrapper}
          class={'s-nested-table-wrapper'}
          style={{ height: Computer.tableBodyHeight.value }} // @ts-ignore
          onScrollPassive={Eventer.updateScrollContainer}
          onMousedown={WrapperMousedown}
        >
          <table
            {...WrapperAttributes}
            class='s-nested-table'
            style={{ width: Computer.tableBodyWidth.value, tableLayout: props.layout }}
          >
            <RenderColGroup/>
            <RenderTableThead/>
            <RenderTableTBody/>
            <RenderTableTFoot/>
          </table>
        </div>
      )
    }

    const RenderTableContianer = (_: any, ctx: typeof context) => {
      return (
        <section class={['s-table-container', `s-table-${Normalizer.size.value}`]}>
          <div class='s-table-spining-container'>
            <div class={['s-table-spining-content', { spining: loading }]}>
              <RenderTableWrapper v-slots={ctx.slots}/>
            </div>
          </div>
        </section>
      )
    }

    return () => <RenderTableContianer v-slots={context.slots}/>
  },
  slots: {} as STableeDefineSlots<STableRecordType>,
  methods: {} as STableDefineMethods
})
