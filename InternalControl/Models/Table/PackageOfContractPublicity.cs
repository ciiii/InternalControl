using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfContractPublicity[383 合同公示类]
    /// </summary>
    [Serializable]
	public partial class PackageOfContractPublicity 
	{       
        #region 属性
        /// <summary>
		/// 包Id
		/// </summary>
        [DisplayName("包Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 合同公示地址
		/// </summary>
        [DisplayName("合同公示地址")]
        [Required(ErrorMessage ="请提供[ContractPublicAddress]")]
        [MaxLength(200,ErrorMessage ="ContractPublicAddress不能超过[100]字")]
		public string ContractPublicAddress { get; set; }
        /// <summary>
		/// 合同公示网站
		/// </summary>
        [DisplayName("合同公示网站")]
        [Required(ErrorMessage ="请提供[ContractPublicityWebsite]")]
        [MaxLength(200,ErrorMessage ="ContractPublicityWebsite不能超过[100]字")]
		public string ContractPublicityWebsite { get; set; }
        /// <summary>
		/// 合同公示时间
		/// </summary>
        [DisplayName("合同公示时间")]
        [Required(ErrorMessage ="请提供[ContractOpeningTime]")]
		public DateTime? ContractOpeningTime { get; set; }
        /// <summary>
		/// 合同公示截图
		/// </summary>
        [DisplayName("合同公示截图")]
        [Required(ErrorMessage ="请提供[ContractPublicScreeningScreenshot]")]
        [MaxLength(200,ErrorMessage ="ContractPublicScreeningScreenshot不能超过[100]字")]
		public string ContractPublicScreeningScreenshot { get; set; }
        
        
        #endregion
	}
}