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
        public bool? ISCenterPurchase { get; set; }

        /// <summary>
        /// 预算时的合并分类
        /// </summary>
        public string MergeTypeWhenBudget { get; set; }

        /// <summary>
        /// 年份,必须确定年份
        /// </summary>
        [Required]
        public int Year { get; set; }

    }

    public class BudgetProjectExtendFilter: BudgetProjectFilter
    {
        /// <summary>
        /// 归口部门id,后台来确定;
        /// </summary>
        public int? RelevantDepartmentId { get; set; }
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
}