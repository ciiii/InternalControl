using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// BudgetProjectOfEnter[210 进入预算类]
    /// </summary>
    [Serializable]
	public partial class BudgetProjectOfEnter 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 进入的预算id
		/// </summary>
        [DisplayName("进入的预算id")]
        [Required(ErrorMessage ="请提供[BudgetId]")]
		public int BudgetId { get; set; }
        /// <summary>
		/// 预算审核批复,附件
		/// </summary>
        [DisplayName("预算审核批复,附件")]
        [Required(ErrorMessage ="请提供[AuditReply]")]
        [MaxLength(200,ErrorMessage ="AuditReply不能超过[100]字")]
		public string AuditReply { get; set; }
        /// <summary>
		/// 进入操作人id
		/// </summary>
        [DisplayName("进入操作人id")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 进入时间
		/// </summary>
        [DisplayName("进入时间")]
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