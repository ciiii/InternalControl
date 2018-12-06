//用户
var User = {
    //用户登录
    userLogin: function (type, options, userLoginListener) {
        var url = Code.URL_POST_LOGIN;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                userLoginListener(true, obj.data, '');
            } else {
                userLoginListener(false, '', strErro);
            }
        });
    },
    //修改密码
    userEditPassword: function (type, options, userEditPasswordListener) {
        var url = Code.URL_POST_CHANGE_PASSWORD;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                userEditPasswordListener(true, obj.data, '');

            } else {
                userEditPasswordListener(false, '', strErro);
            }
        });
    },
    //用户列表
    getUsersList: function (type, options, getUsersListListener) {
        var url = Code.URL_GET_USERS_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getUsersListListener(true, obj.data, '')
            } else {
                getUsersListListener(false, '', strErro)
            }
        });
    },
    //分页获取用户列表
    getPagingUsersList: function (type, options, getPagingUsersListListener) {
        var url = Code.URL_GET_PAGING_USERS_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingUsersListListener(true, obj.data, '')
            } else {
                getPagingUsersListListener(false, '', strErro)
            }
        });
    },
    //添加或修改用户
    addOrEditUsers: function (type, options, addOrEditUsersListener) {
        var url = Code.URL_POST_ADD_OR_EDIT_USERS;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addOrEditUsersListener(true, obj, '')
            } else {
                addOrEditUsersListener(false, '', strErro)
            }
        });
    }
}

//系统设置
var Set = {
    //获取系统参数设置
    getSetting: function (type, getSettingListener) {
        var url = Code.URL_GET_SETTING;
        Connect_Http.httpDatas(type, url, '', function getBackListener(success, obj, strErro) {
            if (success) {
                getSettingListener(true, obj.data, '');
            } else {
                getSettingListener(false, '', strErro);

            }
        });
    },
    //获取全部代理机构
    getAgencyList: function (type, getAgencyListListener) {
        var url = Code.URL_GET_AGENCY_LIST;
        Connect_Http.httpDatas(type, url, '', function getBackListener(success, obj, strErro) {
            if (success) {
                getAgencyListListener(true, obj.data, '');
            } else {
                getAgencyListListener(false, '', strErro);

            }
        });
    },
    //分页获取全部代理机构
    getPagingAgencyList: function (type, options, getPagingAgencyListListener) {
        var url = Code.URL_GET_PAGING_AGENCY_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingAgencyListListener(true, obj.data, '');
            } else {
                getPagingAgencyListListener(false, '', strErro);

            }
        });
    },
    //增改代理机构
    addOrEditAgency: function (type, options, addOrEditAgencyListener) {
        var url = Code.URL_POST_ADD_OR_EDIT_AGENCY;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addOrEditAgencyListener(true, obj.data, '');
            } else {
                addOrEditAgencyListener(false, '', strErro);
            }
        });
    },
    //获取专家
    getExpertList: function (type, options, getExpertListListener) {
        var url = Code.URL_GET_EXPERT_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getExpertListListener(true, obj.data, '');
            } else {
                getExpertListListener(false, '', strErro);

            }
        });
    },
    //分页获取专家
    getPagingExpertList: function (type, options, getPagingExpertListListener) {
        var url = Code.URL_GET_PAGING_EXPERT_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingExpertListListener(true, obj.data, '');
            } else {
                getPagingExpertListListener(false, '', strErro);

            }
        });
    },
    //增改专家
    addOrEditExpert: function (type, options, addOrEditExpertListener) {
        var url = Code.URL_POST_ADD_OR_EDIT_EXPERT;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addOrEditExpertListener(true, obj.data, '');
            } else {
                addOrEditExpertListener(false, '', strErro);
            }
        });
    },
    //随机获取满足条件的N个专家
    getRandomExpertList: function (type, options, getRandomExpertListListener) {
        var url = Code.URL_GET_RANDOM_EXPERT_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getRandomExpertListListener(true, obj.data, '');
            } else {
                getRandomExpertListListener(false, '', strErro);

            }
        });
    },
    //获取模板文件
    getTemplateFileList: function (type, options, getTemplateFileListListener) {
        var url = Code.URL_GET_TEMPLATE_FILE_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getTemplateFileListListener(true, obj.data, '');
            } else {
                getTemplateFileListListener(false, '', strErro);

            }
        });
    },
    //更新模板文件
    updateTemplateFile: function (type, options, updateTemplateFileListener) {
        var url = Code.URL_POST_UPDATE_TEMPLATE_FILE;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                updateTemplateFileListener(true, obj.data, '');
            } else {
                updateTemplateFileListener(false, '', strErro);
            }
        });
    },
    //分页获取所有品目
    getPagingItemList: function (type, options, getPagingItemListListener) {
        var url = Code.URL_GET_PAGING_ITEM_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingItemListListener(true, obj.data, '');
            } else {
                getPagingItemListListener(false, '', strErro);

            }
        });
    },
    //根据父级Id获取下级品目
    getItemList: function (type, options, getItemListListener) {
        var url = Code.URL_GET_ITEM_CHILD_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getItemListListener(true, obj.data, '');
            } else {
                getItemListListener(false, '', strErro);

            }
        });
    },
    //分页获取预算项目合并分类
    getPagingVMergeTypeWhenBudgetList: function (type, options, getPagingVMergeTypeWhenBudgetListListener) {
        var url = Code.URL_GET_PAGING_VMERGE_TYPE_WHEN_BUDGET_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingVMergeTypeWhenBudgetListListener(true, obj.data, '');
            } else {
                getPagingVMergeTypeWhenBudgetListListener(false, '', strErro);

            }
        });
    },
    //执行方式
    getExecutionMode: function (type, getExecutionModeListener) {
        var url = Code.URL_GET_EXECUTION_MODE;
        Connect_Http.httpDatas(type, url, '', function getBackListener(success, obj, strErro) {
            if (success) {
                getExecutionModeListener(true, obj.data, '');
            } else {
                getExecutionModeListener(false, '', strErro);

            }
        });
    },
}


