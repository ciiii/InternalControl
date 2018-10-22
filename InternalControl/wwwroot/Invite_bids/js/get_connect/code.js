// var getApiHost = 'http://192.168.0.125:52269';
var getApiHost = '';

var Code = {
    //用户登录
    URL_POST_LOGIN: getApiHost + '/Access/Login',

    //用户注销
    URL_POST_LOG_OUT: getApiHost + '/Access/Logout',

    //修改密码
    URL_POST_CHANGE_PASSWORD: getApiHost + '/Access/ChangePassword',

    //获取全部人员列表
    URL_GET_USERS_LIST: getApiHost + '/BaseInfo/GetEmployeeList',

    //分页获取全部人员列表
    URL_GET_PAGING_USERS_LIST: getApiHost + '/BaseInfo/GetPagingEmployeeList',

    //添加或修改人员
    URL_POST_ADD_OR_EDIT_USERS: getApiHost + '/BaseInfo/AddOrUpdateEmployee',

    //获取系统参数设置
    URL_GET_SETTING: getApiHost + '/BaseInfo/GetSetting',



    //获取全部代理机构
    URL_GET_AGENCY_LIST: getApiHost + '/BaseInfo/GetAgencyList',

    //分页获取全部代理机构
    URL_GET_PAGING_AGENCY_LIST: getApiHost + '/BaseInfo/GetPagingAgencyList',

    //增改代理机构
    URL_POST_ADD_OR_EDIT_AGENCY: getApiHost + '/BaseInfo/AddOrUpdateAgency',

    //获取专家列表
    URL_GET_EXPERT_LIST: getApiHost + '/BaseInfo/GetExpertList',

    //分页获取专家列表
    URL_GET_PAGING_EXPERT_LIST: getApiHost + '/BaseInfo/GetPagingExpertList',

    //增改专家
    URL_POST_ADD_OR_EDIT_EXPERT: getApiHost + '/BaseInfo/AddOrUpdateExpert',


    //获取模板文件
    URL_GET_TEMPLATE_FILE_LIST: getApiHost + '/BaseInfo/GetTemplateFileList',

    //更新模板文件
    URL_POST_UPDATE_TEMPLATE_FILE: getApiHost + '/BaseInfo/UpdateTemplateFile',

    //所有上传文件
    URL_POST_UPLOAD_FILE: getApiHost + '/Upload/Upload',


    //分页获取品目
    URL_GET_PAGING_ITEM_LIST: getApiHost + '/BaseInfo/GetPagingItemList',

    //根据父级Id获取下级品目
    URL_GET_ITEM_CHILD_LIST: getApiHost + '/BaseInfo/GetItemList',

    //分页获取预算项目合并分类
    URL_GET_PAGING_VMERGE_TYPE_WHEN_BUDGET_LIST: getApiHost + '/BaseInfo/GetPagingVMergeTypeWhenBudgetList',


    //分页获取某类字典
    URL_GET_PAGING_CATEGORY_DICTIONARY: getApiHost + '/BaseInfo/GetPagingDictionaryByTypeName',

    //获取某类字典
    URL_GET_CATEGORY_DICTIONARY: getApiHost + '/BaseInfo/GetDictionaryByTypeName',

    //新增或修改字典
    URL_POST_ADD_OR_EDIT_DICTIONARY: getApiHost + '/BaseInfo/AddOrEditDictionary',

    //批量删除字典
    URL_POST_DEL_DICTIONARY: getApiHost + '/BaseInfo/DeleteDictionary',


    //获取角色列表
    URL_GET_ROLE_LIST: getApiHost + '/BaseInfo/GetRoleList',

    //获取全部部门
    URL_GET_DEPARTMENT_LIST: getApiHost + '/BaseInfo/GetDepartmentList',

    //增改部门
    URL_POST_ADD_OR_EDIT_DEPARTMENT: getApiHost + '/BaseInfo/AddOrUpdateDepartment',



    //获取归口部门，项目申报时用
    URL_GET_RELEVANT_DEPARTMENT_LIST: getApiHost + '/BaseInfo/GetRelevantDepartmentList',

    //获取某个归口部门的时间设置
    URL_GET_RELEVANT_DEPARTMENT_SETTING: getApiHost + '/BaseInfo/GetRelevantDepartmentsSetting',

    //归口部门增改自己部门的时间设置
    URL_POST_ADD_OR_EDIT_RELEVANT_DEPARTMENT_SETTING: getApiHost + '/BaseInfo/AddOrUpdateGetRelevantDepartmentsSetting',


    //根据归口部门id,得到可以选择的年份
    URL_GET_YEARS_CAN_CHOOSE: getApiHost + '/DeclareProject/GetYearsCanChoose',

    //分页申报项目列表,包括每个申报项目的流程信息和包信息.
    URL_GET_PAGING_DECLARE_PROJECT_LIST: getApiHost + '/DeclareProject/GetPagingDeclareProjectList',

    //新增一个申报项目,同时开始一个申报流程
    URL_POST_ADD_DECLARE_PROJECT: getApiHost + '/DeclareProject/AddDeclareProject',

    //完善一个申报项目的资料
    URL_POST_EDIT_DECLARE_PROJECT: getApiHost + '/DeclareProject/EditDeclareProject',

    //申请项目审核通过
    URL_POST_PASS_AUDIT_DECLARE_PROJECT: getApiHost + '/DeclareProject/PassAuditDeclareProject',

    //申请项目审核不通过
    URL_POST_BACK_AUDIT_DECLARE_PROJECT: getApiHost + '/DeclareProject/BackAuditDeclareProject',



    //获取还没有进入预算流程的集采和非集采预算项目,用于合并
    URL_GET_PAGING_COLLECTION_OR_NON_PROJECT_MERGEABLE_LIST: getApiHost + '/BudgetProject/GetPagingBudgetProjectListCanCombineAndWithPackage',

    //合并多个未进入流程的
    URL_POST_COMBINE_BUDGET_PROJECT: getApiHost + '/BudgetProject/CombineBudgetProject',



}
