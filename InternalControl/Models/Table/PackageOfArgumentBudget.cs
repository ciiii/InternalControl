using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfArgumentBudget[200 预算项目必要性论证时生成/修改类]
    /// </summary>
    [Serializable]
	public partial class PackageOfArgumentBudget 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 论证技术要求
		/// </summary>
        [DisplayName("论证技术要求")]
        [MaxLength(1000,ErrorMessage ="BudgetTechnicalRequirements不能超过[500]字")]
		public string BudgetTechnicalRequirements { get; set; }
        /// <summary>
		/// 论证数量
		/// </summary>
        [DisplayName("论证数量")]
        [Required(ErrorMessage ="请提供[BudgetNumber]")]
		public int BudgetNumber { get; set; }
        /// <summary>
		/// 论证单价
		/// </summary>
        [DisplayName("论证单价")]
        [Required(ErrorMessage ="请提供[BudgetUnitPrice]")]
		public int BudgetUnitPrice { get; set; }
        /// <summary>
		/// 附件
		/// </summary>
        [DisplayName("附件")]
        [MaxLength(100,ErrorMessage ="Attachment不能超过[50]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}