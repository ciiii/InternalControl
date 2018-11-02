using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProject[预算执行时生成,   开始实施(300)时可以合并,      执行项目,在执行预算成功的同时按每个预算项目生成一个;   但是也可以合并:   执行阶段合并（合并采购）   执行项目,在执行预算成功的同时按每个预算项目生成一个;   1 是否同为集采或非集采;   2 集采的跟品目相同,非集采的货物、服务可以合并，工程不能与货物、服务合并。可以用品目的"执行合并分类"来判断   3 归口部门相同;   4 项目属性(政府采购/非政府采购)相同   5 采购方式相同   6 都经过了预算   7 都没有开始选择执行      * InternalNumber 内部编号这个放到view里面展现,类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProject 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 来源预算项目id
		/// </summary>
        [DisplayName("来源预算项目id")]
        [Required(ErrorMessage ="请提供[SourceBudgetProjectId]")]
		public int SourceBudgetProjectId { get; set; }
        /// <summary>
		/// 申报年度
		/// </summary>
        [DisplayName("申报年度")]
        [Required(ErrorMessage ="请提供[Year]")]
		public int Year { get; set; }
        /// <summary>
		/// 项目名称
		/// </summary>
        [DisplayName("项目名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 项目类型
		/// </summary>
        [DisplayName("项目类型")]
        [MaxLength(50,ErrorMessage ="ProjectType不能超过[25]字")]
		public string ProjectType { get; set; }
        /// <summary>
		/// 执行时的合并分类
		/// </summary>
        [DisplayName("执行时的合并分类")]
        [Required(ErrorMessage ="请提供[MergeTypeWhenExecute]")]
        [MaxLength(100,ErrorMessage ="MergeTypeWhenExecute不能超过[50]字")]
		public string MergeTypeWhenExecute { get; set; }
        /// <summary>
		/// 归口部门Id,又是冗余
		/// </summary>
        [DisplayName("归口部门Id,又是冗余")]
        [Required(ErrorMessage ="请提供[RelevantDepartmentId]")]
		public int RelevantDepartmentId { get; set; }
        /// <summary>
		/// 实施时间,(默认取最小的拟实施时间)
		/// </summary>
        [DisplayName("实施时间,(默认取最小的拟实施时间)")]
		public DateTime? TimeToImplement { get; set; }
        /// <summary>
		/// 是否为政府集中采购,合并各包此项必须相同,冗余字段
		/// </summary>
        [DisplayName("是否为政府集中采购,合并各包此项必须相同,冗余字段")]
        [Required(ErrorMessage ="请提供[IsCenterPurchase]")]
		public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 是否政府采购(项目属性)
		/// </summary>
        [DisplayName("是否政府采购(项目属性)")]
		public bool? IsGovernmentPurchase { get; set; }
        /// <summary>
		/// 采购方式(有默认)
		/// </summary>
        [DisplayName("采购方式(有默认)")]
        [MaxLength(50,ErrorMessage ="PurchaseMethod不能超过[25]字")]
		public string PurchaseMethod { get; set; }
        /// <summary>
		/// 采购人名称
		/// </summary>
        [DisplayName("采购人名称")]
        [Required(ErrorMessage ="请提供[PurchaserName]")]
        [MaxLength(50,ErrorMessage ="PurchaserName不能超过[25]字")]
		public string PurchaserName { get; set; }
        /// <summary>
		/// 采购人地址
		/// </summary>
        [DisplayName("采购人地址")]
        [Required(ErrorMessage ="请提供[PurchaserAddress]")]
        [MaxLength(200,ErrorMessage ="PurchaserAddress不能超过[100]字")]
		public string PurchaserAddress { get; set; }
        /// <summary>
		/// 项目联系人姓名
		/// </summary>
        [DisplayName("项目联系人姓名")]
        [MaxLength(50,ErrorMessage ="LinkmanName不能超过[25]字")]
		public string LinkmanName { get; set; }
        /// <summary>
		/// 联系电话
		/// </summary>
        [DisplayName("联系电话")]
        [MaxLength(50,ErrorMessage ="LinkmanPhone不能超过[25]字")]
		public string LinkmanPhone { get; set; }
        /// <summary>
		/// 最高限价
		/// </summary>
        [DisplayName("最高限价")]
		public int? CeilingPrice { get; set; }
        /// <summary>
		/// 评审方法
		/// </summary>
        [DisplayName("评审方法")]
        [MaxLength(50,ErrorMessage ="InspectionMethods不能超过[25]字")]
		public string InspectionMethods { get; set; }
        /// <summary>
		/// 合同条款,附件
		/// </summary>
        [DisplayName("合同条款,附件")]
        [MaxLength(200,ErrorMessage ="ContractTerms不能超过[100]字")]
		public string ContractTerms { get; set; }
        /// <summary>
		/// CreatorId
		/// </summary>
        [DisplayName("CreatorId")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// CreateDatetime
		/// </summary>
        [DisplayName("CreateDatetime")]
        [Required(ErrorMessage ="请提供[CreateDatetime]")]
		public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}