//角色
var Role = {
    //获取角色列表
    getRoleList: function (type, getRoleListListener) {
        var url = Code.URL_GET_ROLE_LIST;

        Connect_Http.httpDatas(type, url, '', function getBackListener(success, obj, strErro) {
            if (success) {
                getRoleListListener(true, obj.data, '')
            } else {
                getRoleListListener(false, '', strErro)
            }
        });
    }
}

//部门
var Department = {
    //获取部门列表
    getDepartmentList: function (type, options, getDepartmentListListener) {
        var url = Code.URL_GET_DEPARTMENT_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getDepartmentListListener(true, obj.data, '')
            } else {
                getDepartmentListListener(false, '', strErro)
            }
        });
    },
    //添加或修改部门
    addOrEditDepartment: function (type, options, addOrEditDepartmentListener) {
        var url = Code.URL_POST_ADD_OR_EDIT_DEPARTMENT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addOrEditDepartmentListener(true, obj, '')
            } else {
                addOrEditDepartmentListener(false, '', strErro)
            }
        });
    },
    //获取归口部门，项目申报时用
    GetRelevantDepartmentList: function (type, GetRelevantDepartmentListListener) {
        var url = Code.URL_GET_RELEVANT_DEPARTMENT_LIST;

        Connect_Http.httpDatas(type, url, '', function getBackListener(success, obj, strErro) {
            if (success) {
                GetRelevantDepartmentListListener(true, obj.data, '')
            } else {
                GetRelevantDepartmentListListener(false, '', strErro)
            }
        });
    },
    //获取某个归口部门的时间设置
    GetRelevantDepartmentsSetting: function (type, departmentId, GetRelevantDepartmentsSettingListener) {
        var url = Code.URL_GET_RELEVANT_DEPARTMENT_SETTING;
        var postData = {
            RelevantDepartmentId: departmentId
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                GetRelevantDepartmentsSettingListener(true, obj.data, '')
            } else {
                GetRelevantDepartmentsSettingListener(false, '', strErro)
            }
        });
    },
    //归口部门增改自己部门的时间设置
    AddOreditRelevantDepartmentsSetting: function (type, options, AddOreditRelevantDepartmentsSettingListener) {
        var url = Code.URL_POST_ADD_OR_EDIT_RELEVANT_DEPARTMENT_SETTING;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                AddOreditRelevantDepartmentsSettingListener(true, obj, '')
            } else {
                AddOreditRelevantDepartmentsSettingListener(false, '', strErro)
            }
        });
    },
}

