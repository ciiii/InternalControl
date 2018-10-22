using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfResultNotice[380   这一步中可能会废标.类]
    /// </summary>
    [Serializable]
	public partial class PackageOfResultNotice 
	{       
        #region 属性
        /// <summary>
		/// 包id
		/// </summary>
        [DisplayName("包id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 中标供应商
		/// </summary>
        [DisplayName("中标供应商")]
        [Required(ErrorMessage ="请提供[WinningBidder]")]
        [MaxLength(200,ErrorMessage ="WinningBidder不能超过[100]字")]
		public string WinningBidder { get; set; }
        /// <summary>
		/// 企业类型
		/// </summary>
        [DisplayName("企业类型")]
        [Required(ErrorMessage ="请提供[TypeOfEnterprise]")]
        [MaxLength(50,ErrorMessage ="TypeOfEnterprise不能超过[25]字")]
		public string TypeOfEnterprise { get; set; }
        /// <summary>
		/// 预算金额
		/// </summary>
        [DisplayName("预算金额")]
        [Required(ErrorMessage ="请提供[BudgetAmount]")]
		public int BudgetAmount { get; set; }
        /// <summary>
		/// 中标金额
		/// </summary>
        [DisplayName("中标金额")]
        [Required(ErrorMessage ="请提供[WinningBidAmount]")]
		public int WinningBidAmount { get; set; }
        /// <summary>
		/// 投标文件
		/// </summary>
        [DisplayName("投标文件")]
        [Required(ErrorMessage ="请提供[BiddingDocuments]")]
        [MaxLength(200,ErrorMessage ="BiddingDocuments不能超过[100]字")]
		public string BiddingDocuments { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}