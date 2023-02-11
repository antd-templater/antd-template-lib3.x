'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var ASelect = require('ant-design-vue/es/select');
require('ant-design-vue/es/select/style/index.less');
var index = require('../S-Icon/index.cjs');

/**
 * 图标库映射
 */
var defaultOptions = [
    {
        label: '方向性图标',
        value: 'Directional',
        options: [
            { label: 'StepBackwardOutlined', value: 'StepBackwardOutlined' },
            { label: 'StepForwardOutlined', value: 'StepForwardOutlined' },
            { label: 'FastBackwardOutlined', value: 'FastBackwardOutlined' },
            { label: 'FastForwardOutlined', value: 'FastForwardOutlined' },
            { label: 'ShrinkOutlined', value: 'ShrinkOutlined' },
            { label: 'ArrowsAltOutlined', value: 'ArrowsAltOutlined' },
            { label: 'DownOutlined', value: 'DownOutlined' },
            { label: 'UpOutlined', value: 'UpOutlined' },
            { label: 'LeftOutlined', value: 'LeftOutlined' },
            { label: 'RightOutlined', value: 'RightOutlined' },
            { label: 'CaretUpOutlined', value: 'CaretUpOutlined' },
            { label: 'CaretDownOutlined', value: 'CaretDownOutlined' },
            { label: 'CaretLeftOutlined', value: 'CaretLeftOutlined' },
            { label: 'CaretRightOutlined', value: 'CaretRightOutlined' },
            { label: 'UpCircleOutlined', value: 'UpCircleOutlined' },
            { label: 'DownCircleOutlined', value: 'DownCircleOutlined' },
            { label: 'LeftCircleOutlined', value: 'LeftCircleOutlined' },
            { label: 'RightCircleOutlined', value: 'RightCircleOutlined' },
            { label: 'DoubleRightOutlined', value: 'DoubleRightOutlined' },
            { label: 'DoubleLeftOutlined', value: 'DoubleLeftOutlined' },
            { label: 'VerticalLeftOutlined', value: 'VerticalLeftOutlined' },
            { label: 'VerticalRightOutlined', value: 'VerticalRightOutlined' },
            { label: 'VerticalAlignTopOutlined', value: 'VerticalAlignTopOutlined' },
            { label: 'VerticalAlignMiddleOutlined', value: 'VerticalAlignMiddleOutlined' },
            { label: 'VerticalAlignBottomOutlined', value: 'VerticalAlignBottomOutlined' },
            { label: 'ForwardOutlined', value: 'ForwardOutlined' },
            { label: 'BackwardOutlined', value: 'BackwardOutlined' },
            { label: 'RollbackOutlined', value: 'RollbackOutlined' },
            { label: 'EnterOutlined', value: 'EnterOutlined' },
            { label: 'RetweetOutlined', value: 'RetweetOutlined' },
            { label: 'SwapOutlined', value: 'SwapOutlined' },
            { label: 'SwapLeftOutlined', value: 'SwapLeftOutlined' },
            { label: 'SwapRightOutlined', value: 'SwapRightOutlined' },
            { label: 'ArrowUpOutlined', value: 'ArrowUpOutlined' },
            { label: 'ArrowDownOutlined', value: 'ArrowDownOutlined' },
            { label: 'ArrowLeftOutlined', value: 'ArrowLeftOutlined' },
            { label: 'ArrowRightOutlined', value: 'ArrowRightOutlined' },
            { label: 'PlayCircleOutlined', value: 'PlayCircleOutlined' },
            { label: 'UpSquareOutlined', value: 'UpSquareOutlined' },
            { label: 'DownSquareOutlined', value: 'DownSquareOutlined' },
            { label: 'LeftSquareOutlined', value: 'LeftSquareOutlined' },
            { label: 'RightSquareOutlined', value: 'RightSquareOutlined' },
            { label: 'LoginOutlined', value: 'LoginOutlined' },
            { label: 'LogoutOutlined', value: 'LogoutOutlined' },
            { label: 'MenuFoldOutlined', value: 'MenuFoldOutlined' },
            { label: 'MenuUnfoldOutlined', value: 'MenuUnfoldOutlined' },
            { label: 'BorderBottomOutlined', value: 'BorderBottomOutlined' },
            { label: 'BorderHorizontalOutlined', value: 'BorderHorizontalOutlined' },
            { label: 'BorderInnerOutlined', value: 'BorderInnerOutlined' },
            { label: 'BorderOuterOutlined', value: 'BorderOuterOutlined' },
            { label: 'BorderLeftOutlined', value: 'BorderLeftOutlined' },
            { label: 'BorderRightOutlined', value: 'BorderRightOutlined' },
            { label: 'BorderTopOutlined', value: 'BorderTopOutlined' },
            { label: 'BorderVerticleOutlined', value: 'BorderVerticleOutlined' },
            { label: 'PicCenterOutlined', value: 'PicCenterOutlined' },
            { label: 'PicLeftOutlined', value: 'PicLeftOutlined' },
            { label: 'PicRightOutlined', value: 'PicRightOutlined' },
            { label: 'RadiusBottomleftOutlined', value: 'RadiusBottomleftOutlined' },
            { label: 'RadiusBottomrightOutlined', value: 'RadiusBottomrightOutlined' },
            { label: 'RadiusUpleftOutlined', value: 'RadiusUpleftOutlined' },
            { label: 'RadiusUprightOutlined', value: 'RadiusUprightOutlined' },
            { label: 'FullscreenOutlined', value: 'FullscreenOutlined' },
            { label: 'FullscreenExitOutlined', value: 'FullscreenExitOutlined' }
        ]
    },
    {
        label: '提示建议性图标',
        value: 'Suggested',
        options: [
            { label: 'QuestionOutlined', value: 'QuestionOutlined' },
            { label: 'QuestionCircleOutlined', value: 'QuestionCircleOutlined' },
            { label: 'PlusOutlined', value: 'PlusOutlined' },
            { label: 'PlusCircleOutlined', value: 'PlusCircleOutlined' },
            { label: 'PauseOutlined', value: 'PauseOutlined' },
            { label: 'PauseCircleOutlined', value: 'PauseCircleOutlined' },
            { label: 'MinusOutlined', value: 'MinusOutlined' },
            { label: 'MinusCircleOutlined', value: 'MinusCircleOutlined' },
            { label: 'PlusSquareOutlined', value: 'PlusSquareOutlined' },
            { label: 'MinusSquareOutlined', value: 'MinusSquareOutlined' },
            { label: 'InfoOutlined', value: 'InfoOutlined' },
            { label: 'InfoCircleOutlined', value: 'InfoCircleOutlined' },
            { label: 'ExclamationOutlined', value: 'ExclamationOutlined' },
            { label: 'ExclamationCircleOutlined', value: 'ExclamationCircleOutlined' },
            { label: 'CloseOutlined', value: 'CloseOutlined' },
            { label: 'CloseCircleOutlined', value: 'CloseCircleOutlined' },
            { label: 'CloseSquareOutlined', value: 'CloseSquareOutlined' },
            { label: 'CheckOutlined', value: 'CheckOutlined' },
            { label: 'CheckCircleOutlined', value: 'CheckCircleOutlined' },
            { label: 'CheckSquareOutlined', value: 'CheckSquareOutlined' },
            { label: 'ClockCircleOutlined', value: 'ClockCircleOutlined' },
            { label: 'WarningOutlined', value: 'WarningOutlined' },
            { label: 'IssuesCloseOutlined', value: 'IssuesCloseOutlined' },
            { label: 'StopOutlined', value: 'StopOutlined' }
        ]
    },
    {
        label: '编辑类图标',
        value: 'Editor',
        options: [
            { label: 'EditOutlined', value: 'EditOutlined' },
            { label: 'FormOutlined', value: 'FormOutlined' },
            { label: 'CopyOutlined', value: 'CopyOutlined' },
            { label: 'ScissorOutlined', value: 'ScissorOutlined' },
            { label: 'DeleteOutlined', value: 'DeleteOutlined' },
            { label: 'SnippetsOutlined', value: 'SnippetsOutlined' },
            { label: 'DiffOutlined', value: 'DiffOutlined' },
            { label: 'HighlightOutlined', value: 'HighlightOutlined' },
            { label: 'AlignCenterOutlined', value: 'AlignCenterOutlined' },
            { label: 'AlignLeftOutlined', value: 'AlignLeftOutlined' },
            { label: 'AlignRightOutlined', value: 'AlignRightOutlined' },
            { label: 'BgColorsOutlined', value: 'BgColorsOutlined' },
            { label: 'BoldOutlined', value: 'BoldOutlined' },
            { label: 'ItalicOutlined', value: 'ItalicOutlined' },
            { label: 'UnderlineOutlined', value: 'UnderlineOutlined' },
            { label: 'StrikethroughOutlined', value: 'StrikethroughOutlined' },
            { label: 'RedoOutlined', value: 'RedoOutlined' },
            { label: 'UndoOutlined', value: 'UndoOutlined' },
            { label: 'ZoomInOutlined', value: 'ZoomInOutlined' },
            { label: 'ZoomOutOutlined', value: 'ZoomOutOutlined' },
            { label: 'FontColorsOutlined', value: 'FontColorsOutlined' },
            { label: 'FontSizeOutlined', value: 'FontSizeOutlined' },
            { label: 'LineHeightOutlined', value: 'LineHeightOutlined' },
            { label: 'DashOutlined', value: 'DashOutlined' },
            { label: 'SmallDashOutlined', value: 'SmallDashOutlined' },
            { label: 'SortAscendingOutlined', value: 'SortAscendingOutlined' },
            { label: 'SortDescendingOutlined', value: 'SortDescendingOutlined' },
            { label: 'DragOutlined', value: 'DragOutlined' },
            { label: 'OrderedListOutlined', value: 'OrderedListOutlined' },
            { label: 'UnorderedListOutlined', value: 'UnorderedListOutlined' },
            { label: 'RadiusSettingOutlined', value: 'RadiusSettingOutlined' },
            { label: 'ColumnWidthOutlined', value: 'ColumnWidthOutlined' },
            { label: 'ColumnHeightOutlined', value: 'ColumnHeightOutlined' }
        ]
    },
    {
        label: '数据类图标',
        value: 'Data',
        options: [
            { label: 'AreaChartOutlined', value: 'AreaChartOutlined' },
            { label: 'PieChartOutlined', value: 'PieChartOutlined' },
            { label: 'BarChartOutlined', value: 'BarChartOutlined' },
            { label: 'DotChartOutlined', value: 'DotChartOutlined' },
            { label: 'LineChartOutlined', value: 'LineChartOutlined' },
            { label: 'RadarChartOutlined', value: 'RadarChartOutlined' },
            { label: 'HeatMapOutlined', value: 'HeatMapOutlined' },
            { label: 'FallOutlined', value: 'FallOutlined' },
            { label: 'RiseOutlined', value: 'RiseOutlined' },
            { label: 'StockOutlined', value: 'StockOutlined' },
            { label: 'BoxPlotOutlined', value: 'BoxPlotOutlined' },
            { label: 'FundOutlined', value: 'FundOutlined' },
            { label: 'SlidersOutlined', value: 'SlidersOutlined' }
        ]
    },
    {
        label: '网站通用图标',
        value: 'Brand',
        options: [
            { label: 'AndroidOutlined', value: 'AndroidOutlined' },
            { label: 'AppleOutlined', value: 'AppleOutlined' },
            { label: 'WindowsOutlined', value: 'WindowsOutlined' },
            { label: 'IeOutlined', value: 'IeOutlined' },
            { label: 'ChromeOutlined', value: 'ChromeOutlined' },
            { label: 'GithubOutlined', value: 'GithubOutlined' },
            { label: 'AliwangwangOutlined', value: 'AliwangwangOutlined' },
            { label: 'DingdingOutlined', value: 'DingdingOutlined' },
            { label: 'WeiboSquareOutlined', value: 'WeiboSquareOutlined' },
            { label: 'WeiboCircleOutlined', value: 'WeiboCircleOutlined' },
            { label: 'TaobaoCircleOutlined', value: 'TaobaoCircleOutlined' },
            { label: 'Html5Outlined', value: 'Html5Outlined' },
            { label: 'WeiboOutlined', value: 'WeiboOutlined' },
            { label: 'TwitterOutlined', value: 'TwitterOutlined' },
            { label: 'WechatOutlined', value: 'WechatOutlined' },
            { label: 'YoutubeOutlined', value: 'YoutubeOutlined' },
            { label: 'AlipayCircleOutlined', value: 'AlipayCircleOutlined' },
            { label: 'TaobaoOutlined', value: 'TaobaoOutlined' },
            { label: 'SkypeOutlined', value: 'SkypeOutlined' },
            { label: 'QqOutlined', value: 'QqOutlined' },
            { label: 'MediumWorkmarkOutlined', value: 'MediumWorkmarkOutlined' },
            { label: 'GitlabOutlined', value: 'GitlabOutlined' },
            { label: 'MediumOutlined', value: 'MediumOutlined' },
            { label: 'LinkedinOutlined', value: 'LinkedinOutlined' },
            { label: 'GooglePlusOutlined', value: 'GooglePlusOutlined' },
            { label: 'DropboxOutlined', value: 'DropboxOutlined' },
            { label: 'FacebookOutlined', value: 'FacebookOutlined' },
            { label: 'CodepenOutlined', value: 'CodepenOutlined' },
            { label: 'CodeSandboxOutlined', value: 'CodeSandboxOutlined' },
            { label: 'AmazonOutlined', value: 'AmazonOutlined' },
            { label: 'GoogleOutlined', value: 'GoogleOutlined' },
            { label: 'CodepenCircleOutlined', value: 'CodepenCircleOutlined' },
            { label: 'AlipayOutlined', value: 'AlipayOutlined' },
            { label: 'AntDesignOutlined', value: 'AntDesignOutlined' },
            { label: 'AntCloudOutlined', value: 'AntCloudOutlined' },
            { label: 'AliyunOutlined', value: 'AliyunOutlined' },
            { label: 'ZhihuOutlined', value: 'ZhihuOutlined' },
            { label: 'SlackOutlined', value: 'SlackOutlined' },
            { label: 'SlackSquareOutlined', value: 'SlackSquareOutlined' },
            { label: 'BehanceOutlined', value: 'BehanceOutlined' },
            { label: 'BehanceSquareOutlined', value: 'BehanceSquareOutlined' },
            { label: 'DribbbleOutlined', value: 'DribbbleOutlined' },
            { label: 'DribbbleSquareOutlined', value: 'DribbbleSquareOutlined' },
            { label: 'InstagramOutlined', value: 'InstagramOutlined' },
            { label: 'YuqueOutlined', value: 'YuqueOutlined' },
            { label: 'AlibabaOutlined', value: 'AlibabaOutlined' },
            { label: 'YahooOutlined', value: 'YahooOutlined' },
            { label: 'RedditOutlined', value: 'RedditOutlined' },
            { label: 'SketchOutlined', value: 'SketchOutlined' }
        ]
    },
    {
        label: '品牌和标识',
        value: 'Application',
        options: [
            { label: 'AccountBookOutlined', value: 'AccountBookOutlined' },
            { label: 'AlertOutlined', value: 'AlertOutlined' },
            { label: 'ApiOutlined', value: 'ApiOutlined' },
            { label: 'AppstoreOutlined', value: 'AppstoreOutlined' },
            { label: 'AudioOutlined', value: 'AudioOutlined' },
            { label: 'BankOutlined', value: 'BankOutlined' },
            { label: 'BellOutlined', value: 'BellOutlined' },
            { label: 'BookOutlined', value: 'BookOutlined' },
            { label: 'BugOutlined', value: 'BugOutlined' },
            { label: 'BulbOutlined', value: 'BulbOutlined' },
            { label: 'CalculatorOutlined', value: 'CalculatorOutlined' },
            { label: 'BuildOutlined', value: 'BuildOutlined' },
            { label: 'CalendarOutlined', value: 'CalendarOutlined' },
            { label: 'CameraOutlined', value: 'CameraOutlined' },
            { label: 'CarOutlined', value: 'CarOutlined' },
            { label: 'CarryOutOutlined', value: 'CarryOutOutlined' },
            { label: 'CloudOutlined', value: 'CloudOutlined' },
            { label: 'CodeOutlined', value: 'CodeOutlined' },
            { label: 'CompassOutlined', value: 'CompassOutlined' },
            { label: 'ContactsOutlined', value: 'ContactsOutlined' },
            { label: 'ContainerOutlined', value: 'ContainerOutlined' },
            { label: 'ControlOutlined', value: 'ControlOutlined' },
            { label: 'CreditCardOutlined', value: 'CreditCardOutlined' },
            { label: 'CrownOutlined', value: 'CrownOutlined' },
            { label: 'CustomerServiceOutlined', value: 'CustomerServiceOutlined' },
            { label: 'DashboardOutlined', value: 'DashboardOutlined' },
            { label: 'DatabaseOutlined', value: 'DatabaseOutlined' },
            { label: 'DislikeOutlined', value: 'DislikeOutlined' },
            { label: 'EnvironmentOutlined', value: 'EnvironmentOutlined' },
            { label: 'ExperimentOutlined', value: 'ExperimentOutlined' },
            { label: 'EyeInvisibleOutlined', value: 'EyeInvisibleOutlined' },
            { label: 'EyeOutlined', value: 'EyeOutlined' },
            { label: 'FileAddOutlined', value: 'FileAddOutlined' },
            { label: 'FileExcelOutlined', value: 'FileExcelOutlined' },
            { label: 'FileExclamationOutlined', value: 'FileExclamationOutlined' },
            { label: 'FileImageOutlined', value: 'FileImageOutlined' },
            { label: 'FileMarkdownOutlined', value: 'FileMarkdownOutlined' },
            { label: 'FilePdfOutlined', value: 'FilePdfOutlined' },
            { label: 'FilePptOutlined', value: 'FilePptOutlined' },
            { label: 'FileTextOutlined', value: 'FileTextOutlined' },
            { label: 'FileUnknownOutlined', value: 'FileUnknownOutlined' },
            { label: 'FileWordOutlined', value: 'FileWordOutlined' },
            { label: 'FileZipOutlined', value: 'FileZipOutlined' },
            { label: 'FileOutlined', value: 'FileOutlined' },
            { label: 'FilterOutlined', value: 'FilterOutlined' },
            { label: 'FireOutlined', value: 'FireOutlined' },
            { label: 'FlagOutlined', value: 'FlagOutlined' },
            { label: 'FolderAddOutlined', value: 'FolderAddOutlined' },
            { label: 'FolderOutlined', value: 'FolderOutlined' },
            { label: 'FolderOpenOutlined', value: 'FolderOpenOutlined' },
            { label: 'FrownOutlined', value: 'FrownOutlined' },
            { label: 'FunnelPlotOutlined', value: 'FunnelPlotOutlined' },
            { label: 'GiftOutlined', value: 'GiftOutlined' },
            { label: 'HddOutlined', value: 'HddOutlined' },
            { label: 'HeartOutlined', value: 'HeartOutlined' },
            { label: 'HomeOutlined', value: 'HomeOutlined' },
            { label: 'HourglassOutlined', value: 'HourglassOutlined' },
            { label: 'IdcardOutlined', value: 'IdcardOutlined' },
            { label: 'InsuranceOutlined', value: 'InsuranceOutlined' },
            { label: 'InteractionOutlined', value: 'InteractionOutlined' },
            { label: 'LayoutOutlined', value: 'LayoutOutlined' },
            { label: 'LikeOutlined', value: 'LikeOutlined' },
            { label: 'LockOutlined', value: 'LockOutlined' },
            { label: 'MailOutlined', value: 'MailOutlined' },
            { label: 'MedicineBoxOutlined', value: 'MedicineBoxOutlined' },
            { label: 'MehOutlined', value: 'MehOutlined' },
            { label: 'MessageOutlined', value: 'MessageOutlined' },
            { label: 'MobileOutlined', value: 'MobileOutlined' },
            { label: 'MoneyCollectOutlined', value: 'MoneyCollectOutlined' },
            { label: 'PayCircleOutlined', value: 'PayCircleOutlined' },
            { label: 'NotificationOutlined', value: 'NotificationOutlined' },
            { label: 'PhoneOutlined', value: 'PhoneOutlined' },
            { label: 'PictureOutlined', value: 'PictureOutlined' },
            { label: 'PlaySquareOutlined', value: 'PlaySquareOutlined' },
            { label: 'PrinterOutlined', value: 'PrinterOutlined' },
            { label: 'ProfileOutlined', value: 'ProfileOutlined' },
            { label: 'ProjectOutlined', value: 'ProjectOutlined' },
            { label: 'PushpinOutlined', value: 'PushpinOutlined' },
            { label: 'PropertySafetyOutlined', value: 'PropertySafetyOutlined' },
            { label: 'ReadOutlined', value: 'ReadOutlined' },
            { label: 'ReconciliationOutlined', value: 'ReconciliationOutlined' },
            { label: 'RedEnvelopeOutlined', value: 'RedEnvelopeOutlined' },
            { label: 'RestOutlined', value: 'RestOutlined' },
            { label: 'RocketOutlined', value: 'RocketOutlined' },
            { label: 'SafetyCertificateOutlined', value: 'SafetyCertificateOutlined' },
            { label: 'SaveOutlined', value: 'SaveOutlined' },
            { label: 'ScheduleOutlined', value: 'ScheduleOutlined' },
            { label: 'SecurityScanOutlined', value: 'SecurityScanOutlined' },
            { label: 'SettingOutlined', value: 'SettingOutlined' },
            { label: 'ShopOutlined', value: 'ShopOutlined' },
            { label: 'ShoppingOutlined', value: 'ShoppingOutlined' },
            { label: 'SkinOutlined', value: 'SkinOutlined' },
            { label: 'SmileOutlined', value: 'SmileOutlined' },
            { label: 'SoundOutlined', value: 'SoundOutlined' },
            { label: 'StarOutlined', value: 'StarOutlined' },
            { label: 'SwitcherOutlined', value: 'SwitcherOutlined' },
            { label: 'TabletOutlined', value: 'TabletOutlined' },
            { label: 'TagOutlined', value: 'TagOutlined' },
            { label: 'TagsOutlined', value: 'TagsOutlined' },
            { label: 'ToolOutlined', value: 'ToolOutlined' },
            { label: 'ThunderboltOutlined', value: 'ThunderboltOutlined' },
            { label: 'TrophyOutlined', value: 'TrophyOutlined' },
            { label: 'UnlockOutlined', value: 'UnlockOutlined' },
            { label: 'UsbOutlined', value: 'UsbOutlined' },
            { label: 'VideoCameraOutlined', value: 'VideoCameraOutlined' },
            { label: 'WalletOutlined', value: 'WalletOutlined' },
            { label: 'ApartmentOutlined', value: 'ApartmentOutlined' },
            { label: 'AuditOutlined', value: 'AuditOutlined' },
            { label: 'BarcodeOutlined', value: 'BarcodeOutlined' },
            { label: 'BarsOutlined', value: 'BarsOutlined' },
            { label: 'BlockOutlined', value: 'BlockOutlined' },
            { label: 'BorderOutlined', value: 'BorderOutlined' },
            { label: 'BranchesOutlined', value: 'BranchesOutlined' },
            { label: 'CiOutlined', value: 'CiOutlined' },
            { label: 'CloudDownloadOutlined', value: 'CloudDownloadOutlined' },
            { label: 'CloudServerOutlined', value: 'CloudServerOutlined' },
            { label: 'CloudSyncOutlined', value: 'CloudSyncOutlined' },
            { label: 'CloudUploadOutlined', value: 'CloudUploadOutlined' },
            { label: 'ClusterOutlined', value: 'ClusterOutlined' },
            { label: 'CoffeeOutlined', value: 'CoffeeOutlined' },
            { label: 'CopyrightOutlined', value: 'CopyrightOutlined' },
            { label: 'DeploymentUnitOutlined', value: 'DeploymentUnitOutlined' },
            { label: 'DesktopOutlined', value: 'DesktopOutlined' },
            { label: 'DisconnectOutlined', value: 'DisconnectOutlined' },
            { label: 'DollarOutlined', value: 'DollarOutlined' },
            { label: 'DownloadOutlined', value: 'DownloadOutlined' },
            { label: 'EllipsisOutlined', value: 'EllipsisOutlined' },
            { label: 'EuroOutlined', value: 'EuroOutlined' },
            { label: 'ErrorOutlined', value: 'ErrorOutlined' },
            { label: 'ExportOutlined', value: 'ExportOutlined' },
            { label: 'FileDoneOutlined', value: 'FileDoneOutlined' },
            { label: 'FileJpgOutlined', value: 'FileJpgOutlined' },
            { label: 'FileProtectOutlined', value: 'FileProtectOutlined' },
            { label: 'FileSyncOutlined', value: 'FileSyncOutlined' },
            { label: 'FileSearchOutlined', value: 'FileSearchOutlined' },
            { label: 'ForkOutlined', value: 'ForkOutlined' },
            { label: 'GatewayOutlined', value: 'GatewayOutlined' },
            { label: 'GlobalOutlined', value: 'GlobalOutlined' },
            { label: 'GoldOutlined', value: 'GoldOutlined' },
            { label: 'HistoryOutlined', value: 'HistoryOutlined' },
            { label: 'ImportOutlined', value: 'ImportOutlined' },
            { label: 'InboxOutlined', value: 'InboxOutlined' },
            { label: 'KeyOutlined', value: 'KeyOutlined' },
            { label: 'LaptopOutlined', value: 'LaptopOutlined' },
            { label: 'LinkOutlined', value: 'LinkOutlined' },
            { label: 'LineOutlined', value: 'LineOutlined' },
            { label: 'Loading3QuartersOutlined', value: 'Loading3QuartersOutlined' },
            { label: 'LoadingOutlined', value: 'LoadingOutlined' },
            { label: 'ManOutlined', value: 'ManOutlined' },
            { label: 'MenuOutlined', value: 'MenuOutlined' },
            { label: 'MonitorOutlined', value: 'MonitorOutlined' },
            { label: 'MoreOutlined', value: 'MoreOutlined' },
            { label: 'NumberOutlined', value: 'NumberOutlined' },
            { label: 'PercentageOutlined', value: 'PercentageOutlined' },
            { label: 'PaperClipOutlined', value: 'PaperClipOutlined' },
            { label: 'PoundOutlined', value: 'PoundOutlined' },
            { label: 'PoweroffOutlined', value: 'PoweroffOutlined' },
            { label: 'PullRequestOutlined', value: 'PullRequestOutlined' },
            { label: 'QrcodeOutlined', value: 'QrcodeOutlined' },
            { label: 'ReloadOutlined', value: 'ReloadOutlined' },
            { label: 'SafetyOutlined', value: 'SafetyOutlined' },
            { label: 'RobotOutlined', value: 'RobotOutlined' },
            { label: 'ScanOutlined', value: 'ScanOutlined' },
            { label: 'SearchOutlined', value: 'SearchOutlined' },
            { label: 'SelectOutlined', value: 'SelectOutlined' },
            { label: 'ShakeOutlined', value: 'ShakeOutlined' },
            { label: 'ShareAltOutlined', value: 'ShareAltOutlined' },
            { label: 'ShoppingCartOutlined', value: 'ShoppingCartOutlined' },
            { label: 'SolutionOutlined', value: 'SolutionOutlined' },
            { label: 'SyncOutlined', value: 'SyncOutlined' },
            { label: 'TableOutlined', value: 'TableOutlined' },
            { label: 'TeamOutlined', value: 'TeamOutlined' },
            { label: 'ToTopOutlined', value: 'ToTopOutlined' },
            { label: 'TrademarkOutlined', value: 'TrademarkOutlined' },
            { label: 'TransactionOutlined', value: 'TransactionOutlined' },
            { label: 'UploadOutlined', value: 'UploadOutlined' },
            { label: 'UserAddOutlined', value: 'UserAddOutlined' },
            { label: 'UserDeleteOutlined', value: 'UserDeleteOutlined' },
            { label: 'UsergroupAddOutlined', value: 'UsergroupAddOutlined' },
            { label: 'UserOutlined', value: 'UserOutlined' },
            { label: 'UsergroupDeleteOutlined', value: 'UsergroupDeleteOutlined' },
            { label: 'WifiOutlined', value: 'WifiOutlined' },
            { label: 'WomanOutlined', value: 'WomanOutlined' }
        ]
    }
];

