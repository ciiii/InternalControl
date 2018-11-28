using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfResultNoticeOfCorrection[更正中的结果信息的包的信息的更正类]
    /// </summary>
    [Serializable]
	public partial class PackageOfResultNoticeOfCorrection 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [Obsolete]
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 更正编号
		/// </summary>
        [Obsolete]
        [DisplayName("更正编号")]
        [Required(ErrorMessage ="请提供[ExecuteProjectOfCorrectionId]")]
		public int ExecuteProjectOfCorrectionId { get; set; }
        /// <summary>
		/// 包id
		/// </summary>
        [DisplayName("包id")]
        [Required(ErrorMessage ="请提供[PackageId]")]
		public int PackageId { get; set; }
        /// <summary>
		/// 旧的中标供应商
		/// </summary>
        [DisplayName("旧的中标供应商")]
        [MaxLength(200,ErrorMessage ="OldWinningBidder不能超过[100]字")]
		public string OldWinningBidder { get; set; }
        /// <summary>
		/// 新的中标供应商
		/// </summary>
        [DisplayName("新的中标供应商")]
        [MaxLength(200,ErrorMessage ="NewWinningBidder不能超过[100]字")]
		public string NewWinningBidder { get; set; }
        /// <summary>
		/// 旧的企业类型
		/// </summary>
        [DisplayName("旧的企业类型")]
        [MaxLength(50,ErrorMessage ="OldTypeOfEnterprise不能超过[25]字")]
		public string OldTypeOfEnterprise { get; set; }
        /// <summary>
		/// 新的企业类型
		/// </summary>
        [DisplayName("新的企业类型")]
        [MaxLength(50,ErrorMessage ="NewTypeOfEnterprise不能超过[25]字")]
		public string NewTypeOfEnterprise { get; set; }
        /// <summary>
		/// 旧的中标金额
		/// </summary>
        [DisplayName("旧的中标金额")]
		public int? OldWinningBidAmount { get; set; }
        /// <summary>
		/// 新的中标金额
		/// </summary>
        [DisplayName("新的中标金额")]
		public int? NewWinningBidAmount { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}