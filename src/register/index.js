/*
 * @Author: your name
 * @Date: 2021-03-19 14:44:12
 * @LastEditTime: 2021-06-23 15:16:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \edc_web2.0\src\register\index.js
 */
import Vue from 'vue'
import {
	Badge,
	Pagination,
	Dialog,
	Autocomplete,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Input,
	InputNumber,
	Radio,
	RadioGroup,
	RadioButton,
	Carousel,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Switch,
	Select,
	Option,
	OptionGroup,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	DatePicker,
	TimeSelect,
	TimePicker,
	Popover,
	Tooltip,
	Form,
	FormItem,
	Tabs,
	TabPane,
	Tag,
	Tree,
	Alert,
	Slider,
	Icon,
	Row,
	Col,
	Upload,
	Progress,
	Spinner,
	Card,
	Collapse,
	CollapseItem,
	Cascader,
	Container,
	Header,
	Aside,
	Main,
	Footer,
	Link,
	Backtop,
	PageHeader,
	CascaderPanel,
	Loading,
	MessageBox,
	Message,
	Notification,
	Popconfirm,
	Avatar,
	CarouselItem,
	InfiniteScroll,
	Drawer,
	Scrollbar,
	ColorPicker
} from 'element-ui'
import DhcDialog from '@/utilsComponents/dialog'
import DhcQrcode from '@/utilsComponents/qrCode'
import DhcPagination from '@/utilsComponents/pagination'
import DhcTable from '@/utilsComponents/table'
import DhcForm from '@/utilsComponents/form'
import DhcDialogForm from '@/utilsComponents/dialogForm'
import DhcTooltip from '@/utilsComponents/tooltip'
import DhcFloatMenu from '@/utilsComponents/floatMenu'
import DhcScalImg from '@/utilsComponents/scalImg'
import DhcEditor from '@/utilsComponents/editor'
import DhcTabs from '@/utilsComponents/tabs'
import DhcDialogImg from '@/utilsComponents/dialogImg'
Vue.component('DhcDialog', DhcDialog)
Vue.component('DhcQrcode', DhcQrcode)
Vue.component('DhcPagination', DhcPagination)
Vue.component('DhcTable', DhcTable)
Vue.component('DhcForm', DhcForm)
Vue.component('DhcDialogform', DhcDialogForm)
Vue.component('DhcTooltip', DhcTooltip)
Vue.component('DhcFloatMenu', DhcFloatMenu)
Vue.component('DhcScalImg', DhcScalImg)
Vue.component('DhcEditor', DhcEditor)
Vue.component('DhcTabs', DhcTabs)
Vue.component('DhcDialogImg', DhcDialogImg)
Vue.use(Badge)
Vue.use(Scrollbar)
Vue.use(InfiniteScroll)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Drawer)
Vue.use(Avatar)
Vue.use(Popconfirm)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Spinner)
Vue.use(Card)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Cascader)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Link)
Vue.use(Backtop)
Vue.use(PageHeader)
Vue.use(ColorPicker)
Vue.use(CascaderPanel)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message