//字典
var Dictionary = {
    //分页获取字典列表
    getPagingDictionaryList: function (type, options, getPagingDictionaryListListener) {
        var url = Code.URL_GET_PAGING_CATEGORY_DICTIONARY;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingDictionaryListListener(true, obj.data, '')
            } else {
                getPagingDictionaryListListener(false, '', strErro)
            }
        });
    },
    //获取某类字典列表
    getCategoryDictionary: function (type, name, getCategoryDictionaryListener) {
        var url = Code.URL_GET_CATEGORY_DICTIONARY;
        var postData = {
            TypeName: name
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                getCategoryDictionaryListener(true, obj.data, '')
            } else {
                getCategoryDictionaryListener(false, '', strErro)
            }
        });
    },
    //添加或修改字典
    addOrEditDictionary: function (type, options, addOrEditDictionaryListener) {
        var url = Code.URL_POST_ADD_OR_EDIT_DICTIONARY;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addOrEditDictionaryListener(true, obj, '')
            } else {
                addOrEditDictionaryListener(false, '', strErro)
            }
        });
    },
    //删除字典
    delDictionary: function (type, options, delDictionaryListener) {
        var url = Code.URL_POST_DEL_DICTIONARY;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                delDictionaryListener(true, obj, '')
            } else {
                delDictionaryListener(false, '', strErro)
            }
        });
    }
}

//申报
var Declare = {
    //分页申报项目列表,包括每个申报项目的流程信息和包信息.
    getPagingDeclareProjectList: function (type, options, getPagingDeclareProjectListListener) {
        var url = Code.URL_GET_PAGING_DECLARE_PROJECT_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingDeclareProjectListListener(true, obj.data, '')
            } else {
                getPagingDeclareProjectListListener(false, '', strErro)
            }
        });
    },
    //根据归口部门id,得到可以选择的年份
    getYearsCanChoose: function (type, RelevantDepartmentsId, getYearsCanChooseListener) {
        var url = Code.URL_GET_YEARS_CAN_CHOOSE;
        var postData = {
            RelevantDepartmentsId: RelevantDepartmentsId
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                getYearsCanChooseListener(true, obj.data, '')
            } else {
                getYearsCanChooseListener(false, '', strErro)
            }
        });
    },
    //新增一个申报项目,同时开始一个申报流程
    addDeclareProject: function (type, options, addDeclareProjectListener) {
        var url = Code.URL_POST_ADD_DECLARE_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addDeclareProjectListener(true, obj, '')
            } else {
                addDeclareProjectListener(false, '', strErro)
            }
        });
    },
    //完善一个申报项目的资料
    editDeclareProject: function (type, options, editDeclareProjectListener) {
        var url = Code.URL_POST_EDIT_DECLARE_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                editDeclareProjectListener(true, obj, '')
            } else {
                editDeclareProjectListener(false, '', strErro)
            }
        });
    },
    //申请项目审核通过
    passAuditDeclareProject: function (type, options, passAuditDeclareProjectListener) {
        var url = Code.URL_POST_PASS_AUDIT_DECLARE_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passAuditDeclareProjectListener(true, obj, '')
            } else {
                passAuditDeclareProjectListener(false, '', strErro)
            }
        });
    },
    //申请项目审核通过
    backAuditDeclareProject: function (type, options, backAuditDeclareProjectListener) {
        var url = Code.URL_POST_BACK_AUDIT_DECLARE_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                backAuditDeclareProjectListener(true, obj, '')
            } else {
                backAuditDeclareProjectListener(false, '', strErro)
            }
        });
    },
}


