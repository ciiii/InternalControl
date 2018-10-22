using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfContractSigning[382   合同签订类]
    /// </summary>
    [Serializable]
	public partial class PackageOfContractSigning 
	{       
        #region 属性
        /// <summary>
		/// 包id
		/// </summary>
        [DisplayName("包id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 合同签订时间
		/// </summary>
        [DisplayName("合同签订时间")]
        [Required(ErrorMessage ="请提供[ContractSigningTime]")]
		public DateTime? ContractSigningTime { get; set; }
        /// <summary>
		/// 采购合同附件
		/// </summary>
        [DisplayName("采购合同附件")]
        [Required(ErrorMessage ="请提供[PurchaseContractAnnex]")]
        [MaxLength(200,ErrorMessage ="PurchaseContractAnnex不能超过[100]字")]
		public string PurchaseContractAnnex { get; set; }
        /// <summary>
		/// 履约验收天数
		/// </summary>
        [DisplayName("履约验收天数")]
        [Required(ErrorMessage ="请提供[PerformanceAcceptanceDays]")]
		public int PerformanceAcceptanceDays { get; set; }
        
        
        #endregion
	}
}