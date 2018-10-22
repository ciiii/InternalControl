using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfAcceptanceCheckAndAcceptance[384 履约验收类]
    /// </summary>
    [Serializable]
	public partial class PackageOfAcceptanceCheckAndAcceptance 
	{       
        #region 属性
        /// <summary>
		/// 包Id
		/// </summary>
        [DisplayName("包Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 履约开始期限
		/// </summary>
        [DisplayName("履约开始期限")]
        [Required(ErrorMessage ="请提供[PerformanceBeginPeriod]")]
		public DateTime? PerformanceBeginPeriod { get; set; }
        /// <summary>
		/// 履约结束期限
		/// </summary>
        [DisplayName("履约结束期限")]
        [Required(ErrorMessage ="请提供[PerformanceEndPeriod]")]
		public DateTime? PerformanceEndPeriod { get; set; }
        /// <summary>
		/// 验收时间
		/// </summary>
        [DisplayName("验收时间")]
        [Required(ErrorMessage ="请提供[AcceptanceTime]")]
		public DateTime? AcceptanceTime { get; set; }
        /// <summary>
		/// 履约验收信息
		/// </summary>
        [DisplayName("履约验收信息")]
        [Required(ErrorMessage ="请提供[PerformanceAcceptanceInformation]")]
        [MaxLength(1000,ErrorMessage ="PerformanceAcceptanceInformation不能超过[500]字")]
		public string PerformanceAcceptanceInformation { get; set; }
        /// <summary>
		/// 履约验收附件
		/// </summary>
        [DisplayName("履约验收附件")]
        [Required(ErrorMessage ="请提供[PerformanceAcceptanceAnnex]")]
        [MaxLength(200,ErrorMessage ="PerformanceAcceptanceAnnex不能超过[100]字")]
		public string PerformanceAcceptanceAnnex { get; set; }
        
        
        #endregion
	}
}