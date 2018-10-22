using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfBidEvaluation[360 开标评标   这里有可能废标哈;页面上对应每个给做一个废标按钮;   废前一定要确认,废时要同时考虑废除整个项目,废后要刷新这个页面;   类]
    /// </summary>
    [Serializable]
	public partial class PackageOfBidEvaluation 
	{       
        #region 属性
        /// <summary>
		/// 包id
		/// </summary>
        [DisplayName("包id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 投标报名家数
		/// </summary>
        [DisplayName("投标报名家数")]
        [Required(ErrorMessage ="请提供[BidCompanyNumber]")]
		public int BidCompanyNumber { get; set; }
        /// <summary>
		/// 缴纳投标保证金家数
		/// </summary>
        [DisplayName("缴纳投标保证金家数")]
        [Required(ErrorMessage ="请提供[BidCompanyWithMarginNumber]")]
		public int BidCompanyWithMarginNumber { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}