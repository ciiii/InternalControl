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

    //随机获取满足条件的N个专家
    URL_GET_RANDOM_EXPERT_LIST: getApiHost + '/BaseInfo/GetRandomExpertList',


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

    //执行方式
    URL_GET_EXECUTION_MODE: getApiHost + '/BaseInfo/GetExecutionModeList',


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

    //获取还没有进入预算流程的预算项目,用于开始必要性认证
    URL_GET_PAGING_BUDGET_PROJECT_LIST_NOTIN_FILOW_AND_WITH_PACKAGE: getApiHost + '/BudgetProject/GetPagingBudgetProjectListNotInFlowAndWithPackage',

    //认证不通过的预算项目
    URL_GET_PAGING_QUITED_BUDGET_PROJECT_OF_ARGUMENT_LIST: getApiHost + '/BudgetProject/GetPagingQuitedBudgetProjectOfArgumentList',

    //合并多个未进入流程的
    URL_POST_COMBINE_BUDGET_PROJECT: getApiHost + '/BudgetProject/CombineBudgetProject',

    //分页获取预算项目列表,包括每个预算项目的流程信息和包信息
    URL_GET_PAGING_BUDGET_PROJECT_LIST: getApiHost + '/BudgetProject/GetPagingBudgetProjectList',

    //新增一个预算项目的必要性论证,同时开始一个预算流程,并通过这个论证
    URL_POST_ADD_AND_PASS_BUDGET_PROJECT_OF_ARGUMENT: getApiHost + '/BudgetProject/AddAndPassBudgetProjectOfArgument',

    //新增一个预算项目的必要性论证,同时开始一个预算流程,并不通过这个论证;注意这个是不通过
    URL_POST_ADD_AND_QUIT_BUDGET_PROJECT_OF_ARGUMENT: getApiHost + '/BudgetProject/AddAndQuitBudgetProjectOfArgument',

    //论证时,导出各个项目的包信息
    URL_GET_EXPORT_WHEN_BUDGET_PROJECT_OF_ARGUMENT: getApiHost + '/BudgetProject/ExportWhenBudgetProjectOfArgument',




    //分页获取待进入预算的项目列表,包括每个预算项目的流程信息和包信息,对于每个项目,只有相应的归口部门的人可以看到
    URL_GET_PAGING_BUDGET_PROJECT_OF_ENTER_LIST: getApiHost + '/BudgetProject/GetPagingBudgetProjectOfEnterList',

    //获取当前勾选的项目按部门统计后,再按本次已经进入预算的总额排序的项目id列表
    URL_GET_ORDER_OF_PROJECT_OF_ENTER: getApiHost + '/BudgetProject/GetOrderOfProjectOfEnter',

    //得到当前归口部门的某年度的预算
    URL_GET_BUDGET_LIST: getApiHost + '/BudgetProject/GetBudgetList',

    //增加预算,不能修改删除
    URL_POST_ADD_OR_UPDATE_BUDGET: getApiHost + '/BudgetProject/AddOrUpdateBudget',

    //进入预算
    URL_POST_PASS_BUDGET_PROJECT_OF_ENTER: getApiHost + '/BudgetProject/PassBudgetProjectOfEnter',

    //预算执行
    URL_POST_PASS_BUDGET_PROJECT_OF_EXECUTE: getApiHost + '/BudgetProject/PassBudgetProjectOfExecute',

    //获取某预算项目详情
    URL_GET_BUDGET_PROJECT_DETAIL: getApiHost + '/BudgetProject/GetBudgetProjectDetail',

    //分页获取待预算执行的项目列表,包括每个预算项目的流程信息和包信息.对于每个项目,只有相应的归口部门的人可以看到
    URL_GET_PAGING_BUDGET_PROJECT_OF_EXECUTE_LIST: getApiHost + '/BudgetProject/GetPagingBudgetProjectOfExecuteList',

    //已完成预算执行的预算项目
    URL_GET_PAGING_FINISHED_BUDGET_PROJECT_OF_EXECUTE_LIST: getApiHost + '/BudgetProject/GetPagingFinishedBudgetProjectOfExecuteList',

    //进入预算时,选中的项目导出
    URL_GET_EXPORT_WHEN_BUDGET_PROJECT_OF_ENTER: getApiHost + '/BudgetProject/ExportWhenBudgetProjectOfEnter',


    //获取执行项目列表,带流程,带包还没有进入执行流程的执行项目也会选取出来,方便"开始实施"
    URL_GET_PAGING_EXECUTE_PROJECT_LIST: getApiHost + '/ExecuteProject/GetPagingExecuteProjectList',

    //根据执行项目id,获取执行项目所有的信息,所有可能的步骤,已经走过的步骤,当前的步骤,是否可以执行当前的步骤
    URL_GET_EXECUTE_PROJECT_DETAIL: getApiHost + '/ExecuteProject/GetExecuteProjectDetail',

    //得到某个执行项目当前的预警天数
    URL_GET_DAY_DIFF_OF_EARLY_WARNING: getApiHost + '/BudgetProject/GetDayDiffOfEarlyWarning',

    //获取还没有进入执行流程的执行项目,用于合并
    URL_GET_PAGING_EXECUTE_PROJECT_LIST_NOTIN_FLOW_AND_WITH_PACKAGE: getApiHost + '/ExecuteProject/GetPagingExecuteProjectListNotInFlowAndWithPackage',

    //开始执行,同时可能会合并多个符合条件的执行项目
    URL_POST_BEGIN_EXECUTE_PROJECT: getApiHost + '/ExecuteProject/BeginExecuteProject',


    //执行方式,IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_EXECUTE_PROJECT_OF_GET_RUN_MODE: getApiHost + '/ExecuteProject/PassExecuteProjectOfGetRunMode',

    //技术确认如果全部包的技术确认都结束了,返回true,方便前台跳转/刷新IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_PACKAGE_OF_TECHNICAL_CONFIRMATION: getApiHost + '/ExecuteProject/PassPackageOfTechnicalConfirmation',

    //执行论证通过,IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_EXECUTE_PROJECT_OF_ARGUMENT: getApiHost + '/ExecuteProject/PassExecuteProjectOfArgument',

    //采购确认通过,IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_EXECUTE_PROJECT_OF_CONFIRM: getApiHost + '/ExecuteProject/PassExecuteProjectOfConfirm',

    //采购邀请,IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_EXECUTE_PROJECT_OF_INVITAION: getApiHost + '/ExecuteProject/PassExecuteProjectOfInvitation',

    //开标评标
    URL_POST_PASS_EXECUTE_PROJECT_OF_BID_EVALUATION: getApiHost + '/ExecuteProject/PassExecuteProjectOfBidEvaluation',

    //抽取专家,Id是执行项目的id,数组是专家id构成的数组
    URL_POST_PASS_EXECUTE_PROJECT_EXPERS: getApiHost + '/ExecuteProject/PassExecuteProjectExperts',

    //结果信息
    URL_POST_PASS_EXECUTE_PROJECT_OF_RESULT_NOTICE: getApiHost + '/ExecuteProject/PassExecuteProjectOfResultNotice',

    //拟定合同,如果全部包的拟定合同都结束了,返回true,方便前台跳转/刷新IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_PACKAGE_OF_DRAW_UP_CONTRACT: getApiHost + '/ExecuteProject/PassPackageOfDrawUpContract',

    //合同签订,如果全部包的合同签订都结束了,返回true,方便前台跳转/刷新IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_PACKAGE_OF_CONTRACT_SIGNING: getApiHost + '/ExecuteProject/PassPackageOfContractSigning',

    //合同公示
    URL_POST_PASS_PACKAGE_OF_CONTRACT_PUBLICITY: getApiHost + '/ExecuteProject/PassPackageOfContractPublicity',

    //履约验收,如果全部包的合同签订都结束了,返回true,方便前台跳转/刷新IsHold设为false,目前没有暂存的功能
    URL_POST_PASS_PACKAGE_OF_ACCEPTAN_CHECK_AND_ACCEPTANCE: getApiHost + '/ExecuteProject/PassPackageOfAcceptanceCheckAndAcceptance',

    //增改质疑
    URL_POST_QUESTOPM_EXECUTE_PROJECT: getApiHost + '/ExecuteProject/QuestionExecuteProject',

    //新增更正,注意没有修改和删除;
    URL_POST_ADD_EXECUTE_PROJECT_OF_CORRECTION: getApiHost + '/ExecuteProject/AddExecuteProjectOfCorrection',

    //根据更正id,获取这个更正的详情
    URL_GET_EXECUTE_PROJECT_OF_CORRECTION_BY_ID: getApiHost + '/ExecuteProject/GetExecuteProjectOfCorrectionById',


    //添加或更新通知
    URL_POST_ADD_OR_UPDATE_NOTICE: getApiHost + '/Notice/AddOrUpdateNotice',

    //启用禁用通知;
    URL_POST_SWITCH_NOCTICE: getApiHost + '/Notice/SwitchNoctice',

    //通知管理页面获取到的自己发送的通知列表
    URL_GET_PAGING_NOTICE_FOR_MANAGE_LIST: getApiHost + '/Notice/GetPagingNoticeForManageList',

    //获取通知详情
    URL_GET_NOTICE_DETAIL: getApiHost + '/Notice/GetNoticeDetail',

    //分页获取当前登录人可以看到的通知列表,包括了是否已经查看的数据
    URL_GET_PAGING_NOTICE_FOR_VIEW_LIST: getApiHost + '/Notice/GetPagingNotcieForViewList',

    //分页获取任务通知
    URL_GET_PAGING_PROJECT_BACKLOG: getApiHost + '/Notice/GetPagingProjectBacklog',

    //分页获取任务预警
    URL_GET_PAGING_EXECUTE_PROJECT_WARNING: getApiHost + '/Notice/GetPagingExecuteProjectWithDayDiffOfEarlyWarning',
}