//预算
var Budget = {
    //获取还没有进入预算流程的集采和非集采预算项目
    getPagingCollectionOrNonBudgetProjectMergeableList: function (type, options, getPagingCollectionOrNonBudgetProjectMergeableListListener) {
        var url = Code.URL_GET_PAGING_COLLECTION_OR_NON_PROJECT_MERGEABLE_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingCollectionOrNonBudgetProjectMergeableListListener(true, obj.data, '')
            } else {
                getPagingCollectionOrNonBudgetProjectMergeableListListener(false, '', strErro)
            }
        });
    },
    //合并多个未进入流程的
    combineBudgetProject: function (type, options, combineBudgetProjectListener) {
        var url = Code.URL_POST_COMBINE_BUDGET_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                combineBudgetProjectListener(true, obj, '')
            } else {
                combineBudgetProjectListener(false, '', strErro)
            }
        });
    },
    //获取还没有进入预算流程的预算项目,用于开始必要性认证
    getPagingBudgetProjectListNotInFlowAndWithPackage: function (type, options, getPagingBudgetProjectListNotInFlowAndWithPackageListener) {
        var url = Code.URL_GET_PAGING_BUDGET_PROJECT_LIST_NOTIN_FILOW_AND_WITH_PACKAGE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingBudgetProjectListNotInFlowAndWithPackageListener(true, obj.data, '')
            } else {
                getPagingBudgetProjectListNotInFlowAndWithPackageListener(false, '', strErro)
            }
        });
    },
    //认证不通过的预算项目
    getPagingQuitedBudgetProjectOfArgumentList: function (type, options, getPagingQuitedBudgetProjectOfArgumentListListener) {
        var url = Code.URL_GET_PAGING_QUITED_BUDGET_PROJECT_OF_ARGUMENT_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingQuitedBudgetProjectOfArgumentListListener(true, obj.data, '')
            } else {
                getPagingQuitedBudgetProjectOfArgumentListListener(false, '', strErro)
            }
        });
    },
    //分页获取预算项目列表,包括每个预算项目的流程信息和包信息
    getPagingBudgetProjectList: function (type, options, getPagingBudgetProjectListListener) {
        var url = Code.URL_GET_PAGING_BUDGET_PROJECT_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingBudgetProjectListListener(true, obj.data, '')
            } else {
                getPagingBudgetProjectListListener(false, '', strErro)
            }
        });
    },
    //新增一个预算项目的必要性论证,同时开始一个预算流程,并通过这个论证
    addAndPassBudgetProjectOfArgument: function (type, options, addAndPassBudgetProjectOfArgumentListener) {
        var url = Code.URL_POST_ADD_AND_PASS_BUDGET_PROJECT_OF_ARGUMENT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addAndPassBudgetProjectOfArgumentListener(true, obj, '')
            } else {
                addAndPassBudgetProjectOfArgumentListener(false, '', strErro)
            }
        });
    },
    //新增一个预算项目的必要性论证,同时开始一个预算流程,并不通过这个论证
    addAndQuitBudgetProjectOfArgument: function (type, options, addAndQuitBudgetProjectOfArgumentListener) {
        var url = Code.URL_POST_ADD_AND_QUIT_BUDGET_PROJECT_OF_ARGUMENT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addAndQuitBudgetProjectOfArgumentListener(true, obj, '')
            } else {
                addAndQuitBudgetProjectOfArgumentListener(false, '', strErro)
            }
        });
    },
    //论证时,导出各个项目的包信息
    getExportWhenBudgetProjectOfArgument: function (type, options, getExportWhenBudgetProjectOfArgumentListener) {
        var url = Code.URL_GET_EXPORT_WHEN_BUDGET_PROJECT_OF_ARGUMENT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getExportWhenBudgetProjectOfArgumentListener(true, obj.data, '')
            } else {
                getExportWhenBudgetProjectOfArgumentListener(false, '', strErro)
            }
        });
    },
    //得到当前归口部门的某年度的预算
    getBudgetList: function (type, options, getBudgetListListener) {
        var url = Code.URL_GET_BUDGET_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getBudgetListListener(true, obj.data, '')
            } else {
                getBudgetListListener(false, '', strErro)
            }
        });
    },
    //增加预算,不能修改删除
    addOrUpdateBudget: function (type, options, addOrUpdateBudgetListener) {
        var url = Code.URL_POST_ADD_OR_UPDATE_BUDGET;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addOrUpdateBudgetListener(true, obj, '')
            } else {
                addOrUpdateBudgetListener(false, '', strErro)
            }
        });
    },
    //分页获取待进入预算的项目列表,包括每个预算项目的流程信息和包信息
    getPagingBudgetProjectOfEnterList: function (type, options, getPagingBudgetProjectOfEnterListListener) {
        var url = Code.URL_GET_PAGING_BUDGET_PROJECT_OF_ENTER_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingBudgetProjectOfEnterListListener(true, obj.data, '')
            } else {
                getPagingBudgetProjectOfEnterListListener(false, '', strErro)
            }
        });
    },
    //获取当前勾选的项目按部门统计后,再按本次已经进入预算的总额排序的项目id列表
    getOrderOfProjectOfEnter: function (type, options, getOrderOfProjectOfEnterListener) {
        var url = Code.URL_GET_ORDER_OF_PROJECT_OF_ENTER;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getOrderOfProjectOfEnterListener(true, obj.data, '')
            } else {
                getOrderOfProjectOfEnterListener(false, '', strErro)
            }
        });
    },
    //进入预算
    passBudgetProjectOfEnter: function (type, options, passBudgetProjectOfEnterListener) {
        var url = Code.URL_POST_PASS_BUDGET_PROJECT_OF_ENTER;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passBudgetProjectOfEnterListener(true, obj, '')
            } else {
                passBudgetProjectOfEnterListener(false, '', strErro)
            }
        });
    },
    //进入预算时,选中的项目导出
    getExportWhenBudgetProjectOfEnter: function (type, options, getExportWhenBudgetProjectOfEnterListener) {
        var url = Code.URL_GET_EXPORT_WHEN_BUDGET_PROJECT_OF_ENTER;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getExportWhenBudgetProjectOfEnterListener(true, obj.data, '')
            } else {
                getExportWhenBudgetProjectOfEnterListener(false, '', strErro)
            }
        });
    },
    //预算执行
    passBudgetProjectOfExecute: function (type, options, passBudgetProjectOfExecuteListener) {
        var url = Code.URL_POST_PASS_BUDGET_PROJECT_OF_EXECUTE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passBudgetProjectOfExecuteListener(true, obj, '')
            } else {
                passBudgetProjectOfExecuteListener(false, '', strErro)
            }
        });
    },
    //获取某预算项目详情
    getBudgetProjectDetail: function (type, id, getBudgetProjectDetailListener) {
        var url = Code.URL_GET_BUDGET_PROJECT_DETAIL;
        var postData = {
            budgetProjectId: id
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                getBudgetProjectDetailListener(true, obj.data, '')
            } else {
                getBudgetProjectDetailListener(false, '', strErro)
            }
        });
    },
    //分页获取待进入预算的项目列表,包括每个预算项目的流程信息和包信息
    getPagingBudgetProjectOfExecuteList: function (type, options, getPagingBudgetProjectOfExecuteListListener) {
        var url = Code.URL_GET_PAGING_BUDGET_PROJECT_OF_EXECUTE_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingBudgetProjectOfExecuteListListener(true, obj.data, '')
            } else {
                getPagingBudgetProjectOfExecuteListListener(false, '', strErro)
            }
        });
    },
    //已完成预算执行的预算项目
    getPagingFinishedBudgetProjectOfExecuteList: function (type, options, getPagingFinishedBudgetProjectOfExecuteListListener) {
        var url = Code.URL_GET_PAGING_FINISHED_BUDGET_PROJECT_OF_EXECUTE_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingFinishedBudgetProjectOfExecuteListListener(true, obj.data, '')
            } else {
                getPagingFinishedBudgetProjectOfExecuteListListener(false, '', strErro)
            }
        });
    },
}


