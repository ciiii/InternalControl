using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InternalControl.Business;
using InternalControl.Infrastucture;
using InternalControl.Models;
using Dapper;
using MyLib;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Controllers
{
    /// <summary>
    /// 基础信息维护的接口
    /// </summary>
    public class BaseInfoController : BaseController
    {
        private int RoleIdOfRelevantDepartment { get { return Config.GetValue<int>("RoleId:Relevant"); } }

        #region Dictionary
        /// <summary>
        /// 根据分类名称,获取某类字典
        /// </summary>
        /// <param name="TypeName">分类名称</param>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<Dictionary>> GetDictionaryByTypeName([Required][FromQuery]string TypeName)
        {
            var filter = new DictionaryFilter() { TypeName = TypeName };
            return await Db.GetListSpAsync<Dictionary, DictionaryFilter>(filter);
        }

        /// <summary>
        /// 分页获取某类字典
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<PagingResult<Dictionary>> GetPagingDictionaryByTypeName([FromQuery]Paging paging, [FromQuery]DictionaryFilter filter)
        {
            return await Db.GetPagingListSpAsync<Dictionary, DictionaryFilter>(paging, filter);
        }

        /// <summary>
        /// 新增一个字典数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrEditDictionary([FromBody]Dictionary model) =>
            await Db.ExecuteSpAsync(new SPDictionaryMerge()
            {
                List = model.ToDataTable()
            });

        /// <summary>
        /// 删除一个字典数据
        /// </summary>
        /// <param name="编号列表"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task DeleteDictionary([FromBody]IEnumerable<int> list) =>
            await Db.ExecuteSpAsync(new SPDictionaryDelete()
            {
                List = list.ToPredefindedKeyFieldsList().ToDataTable()
            });
        #endregion

        #region 角色:这次没有角色维护,已有的角色和角色权限关系都已经手动填写好了.只需要获取一下角色
        /// <summary>
        /// 获取角色列表;设置部门信息的时候用
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<Role>> GetRoleList() =>
            await Db.GetListSpAsync<Role, RoleFilter>(new RoleFilter() { IsForDepartment = true });
        #endregion

        #region 部门 TODO:部门-代理机构-人员管理其实非常混乱!!!
        /// <summary>
        /// 获取全部部门,维护部门时用
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<VDepartment>> GetDepartmentList(DepartmentFilter filter) =>
            await Db.GetListSpAsync<VDepartment, DepartmentFilter>(filter);

        /// <summary>
        /// 获取归口部门,项目申报的时候用;
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<VDepartment>> GetRelevantDepartmentList() =>
            await Db.GetListSpAsync<VDepartment, DepartmentFilter>(new DepartmentFilter() { RoleId = RoleIdOfRelevantDepartment });

        /// <summary>
        /// 增改部门,
        /// 同时根据负责人刷新人员-权限对应关系
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateDepartment([FromBody]Department model) =>
            await Db.ExecuteSpAsync(new SPDepartmentMerge()
            {
                List = model.ToDataTable()
            });

        /// <summary>
        /// 获取某个归口部门的时间设置
        /// </summary>
        /// <param name="RelevantDepartmentId"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetRelevantDepartmentsSetting(int RelevantDepartmentId)
        {
            return await Db.GetModelByIdSpAsync<RelevantDepartmentsSetting>(RelevantDepartmentId);
        }

        /// <summary>
        /// 归口部门增改自己部门的时间设置;
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateGetRelevantDepartmentsSetting([FromBody]RelevantDepartmentsSetting model)
        {
            await Db.ExecuteSpAsync(new SPRelevantDepartmentsSettingMerge()
            {
                List = model.ToDataTable()
            });
        }
        #endregion

        #region 人员管理
        /// <summary>
        /// 获取所有人员列表
        /// 不包括管理员
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<PagingResult<VEmployee>> GetPagingEmployeeList(Paging paging, EmployeeFilter filter) =>
            await Db.GetPagingListSpAsync<VEmployee, EmployeeFilter>(paging, filter);

        /// <summary>
        /// 获取所有人员列表,不分页
        /// 不包括管理员
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<VEmployee>> GetEmployeeList(EmployeeFilter filter) =>
            await Db.GetListSpAsync<VEmployee, EmployeeFilter>(filter);

        /// <summary>
        /// 增改人员
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateEmployee([FromBody]Employee model) =>
            await Db.ExecuteSpAsync(new SPEmployeeMerge()
            {
                List = model.ToDataTable()
            });
        #endregion

        #region 执行方式
        /// <summary>
        /// 执行方式
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetExecutionModeList() =>
            await Db.GetListSpAsync<ExecutionMode>(orderType:true);
        #endregion

        #region 代理机构
        /// <summary>
        /// 获取全部代理机构
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<PagingResult<VAgency>> GetPagingAgencyList(Paging paging, AgencyFilter filter) =>
            await Db.GetPagingListSpAsync<VAgency, AgencyFilter>(paging, filter);

        [HttpGet]
        async public Task<IEnumerable<VAgency>> GetAgencyList(AgencyFilter filter) =>
            await Db.GetListSpAsync<VAgency, AgencyFilter>(filter);

        /// <summary>
        /// 增改代理机构,
        /// 同时根据负责人刷新人员-权限对应关系
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateAgency([FromBody]Agency model) =>
            await Db.ExecuteSpAsync(new SPAgencyMerge()
            {
                List = model.ToDataTable()
            });
        #endregion

        #region 系统参数设置
        /// <summary>
        /// 获取系统参数设置
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        async public Task<Setting> GetSetting() =>
            await Db.GetModelByIdSpAsync<Setting>(1);

        /// <summary>
        /// 更新系统参数设置,不针对每个参数单独写了,所有的都用这个
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task UpdateSetting([FromBody]Setting model) =>
            await Db.ExecuteSpAsync(new SPSettingUpdate() { List = model.ToDataTable() });
        #endregion

        #region 评审专家管理
        /// <summary>
        /// 获取专家
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<PagingResult<VExpert>> GetPagingExpertList(Paging paging, ExpertFilter filter) =>
            await Db.GetPagingListSpAsync<VExpert, ExpertFilter>(paging, filter);

        /// <summary>
        /// 随机获取满足条件的N个专家
        /// </summary>
        /// <param name="number"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<VExpert>> GetRandomExpertList(int number, ExpertFilter filter)
        {
            var pagingResult = await Db.GetPagingListSpAsync<VExpert, ExpertFilter>(new Paging()
            {
                Index = 1,
                Size = number
            },
            filter,
            orderStr: "NEWID()");

            return pagingResult.List;
        }

        /// <summary>
        /// 增改评审专家
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateExpert([FromBody]Expert model) =>
            await Db.ExecuteSpAsync(new SPExpertMerge() { List = model.ToDataTable() });

        #endregion

        #region 品目,暂时用不上增改
        /// <summary>
        /// 分页获取品目
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<PagingResult<VItem>> GetPagingItemList(Paging paging, ItemFilter filter) =>
            await Db.GetPagingListSpAsync<VItem, ItemFilter>(paging, filter);
        /// <summary>
        /// 不分页获取品目
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetItemList(ItemFilter filter) =>
            await Db.GetListSpAsync<VItem, ItemFilter>(filter);

        /// <summary>
        /// 分页获取预算项目合并分类,用在合并预算项目时的搜索可合并的项目;
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="ISCenterPurchase">是否为集采</param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<PagingResult<string>> GetPagingVMergeTypeWhenBudgetList(
            Paging paging,
            [Required]bool ISCenterPurchase,
            VMergeTypeWhenBudgetFilter filter) =>
            await Db.GetPagingListSpAsync<string, VMergeTypeWhenBudgetFilter>(
                paging,
                filter,
                $"TFNDistinctMergeTypeWhenBudget({(ISCenterPurchase ? 1 : 0)},{CurrentUser.DepartmentId})", "MergeTypeWhenBudget");

        /// <summary>
        /// 获取模板文件
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetTemplateFileList()
        {
            var list = await Db.GetListSpAsync<TemplateFile>(orderType: true);
            var result = from item in list
                         group item by item.Type into g
                         select new
                         {
                             Name = g.Key,
                             Type = from itemOfG in g
                                    select new
                                    {
                                        itemOfG.Id,
                                        itemOfG.Name,
                                        itemOfG.FileName,
                                        itemOfG.Url,
                                        itemOfG.Remark
                                    }
                         };
            return result;
        }

        /// <summary>
        /// 更新模板文件,注意:只有更新没有新增
        /// </summary>
        /// <param name="list"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task UpdateTemplateFile([FromBody]IEnumerable<TemplateFile> list)
        {
            await Db.ExecuteSpAsync(new SPTemplateFileMerge()
            {
                List = list.ToDataTable()
            });
        }

        #endregion
    }
}