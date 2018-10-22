using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Budget[预算,只能新增,不能修改和删除      每一个年度有且仅有一个常规预算,其他随意      常规预算的名称就是"常规预算",其他的自己起类]
    /// </summary>
    [Serializable]
	public partial class Budget 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 年度
		/// </summary>
        [DisplayName("年度")]
        [Required(ErrorMessage ="请提供[Year]")]
		public int Year { get; set; }
        /// <summary>
		/// 归口部门Id
		/// </summary>
        [DisplayName("归口部门Id")]
        [Required(ErrorMessage ="请提供[OwnDepartmentsId]")]
		public int OwnDepartmentsId { get; set; }
        /// <summary>
		/// 预算类型Id
		/// </summary>
        [DisplayName("预算类型Id")]
        [Required(ErrorMessage ="请提供[BudgetTypeId]")]
		public int BudgetTypeId { get; set; }
        /// <summary>
		/// 名称
		/// </summary>
        [DisplayName("名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 预算金额
		/// </summary>
        [DisplayName("预算金额")]
        [Required(ErrorMessage ="请提供[BudgetAmount]")]
		public int BudgetAmount { get; set; }
        /// <summary>
		/// 预算批复,附件
		/// </summary>
        [DisplayName("预算批复,附件")]
        [Required(ErrorMessage ="请提供[BudgetApproval]")]
        [MaxLength(200,ErrorMessage ="BudgetApproval不能超过[100]字")]
		public string BudgetApproval { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}