var ProjectExecute = {
    //获取执行项目列表,带流程,带包还没有进入执行流程的执行项目也会选取出来,方便"开始实施"
    getPagingExecuteProjectList: function (type, options, getPagingExecuteProjectListListener) {
        var url = Code.URL_GET_PAGING_EXECUTE_PROJECT_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingExecuteProjectListListener(true, obj.data, '')
            } else {
                getPagingExecuteProjectListListener(false, '', strErro)
            }
        });
    },
    //根据执行项目id,获取执行项目所有的信息,所有可能的步骤,已经走过的步骤,当前的步骤,是否可以执行当前的步骤
    getExecuteProjectDetail: function (type, id, getExecuteProjectDetailListener) {
        var url = Code.URL_GET_EXECUTE_PROJECT_DETAIL;
        var postData = {
            executeProjectId: id
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                getExecuteProjectDetailListener(true, obj.data, '')
            } else {
                getExecuteProjectDetailListener(false, '', strErro)
            }
        });
    },
    //获取还没有进入执行流程的执行项目,用于合并
    getPagingExecuteProjectListNotInFlowAndWithPackage: function (type, options, getPagingExecuteProjectListNotInFlowAndWithPackageListener) {
        var url = Code.URL_GET_PAGING_EXECUTE_PROJECT_LIST_NOTIN_FLOW_AND_WITH_PACKAGE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                getPagingExecuteProjectListNotInFlowAndWithPackageListener(true, obj.data, '')
            } else {
                getPagingExecuteProjectListNotInFlowAndWithPackageListener(false, '', strErro)
            }
        });
    },
    //得到某个执行项目当前的预警天数
    getDayDiffOfEarlyWarning: function (type, id, getDayDiffOfEarlyWarningListener) {
        var url = Code.URL_GET_DAY_DIFF_OF_EARLY_WARNING;
        var postData = {
            ExecuteProjectId: id
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                getDayDiffOfEarlyWarningListener(true, obj.data, '')
            } else {
                getDayDiffOfEarlyWarningListener(false, '', strErro)
            }
        });
    },
    //开始实施
    beginExecuteProject: function (type, options, beginExecuteProjectListener) {
        var url = Code.URL_POST_BEGIN_EXECUTE_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                beginExecuteProjectListener(true, obj, '')
            } else {
                beginExecuteProjectListener(false, '', strErro)
            }
        });
    },
    //执行方式
    passExecuteProjectOfGetRunMode: function (type, options, passExecuteProjectOfGetRunModeListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_OF_GET_RUN_MODE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectOfGetRunModeListener(true, obj, '')
            } else {
                passExecuteProjectOfGetRunModeListener(false, '', strErro)
            }
        });
    },
    //技术确认
    passPackageOfTechnicalConfirmation: function (type, options, passPackageOfTechnicalConfirmationListener) {
        var url = Code.URL_POST_PASS_PACKAGE_OF_TECHNICAL_CONFIRMATION;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passPackageOfTechnicalConfirmationListener(true, obj, '')
            } else {
                passPackageOfTechnicalConfirmationListener(false, '', strErro)
            }
        });
    },
    //执行论证通过
    passExecuteProjectOfArgument: function (type, options, passExecuteProjectOfArgumentListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_OF_ARGUMENT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectOfArgumentListener(true, obj, '')
            } else {
                passExecuteProjectOfArgumentListener(false, '', strErro)
            }
        });
    },
    //采购确认通过
    passExecuteProjectOfConfirm: function (type, options, passExecuteProjectOfConfirmListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_OF_CONFIRM;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectOfConfirmListener(true, obj, '')
            } else {
                passExecuteProjectOfConfirmListener(false, '', strErro)
            }
        });
    },
    //采购邀请
    passExecuteProjectOfInvitation: function (type, options, passExecuteProjectOfInvitationListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_OF_INVITAION;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectOfInvitationListener(true, obj, '')
            } else {
                passExecuteProjectOfInvitationListener(false, '', strErro)
            }
        });
    },
    //开标评标
    passExecuteProjectOfBidEvaluation: function (type, options, passExecuteProjectOfBidEvaluationListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_OF_BID_EVALUATION;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectOfBidEvaluationListener(true, obj, '')
            } else {
                passExecuteProjectOfBidEvaluationListener(false, '', strErro)
            }
        });
    },
    //抽取专家,Id是执行项目的id,数组是专家id构成的数组
    passExecuteProjectExperts: function (type, options, passExecuteProjectExpertsListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_EXPERS;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectExpertsListener(true, obj, '')
            } else {
                passExecuteProjectExpertsListener(false, '', strErro)
            }
        });
    },
    //结果信息
    passExecuteProjectOfResultNotice: function (type, options, passExecuteProjectOfResultNoticeListener) {
        var url = Code.URL_POST_PASS_EXECUTE_PROJECT_OF_RESULT_NOTICE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passExecuteProjectOfResultNoticeListener(true, obj, '')
            } else {
                passExecuteProjectOfResultNoticeListener(false, '', strErro)
            }
        });
    },
    //拟定合同
    passPackageOfDrawUpContract: function (type, options, passPackageOfDrawUpContractListener) {
        var url = Code.URL_POST_PASS_PACKAGE_OF_DRAW_UP_CONTRACT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passPackageOfDrawUpContractListener(true, obj, '')
            } else {
                passPackageOfDrawUpContractListener(false, '', strErro)
            }
        });
    },
    //合同签订
    passPackageOfContractSigning: function (type, options, passPackageOfContractSigningListener) {
        var url = Code.URL_POST_PASS_PACKAGE_OF_CONTRACT_SIGNING;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passPackageOfContractSigningListener(true, obj, '')
            } else {
                passPackageOfContractSigningListener(false, '', strErro)
            }
        });
    },
    //合同公示
    passPackageOfContractPublicity: function (type, options, passPackageOfContractPublicityListener) {
        var url = Code.URL_POST_PASS_PACKAGE_OF_CONTRACT_PUBLICITY;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passPackageOfContractPublicityListener(true, obj, '')
            } else {
                passPackageOfContractPublicityListener(false, '', strErro)
            }
        });
    },
    //履约验收
    passPackageOfAcceptanceCheckAndAcceptance: function (type, options, passPackageOfAcceptanceCheckAndAcceptanceListener) {
        var url = Code.URL_POST_PASS_PACKAGE_OF_ACCEPTAN_CHECK_AND_ACCEPTANCE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                passPackageOfAcceptanceCheckAndAcceptanceListener(true, obj, '')
            } else {
                passPackageOfAcceptanceCheckAndAcceptanceListener(false, '', strErro)
            }
        });
    },
    //增改质疑
    questionExecuteProject: function (type, options, questionExecuteProjectListener) {
        var url = Code.URL_POST_QUESTOPM_EXECUTE_PROJECT;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                questionExecuteProjectListener(true, obj, '')
            } else {
                questionExecuteProjectListener(false, '', strErro)
            }
        });
    },
    //新增更正,注意没有修改和删除;
    addExecuteProjectOfCorrection: function (type, options, addExecuteProjectOfCorrectionListener) {
        var url = Code.URL_POST_ADD_EXECUTE_PROJECT_OF_CORRECTION;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                addExecuteProjectOfCorrectionListener(true, obj, '')
            } else {
                addExecuteProjectOfCorrectionListener(false, '', strErro)
            }
        });
    },
    //根据更正id,获取这个更正的详情
    getExecuteProjectOfCorrectionById: function (type, id, getExecuteProjectOfCorrectionByIdListener) {
        var url = Code.URL_GET_EXECUTE_PROJECT_OF_CORRECTION_BY_ID;
        var postData = {
            executeProjectOfCorrectionId: id
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                getExecuteProjectOfCorrectionByIdListener(true, obj.data, '')
            } else {
                getExecuteProjectOfCorrectionByIdListener(false, '', strErro)
            }
        });
    },
}

