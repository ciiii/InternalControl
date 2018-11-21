using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternalControl.Models
{
    /// <summary>
    /// 
    /// </summary>
    public class DictionaryFilter
    {
        /// <summary>
        /// 分类名称
        /// </summary>
        public string TypeName { get; set; }
        /// <summary>
        /// 父级编号
        /// </summary>
        public int? ParentId { get; set; }
        /// <summary>
        /// 模糊查询:值
        /// </summary>
        public string LikeValue { get; set; }
    }

    /// <summary>
    /// 角色搜索条件
    /// </summary>
    public class RoleFilter
    {
        /// <summary>
        /// 1
        /// </summary>
        public bool IsForDepartment { get; set; }
    }

    /// <summary>
    /// 部门搜索条件
    /// </summary>
    public class DepartmentFilter
    {
        /// <summary>
        /// 模糊查询:名称
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 上级部门编号
        /// </summary>
        public int? ParentId { get; set; }

        /// <summary>
        /// 角色编号
        /// </summary>
        public int? RoleId { get; set; }
    }

    /// <summary>
    /// 人员搜索条件
    /// </summary>
    public class EmployeeFilter
    {
        /// <summary>
        /// 模糊:工号
        /// </summary>
        public string LikeWorkNumber { get; set; }

        /// <summary>
        /// 模糊:手机|联系方式
        /// </summary>
        public string LikePhone { get; set; }

        /// <summary>
        /// 模糊:姓名
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 部门编号
        /// </summary>
        public int? DepartmentId { get; set; }

        /// <summary>
        /// 模糊:部门名称
        /// </summary>
        public string LikeDepartmentName { get; set; }

        /// <summary>
        /// 模糊:职务名称
        /// </summary>
        public string LikeDutyName { get; set; }

        /// <summary>
        /// 模糊:岗位名称
        /// </summary>
        public string LikePostName { get; set; }

        /// <summary>
        /// 模糊:岗位类型
        /// </summary>
        public string LikePostType { get; set; }
    }

    /// <summary>
    /// 代理机构搜索条件
    /// </summary>
    public class AgencyFilter
    {
        /// <summary>
        /// 模糊:代理机构名称
        /// </summary>
        public string LikeName { get; set; }
    }

    /// <summary>
    /// 评审专家搜索条件
    /// </summary>
    public class ExpertFilter
    {
        /// <summary>
        /// 模糊:姓名
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 模糊:专业品目编号key
        ///// </summary>
        //public string  LikeItemKey { get; set; }

        /// <summary>
        /// 模糊:专业品目名称
        /// </summary>
        public string LikeItemName { get; set; }

        /// <summary>
        /// 模糊:所在单位名称
        /// </summary>
        public string LikeCompany { get; set; }

        /// <summary>
        /// 是否本单位
        /// </summary>
        public bool? IsOurCompany { get; set; }

        /// <summary>
        /// 回避的部门id,用逗号分隔数字
        /// </summary>
        public string WhereNotInDepartmentId { get; set; }

        /// <summary>
        /// 回避的专家id,用逗号分隔数字
        /// </summary>
        public string WhereNotInId { get; set; }

        /// <summary>
        /// 回避的单位,用逗号分隔的单位名称
        /// </summary>
        public string WhereNotInCompany { get; set; }
    }

    /// <summary>
    /// 品目搜索的条件
    /// </summary>
    public class ItemFilter
    {
        /// <summary>
        /// 父级编号
        /// </summary>
        public int? ParentId { get; set; }

        /// <summary>
        /// 模糊:关键字,A01之类的
        /// </summary>
        public string LikeKey { get; set; }

        /// <summary>
        /// 是否为政府集中采购,true-是
        /// </summary>
        public bool? IsCenterPurchase { get; set; }

        /// <summary>
        /// 模糊:品目名称
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 项目类型,也就是根品目名称
        /// </summary>
        public string TopItemName { get; set; }

        /// <summary>
        /// 预算项目合并时的分类编号.只有这个编号相同的才能在预算合并时相互合并;
        /// 注意这个往往不是某个显式的搜索条件,而是选中一个预算项目后,使用该项目的这个分类编号去过滤别的项目;
        /// </summary>
        public string MergeTypeWhenBudget { get; set; }

        /// <summary>
        /// 执行项目合并时的分类编号,只有这个编号相同的才能在执行合并时相互合并;
        /// </summary>
        public string MergeTypeWhenExecute { get; set; }

        /// <summary>
        /// 是否可维护,当维护管理时,必须设为1,其他时候不管
        /// </summary>
        public bool? IsCanMaintenance { get; set; }

        /// <summary>
        /// 模糊全搜索
        /// </summary>
        public string LikeAllName { get; set; }
    }

    /// <summary>
    /// 搜索预算项目合并分类的搜索条件
    /// </summary>
    public class VMergeTypeWhenBudgetFilter
    {
        //public bool ISCenterPurchase { get; set; }
        public string LikeMergeTypeWhenBudget { get; set; }
    }
}
