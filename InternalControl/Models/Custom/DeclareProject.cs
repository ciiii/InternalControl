using System;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// 申报项目的过滤条件
    /// </summary>
    public class DeclareProjectFilter
    {
        /// <summary>
        /// 模糊:申报项目名称
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 年份
        /// </summary>
        public int? Year { get; set; }

        /// <summary>
        /// 是否集采
        /// </summary>
        public bool? IsCenterPurchase { get; set; }

        /// <summary>
        /// 归口部门id
        /// </summary>
        public int? RelevantDepartmentId { get; set; }

        /// <summary>
        /// 计划采购方式
        /// </summary>
        public string PlanPurchaseMethod { get; set; }

        /// <summary>
        /// 流程状态
        /// </summary>
        public bool? State { get; set; }

    }

    //2018-10-6 数据权限判断,复杂一点的放到tfn;
    //public class DeclareProjectExtendFilter : DeclareProjectFilter
    //{
    //    /// <summary>
    //    /// 申请人id
    //    /// </summary>
    //    public int? CreatorId { get; set; }

    //    /// <summary>
    //    /// 归口部门id,后台来确定;
    //    /// </summary>
    //    public int? RelevantDepartmentId { get; set; }
    //}

    /// <summary>
    /// 申报项目相关包的过滤条件
    /// </summary>
    public class PackageOfDeclareProjectFilter
    {
        /// <summary>
        /// 使用in搜索多项符合条件的结果
        /// </summary>
        public string  WhereInDeclareProjectId { get; set; }
    }
}