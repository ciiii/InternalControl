using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// 预算项目的过滤条件
    /// </summary>
    public class BudgetProjectFilter
    {
        /// <summary>
        /// 模糊:预算项目名称
        /// </summary>
        public string LikeName { get; set; }

        /// <summary>
        /// 是否集采
        /// </summary>
        public bool? IsCenterPurchase { get; set; }

        /// <summary>
        /// 预算时的合并分类
        /// </summary>
        public string MergeTypeWhenBudget { get; set; }

        /// <summary>
        /// 年份,必须确定年份
        /// </summary>
        [Required]
        public int Year { get; set; }

        /// <summary>
        /// 项目类型
        /// </summary>
        public string ProjectType { get; set; }

        /// <summary>
        /// 大于等于多少预算总额
        /// </summary>
        public int? BeginTotalBudgetAmount { get; set; }

        /// <summary>
        /// 小于等于多少预算总额
        /// </summary>
        public int? EndTotalBudgetAmount { get; set; }

    }

    public class BudgetProjectExtendFilter : BudgetProjectFilter
    {
        /// <summary>
        /// 归口部门id,后台来确定;
        /// </summary>
        public int? RelevantDepartmentId { get; set; }

        /// <summary>
        /// 流程状态
        /// </summary>
        public int? State { get; set; }

        /// <summary>
        /// 当前步骤模板编号
        /// </summary>
        public int? LastStepTemplateId { get; set; }

        /// <summary>
        /// 在某一步骤模板之前(包含)
        /// </summary>
        public int? BeginLastStepTemplateId { get; set; }

        /// <summary>
        /// 在某一步骤模板之后(包含)
        /// </summary>
        public int? EndLastStepTemplateId { get; set; }

        public string WhereInId { get; set; }

    }

    /// <summary>
    /// 预算项目相关包的过滤条件
    /// </summary>
    public class PackageOfBudgetProjectFilter
    {
        /// <summary>
        /// 使用in搜索多项符合条件的结果
        /// </summary>
        public string WhereInBudgetProjectId { get; set; }
    }

    /// <summary>
    /// 预算的搜索条件
    /// </summary>
    public class BudgetFilter
    {
        /// <summary>
        /// 归口部门id
        /// </summary>
        public int OwnDepartmentsId { get; set; }

        /// <summary>
        /// 年度
        /// </summary>
        [Required]
        public int Year { get; set; }
    }

    /// <summary>
    /// 进入预算时,只需要填写这些东西,以后转为BudgetProjectOfEnter
    /// TODO:这个可以用obsolete来加工BudgetProjectOfEnter后使用,就不需要这个了
    /// </summary>
    public class EMBudgetProjectOfEnter
    {
        /// <summary>
		/// 进入的预算id
		/// </summary>
        [DisplayName("进入的预算id")]
        [Required(ErrorMessage = "请提供[BudgetId]")]
        public int BudgetId { get; set; }
        /// <summary>
		/// 预算审核批复,附件
		/// </summary>
        [DisplayName("预算审核批复,附件")]
        [Required(ErrorMessage = "请提供[AuditReply]")]
        [MaxLength(200, ErrorMessage = "AuditReply不能超过[100]字")]
        public string AuditReply { get; set; }

        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000, ErrorMessage = "Remark不能超过[500]字")]
        public string Remark { get; set; }

    }

    /// <summary>
    /// 批量进入预算时,传入的步骤id和预算项目id
    /// </summary>
    public class StepIdAndBudgetProjectId
    {
        public int StepId { get; set; }
        public int BudgetProjectId { get; set; }
    }

    /// <summary>
    /// 进入预算排名返回的数据结构
    /// </summary>
    public class OrderOfProjectOfEnter
    {
        public string DeclareDepartmentName { get; set; }
        public int CountOfPackageOfBudgetProject { get; set; }
        public int TotolBudgetAmountByDempartment { get; set; }
    }

    /// <summary>
    /// 必要性论证时导出的预算项目中的包信息
    /// </summary>
    public class ExportWhenBudgetProjectOfArgument
    {
        #region 属性
        [DisplayName("包号")]
        public int Id { get; set; }

        [DisplayName("项目申报部门")]
        public string DeclareDepartmentName { get; set; }


        [DisplayName("单项名称")]
        public string Name { get; set; }

        [DisplayName("备注")]
        public string Remark { get; set; }
        #endregion
    }

    /// <summary>
    /// 必要性论证时导出的预算项目中的包信息
    /// 当为集采-货物时
    /// </summary>
    public class ExportWhenBudgetProjectOfArgumentCaseGoods 
    {
        #region 属性
        //[DisplayName("包号")]
        //public int Id { get; set; }

        [DisplayName("项目申报部门")]
        public string DeclareDepartmentName { get; set; }

        [DisplayName("单项名称")]
        public string Name { get; set; }

        [DisplayName("技术要求")]
        public string DeclareTechnicalRequirements { get; set; }

        [DisplayName("单位")]
        public string Unit { get; set; }

        [DisplayName("数量")]
        public int DeclareNumber { get; set; }

        [DisplayName("单价")]
        public int DeclareUnitPrice { get; set; }

        [DisplayName("合计")]
        public int TotalDeclareAmount { get { return this.DeclareUnitPrice * this.DeclareNumber; } }

        [DisplayName("备注")]
        public string Remark { get; set; }
        #endregion
    }

    /// <summary>
    /// 必要性论证时导出的预算项目中的包信息
    /// 当为集采-服务时或非集采时
    /// </summary>
    public class ExportWhenBudgetProjectOfArgumentCaseOther 
    {
        #region 属性

        [DisplayName("包号")]
        public int Id { get; set; }

        [DisplayName("项目申报部门")]
        public string DeclareDepartmentName { get; set; }


        [DisplayName("单项名称")]
        public string Name { get; set; }

        [DisplayName("附件")]
        public string Attachment { get; set; }

        [DisplayName("预算")]
        public int DeclareUnitPrice { get; set; }

        [DisplayName("备注")]
        public string Remark { get; set; }
        #endregion
    }
}