var Notice = {
    //添加或更新通知
    AddOrUpdateNotice: function (type, options, AddOrUpdateNoticeListener) {
        var url = Code.URL_POST_ADD_OR_UPDATE_NOTICE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                AddOrUpdateNoticeListener(true, obj, '')
            } else {
                AddOrUpdateNoticeListener(false, '', strErro)
            }
        });
    },
    //启用禁用通知
    SwitchNoctice: function (type, options, SwitchNocticeListener) {
        var url = Code.URL_POST_SWITCH_NOCTICE;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                SwitchNocticeListener(true, obj, '')
            } else {
                SwitchNocticeListener(false, '', strErro)
            }
        });
    },
    //通知管理页面获取到的自己发送的通知列表
    GetPagingNoticeForManageList: function (type, options, GetPagingNoticeForManageListListener) {
        var url = Code.URL_GET_PAGING_NOTICE_FOR_MANAGE_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                GetPagingNoticeForManageListListener(true, obj.data, '')
            } else {
                GetPagingNoticeForManageListListener(false, '', strErro)
            }
        });
    },
    //获取通知详情
    GetNoticeDetail: function (type, id, GetNoticeDetailListener) {
        var url = Code.URL_GET_NOTICE_DETAIL;
        var postData = {
            NoticeId: id
        }

        Connect_Http.httpDatas(type, url, postData, function getBackListener(success, obj, strErro) {
            if (success) {
                GetNoticeDetailListener(true, obj.data, '')
            } else {
                GetNoticeDetailListener(false, '', strErro)
            }
        });
    },
    //分页获取当前登录人可以看到的通知列表
    GetPagingNotcieForViewList: function (type, options, GetPagingNotcieForViewListListener) {
        var url = Code.URL_GET_PAGING_NOTICE_FOR_VIEW_LIST;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                GetPagingNotcieForViewListListener(true, obj.data, '')
            } else {
                GetPagingNotcieForViewListListener(false, '', strErro)
            }
        });
    },
    //分页获取任务通知
    GetPagingProjectBacklog: function (type, options, GetPagingProjectBacklogListener) {
        var url = Code.URL_GET_PAGING_PROJECT_BACKLOG;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                GetPagingProjectBacklogListener(true, obj.data, '')
            } else {
                GetPagingProjectBacklogListener(false, '', strErro)
            }
        });
    },
    //分页获取任务预警
    GetPagingExecuteProjectWarning: function (type, options, GetPagingExecuteProjectWarningListener) {
        var url = Code.URL_GET_PAGING_EXECUTE_PROJECT_WARNING;

        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
            if (success) {
                GetPagingExecuteProjectWarningListener(true, obj.data, '')
            } else {
                GetPagingExecuteProjectWarningListener(false, '', strErro)
            }
        });
    },
}


