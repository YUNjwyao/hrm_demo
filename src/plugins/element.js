import Vue from 'vue'
import { 
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Select,
    Option,
    Input,
    Row,
    Table,
    TableColumn,
    Pagination,
    Form,
    FormItem,
    Container,
    Header,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    Main,
    Col,
    Dialog,
    MessageBox,
    Message,
} from 'element-ui'


Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Main)
Vue.use(Col)
Vue.use(Dialog)
// Message 需要全局挂载，方式不同
Vue.prototype.$message = Message
