using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// BudgetProjectOfArgument[预算项目-必要性论证   200 预算项目-必要性论证时生成/编辑类]
    /// </summary>
    [Serializable]
	public partial class BudgetProjectOfArgument 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 论证报告,附件
		/// </summary>
        [DisplayName("论证报告,附件")]
        [MaxLength(200,ErrorMessage ="ArgumentReport不能超过[100]字")]
		public string ArgumentReport { get; set; }
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