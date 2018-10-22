using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// BudgetProjectOfExecute[220 执行预算类]
    /// </summary>
    [Serializable]
	public partial class BudgetProjectOfExecute 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 是否政府采购,1 政府采购 0 非政府采购
		/// </summary>
        [DisplayName("是否政府采购,1 政府采购 0 非政府采购")]
        [Required(ErrorMessage ="请提供[IsGovernmentPurchase]")]
		public bool IsGovernmentPurchase { get; set; }
        /// <summary>
		/// 是否面向中小企业
		/// </summary>
        [DisplayName("是否面向中小企业")]
        [Required(ErrorMessage ="请提供[IsMSE]")]
		public bool IsMSE { get; set; }
        /// <summary>
		/// 实施时间
		/// </summary>
        [DisplayName("实施时间")]
        [Required(ErrorMessage ="请提供[TimeToImplement]")]
		public DateTime? TimeToImplement { get; set; }
        /// <summary>
		/// 预算批复,附件
		/// </summary>
        [DisplayName("预算批复,附件")]
        [Required(ErrorMessage ="请提供[Reply]")]
        [MaxLength(200,ErrorMessage ="Reply不能超过[100]字")]
		public string Reply { get; set; }
        /// <summary>
		/// 执行操作人Id
		/// </summary>
        [DisplayName("执行操作人Id")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 执行操作时间
		/// </summary>
        [DisplayName("执行操作时间")]
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