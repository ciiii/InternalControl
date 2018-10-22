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
    getAgencyList: function (type, options, getAgencyListListener) {
        var url = Code.URL_GET_AGENCY_LIST;
        Connect_Http.httpDatas(type, url, options, function getBackListener(success, obj, strErro) {
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
}