var SIconSelect = vue.defineComponent({
  name: 'SIconSelect',
  props: {
    optionFilterProp: {
      type: String,
      default: undefined
    },
    optionLabelProp: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    allowClear: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    fieldNames: {
      type: Object,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => defaultOptions
    },
    value: {
      type: [Array, String],
      default: undefined
    },
    mode: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    }
  },
  emits: {
    'update:value': _ => true
  },
  setup(props, context) {
    const OptionRender = props => {
      return index.isIconType(props.value) ? vue.createVNode("span", null, [vue.createVNode(index.default, {
        "type": props.value,
        "style": 'margin: 0px 3px 0 -3px; font-size: 18px; vertical-align: middle;'
      }, null), props.label]) : vue.createVNode("span", null, [props.label]);
    };
    const TagRender = props => {
      return index.isIconType(props.value) ? vue.createVNode("span", null, [vue.createVNode(index.default, {
        "type": props.value,
        "style": 'margin: 0px 3px 2px 2px; font-size: 20px; vertical-align: middle;'
      }, null), props.label]) : vue.createVNode("span", null, [props.label]);
    };
    const open = vue.ref(undefined);
    const isMultiple = props.multiple !== false;
    const isMultipleMode = props.mode === 'tags' || props.mode === 'multiple';
    const onChange = value => {
      const isArrayValue = Array.isArray(value);
      const isOnlyArrayValue = isMultipleMode && isArrayValue && !isMultiple;
      context.emit('update:value', isOnlyArrayValue ? value.slice(-1) : value);
      isOnlyArrayValue && (open.value = false);
      isMultipleMode || (open.value = false);
    };
    return () => vue.createVNode(ASelect, {
      "open": open.value,
      "size": props.size,
      "mode": props.mode,
      "value": props.value,
      "options": props.options,
      "disabled": props.disabled,
      "showArrow": props.showArrow,
      "fieldNames": props.fieldNames,
      "allowClear": props.allowClear,
      "showSearch": props.showSearch,
      "placeholder": props.placeholder,
      "optionLabelProp": props.optionLabelProp,
      "optionFilterProp": props.optionFilterProp,
      "onClick": () => {
        open.value = true;
      },
      "onSearch": () => {
        open.value = true;
      },
      "onChange": onChange
    }, {
      option: OptionRender,
      tagRender: TagRender
    });
  }
});

exports.default = SIconSelect;
